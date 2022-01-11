import { DefaultOptions, QueryClient } from 'react-query'

import { Notifier } from '@/components/Notification'

// 0.5 Hours
const DEFAULT_TIME = 1000 * 60 * 60 * 0.5

const onError = e => {
  const error: Error = e

  if ('message' in error) {
    Notifier.error(error.message)

    console.error(`RT-QUERY ERROR]: ${error.message}`)
  }
}

/**
 * React Query Options
 * @summary Set the config on all queries and mutations through the client.
 *
 * @author Fonoster
 */
const defaultOptions: DefaultOptions = {
  queries: {
    cacheTime: DEFAULT_TIME,
    staleTime: DEFAULT_TIME,
    retry: 2,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ['data', 'error'],
    onError,
  },
  mutations: {
    onError,
  },
}

export const getQueryClient = () => new QueryClient({ defaultOptions })
