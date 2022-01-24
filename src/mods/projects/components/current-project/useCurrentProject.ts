import type { Project } from '@fonoster/projects/dist/client/types'
import { StringParam, useQueryParam } from 'next-query-params'
import { useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Storage } from '@/mods/shared/helpers/Storage'

import { useProjects } from '../../hooks/useProjects'

export const currentProjectStorage = new Storage('fonoster.current_project')

export const getCurrentProjectFromStorage = () => {
  const project = currentProjectStorage.get()

  return project ? (JSON.parse(project) as Project) : null
}

export const useCurrentProject = () => {
  const { session } = useLoggedIn()
  const queryClient = useQueryClient()
  const { projects, hasProjects, isSuccess } = useProjects()

  const [projectRef, setProjectRef] = useQueryParam('project', StringParam)

  const changeCurrentProject = useCallback(
    (project: Project | null) => {
      setProjectRef(project?.ref)

      currentProjectStorage.set(project ? JSON.stringify(project) : '')

      queryClient.invalidateQueries()
    },
    [setProjectRef, queryClient]
  )

  const getProject = useCallback(() => {
    const project = projects.find(p => p.ref === projectRef)

    return project ?? getCurrentProjectFromStorage() ?? projects[0]
  }, [projectRef, projects])

  useEffect(() => {
    if (hasProjects) {
      const project = getProject()

      changeCurrentProject(
        session?.user.accessKeyId === project.userRef ? project : null
      )
    }
  }, [hasProjects, projects, session, getProject, changeCurrentProject])

  return {
    isSuccess,
    projects,
    hasProjects,
    changeCurrentProject,
    currentProject: getProject(),
  }
}
