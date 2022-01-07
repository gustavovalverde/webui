import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { SESSION_STATUS } from '.'

export const useLoggedIn = () => {
  const { data: session, status } = useSession()

  const isLoading = useMemo(
    () => status === SESSION_STATUS.IS_LOADING,
    [status]
  )

  const isAuthenticated = useMemo(
    () => status === SESSION_STATUS.AUTH,
    [status]
  )

  const isUnauthenticated = useMemo(
    () => status === SESSION_STATUS.UNAUTH,
    [status]
  )

  return {
    session,
    status,
    isLoading,
    isAuthenticated,
    isUnauthenticated,
  }
}
