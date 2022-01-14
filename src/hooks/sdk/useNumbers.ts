import type {
  CreateNumberRequest,
  CreateNumberResponse,
  ListNumbersResponse,
} from '@fonoster/numbers/dist/client/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { API } from '@/lib/sdk/api'

export const useNumbers = (queryKey = 'numbers') => {
  const { data, isLoading, isSuccess } = useQuery<ListNumbersResponse>(
    [queryKey],
    async () => (await API.get('/numbers')).data.data
  )

  return {
    numbers: data?.numbers ?? [],
    isLoading,
    isSuccess,
  }
}

export const useCreateNumber = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (number: CreateNumberRequest) =>
      (await API.post('/numbers', number)).data.data as CreateNumberResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('numbers')
      },
    }
  )
}
