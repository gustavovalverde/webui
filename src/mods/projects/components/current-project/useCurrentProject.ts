import type { Project } from '@fonoster/projects/dist/client/types'
import { useCallback, useEffect } from 'react'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import shallow from 'zustand/shallow'

import { useLoggedIn } from '@/mods/auth/hooks/useLoggedIn'
import { Storage } from '@/mods/shared/helpers/Storage'

import { useProjects } from '../../hooks/useProjects'

type Store = {
  currentProject: Project | null
  setCurrentProject: (project: Project | null) => void
}

export const currentProjectStorage = new Storage('fonoster.current_project')

const useStore = create<Store>(set => ({
  currentProject: null,
  setCurrentProject: currentProject => set(() => ({ currentProject })),
}))

export const getCurrentProject = () => {
  const project = currentProjectStorage.get()

  return project ? (JSON.parse(project) as Project) : null
}

export const useCurrentProject = () => {
  const { session } = useLoggedIn()
  const queryClient = useQueryClient()
  const { projects, hasProjects, isSuccess } = useProjects()
  const { currentProject, setCurrentProject } = useStore(
    useCallback(s => s, []),
    shallow
  )

  const changeCurrentProject = useCallback(
    (project: Project | null) => {
      setCurrentProject(project)

      currentProjectStorage.set(project ? JSON.stringify(project) : '')

      queryClient.invalidateQueries('numbers')
      queryClient.invalidateQueries('providers')
      queryClient.invalidateQueries('call_logs')
      queryClient.invalidateQueries('sip_logs')
      queryClient.invalidateQueries('app_logs')
    },
    [setCurrentProject, queryClient]
  )

  useEffect(() => {
    if (hasProjects) {
      const project = getCurrentProject() ?? projects[0]

      if (session?.user.accessKeyId !== project.userRef)
        changeCurrentProject(null)

      if (project?.ref !== currentProject?.ref) changeCurrentProject(project)
    }
  }, [hasProjects, projects, currentProject, session, changeCurrentProject])

  return {
    isSuccess,
    projects,
    currentProject,
    hasProjects,
    changeCurrentProject,
  }
}
