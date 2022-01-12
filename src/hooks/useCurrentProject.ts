import type { Project } from '@fonoster/projects/dist/client/types'
import { useCallback, useEffect } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'

import { Storage } from '@/helpers/Storage'

import { useProjects } from './sdk/useProjects'

type Store = {
  project: Project | null
  setProject: (project: Project) => void
}

const storage = new Storage('fonoster.current_project')

const useStore = create<Store>(set => ({
  project: null,
  setProject: project => set(() => ({ project })),
}))

export const getCurrentProject = () => {
  const project = storage.get()

  return project ? (JSON.parse(project) as Project) : null
}

export const useCurrentProject = () => {
  const { projects } = useProjects()
  const { project, setProject } = useStore(
    useCallback(s => s, []),
    shallow
  )

  const setCurrentProject = useCallback(
    (project: Project) => {
      setProject(project)

      storage.set(JSON.stringify(project))
    },
    [setProject]
  )

  useEffect(() => {
    if (projects.length) {
      const currentProject = getCurrentProject() ?? projects[0]

      if (currentProject.ref !== project?.ref) setCurrentProject(currentProject)
    }
  }, [projects, project, setCurrentProject])

  return {
    projects,
    project,
    setCurrentProject,
  }
}
