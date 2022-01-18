import type {
  CreateProjectRequest,
  CreateProjectResponse,
} from '@fonoster/projects/dist/client/types'
import { useMutation, useQueryClient } from 'react-query'

import { API } from '@/mods/shared/lib/api'

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
