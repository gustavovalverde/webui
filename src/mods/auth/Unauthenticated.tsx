import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Spinner } from '@/ui/Spinner'

import { PAGES, useLoggedIn } from '.'

export const Unauthenticated: NextPage = ({ children }) => {
  const { push } = useRouter()
  const { isLoading, isUnauthenticated } = useLoggedIn()

  useEffect(() => {
    if (isLoading) return

    if (!isUnauthenticated) push(PAGES.NUMBERS)
  }, [isLoading, isUnauthenticated, push])

  return isUnauthenticated ? <>{children}</> : <Spinner />
}
