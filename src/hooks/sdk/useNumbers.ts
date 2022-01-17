import type {
  CreateNumberRequest,
  CreateNumberResponse,
  DeleteNumberResponse,
  Number,
} from '@fonoster/numbers/dist/client/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { API } from '@/lib/sdk/api'

export const useNumbers = (queryKey = 'numbers') => {
  const { data, isLoading, isSuccess } = useQuery<{
    nextPageToken: string
    numbers: Number[]
  }>([queryKey], async () => (await API.get('/numbers')).data.data)

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

export const useEditNumber = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (number: CreateNumberRequest) =>
      (await API.put('/numbers', number)).data.data as CreateNumberResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('numbers')
      },
    }
  )
}

export const useDeleteNumber = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (ref: string) =>
      (await API.delete('/numbers', { data: { ref } })).data
        .data as DeleteNumberResponse,
    {
      onSuccess() {
        queryClient.invalidateQueries('numbers')
      },
    }
  )
}
