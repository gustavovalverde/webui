import type {
  CreateProjectRequest,
  CreateProjectResponse,
  ListProjectsResponse,
} from '@fonoster/projects/dist/client/types'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { API } from '@/lib/sdk/api'

export const useProjects = (queryKey = 'projects') => {
  const { data, isLoading, isSuccess } = useQuery<ListProjectsResponse>(
    [queryKey],
    async () => (await API.get('/projects')).data.data
  )

  const projects = useMemo(() => data?.projects ?? [], [data])
  const hasProjects = useMemo(() => projects.length !== 0, [projects])

  return {
    projects,
    hasProjects,
    isLoading,
    isSuccess,
  }
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (project: CreateProjectRequest) =>
      (await API.post('/projects', project)).data.data as CreateProjectResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('projects')
      },
    }
  )
}
