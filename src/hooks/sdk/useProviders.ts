import type {
  CreateProviderRequest,
  CreateProviderResponse,
  DeleteProviderResponse,
  ListProvidersResponse,
} from '@fonoster/providers/dist/client/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { API } from '@/lib/sdk/api'

const ENDPOINT_PATH = '/providers'

export const useProviders = (queryKey = 'providers') => {
  const { data, isLoading, isSuccess } = useQuery<ListProvidersResponse>(
    [queryKey],
    async () => (await API.get(ENDPOINT_PATH)).data.data
  )

  return {
    providers: data?.providers ?? [],
    isLoading,
    isSuccess,
  }
}

export const useCreateProvider = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (provider: CreateProviderRequest) =>
      (await API.post(ENDPOINT_PATH, provider)).data
        .data as CreateProviderResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('providers')
      },
    }
  )
}

export const useDeleteProvider = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (ref: string) =>
      (await API.delete(ENDPOINT_PATH, { data: { ref } })).data
        .data as DeleteProviderResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('providers')
      },
    }
  )
}
