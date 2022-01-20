import type { SearchEventsResponse } from '@fonoster/monitor/dist/client/types'
import { useQuery } from 'react-query'

import { API } from '@/mods/shared/lib/api'

export const useCallLogs = (time: string, queryKey = 'call_logs') => {
  const { data, isLoading, isSuccess } = useQuery<SearchEventsResponse>(
    [queryKey, { time }],
    async () =>
      (
        await API.get('/monitor/call', {
          params: {
            time,
          },
        })
      ).data.data
  )

  return {
    events: data?.events ?? [],
    isLoading,
    isSuccess,
  }
}

export const useSIPLogs = (time: string, queryKey = 'sip_logs') => {
  const { data, isLoading, isSuccess } = useQuery<SearchEventsResponse>(
    [queryKey, { time }],
    async () =>
      (
        await API.get('/monitor/sip', {
          params: {
            time,
          },
        })
      ).data.data
  )

  return {
    events: data?.events ?? [],
    isLoading,
    isSuccess,
  }
}

export const useAppLogs = (time: string, queryKey = 'app_logs') => {
  const { data, isLoading, isSuccess } = useQuery<SearchEventsResponse>(
    [queryKey, { time }],
    async () =>
      (
        await API.get('/monitor/app', {
          params: {
            time,
          },
        })
      ).data.data
  )

  return {
    events: data?.events ?? [],
    isLoading,
    isSuccess,
  }
}
