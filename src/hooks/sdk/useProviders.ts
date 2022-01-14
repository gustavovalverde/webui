import type {
  CreateProviderRequest,
  CreateProviderResponse,
  ListProvidersResponse,
} from '@fonoster/providers/dist/client/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { API } from '@/lib/sdk/api'

export const useProviders = (queryKey = 'providers') => {
  const { data, isLoading, isSuccess } = useQuery<ListProvidersResponse>(
    [queryKey],
    async () => (await API.get('/providers')).data.data
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
      (await API.post('/providers', provider)).data
        .data as CreateProviderResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('providers')
      },
    }
  )
}
