import type { Project } from '@fonoster/projects/dist/client/types'
import { useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import shallow from 'zustand/shallow'

import { Storage } from '@/helpers/Storage'
import { useProjects } from '@/hooks/sdk/useProjects'
import { useLoggedIn } from '@/mods/auth/useLoggedIn'

type Store = {
  project: Project | null
  setProject: (project: Project | null) => void
}

export const currentProjectStorage = new Storage('fonoster.current_project')

const useStore = create<Store>(set => ({
  project: null,
  setProject: project => set(() => ({ project })),
}))

export const getCurrentProject = () => {
  const project = currentProjectStorage.get()

  return project ? (JSON.parse(project) as Project) : null
}

export const useCurrentProject = () => {
  const { session } = useLoggedIn()
  const queryClient = useQueryClient()
  const { projects, hasProjects, isSuccess } = useProjects()
  const { project, setProject } = useStore(
    useCallback(s => s, []),
    shallow
  )

  const setCurrentProject = useCallback(
    (project: Project | null) => {
      setProject(project)

      currentProjectStorage.set(project ? JSON.stringify(project) : '')

      queryClient.invalidateQueries('numbers')
      queryClient.invalidateQueries('providers')
    },
    [setProject, queryClient]
  )

  useEffect(() => {
    if (hasProjects) {
      const currentProject = getCurrentProject() ?? projects[0]

      if (session?.user.accessKeyId !== currentProject.userRef)
        setCurrentProject(null)

      if (currentProject.ref !== project?.ref) setCurrentProject(currentProject)
    }
  }, [hasProjects, projects, project, session, setCurrentProject])

  return {
    isSuccess,
    projects,
    project,
    hasProjects,
    setCurrentProject,
  }
}