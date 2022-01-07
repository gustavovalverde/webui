import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Spinner } from '@/ui/Spinner'

import { PAGES, useLoggedIn } from '.'
import { nextPage } from './useNextPath'

export const Authenticated: NextPage = ({ children }) => {
  const { replace, asPath, push } = useRouter()
  const { isLoading, isAuthenticated } = useLoggedIn()
  const [hasNextPageChecked, setHasNextPageChecked] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) replace(`${PAGES.SIGN_IN}?next=${asPath}`)

    if (isAuthenticated && nextPage.get()) {
      push(nextPage.get() as string)

      nextPage.destroy()
    } else {
      setHasNextPageChecked(true)
    }
  }, [asPath, replace, isLoading, isAuthenticated, push])

  return isAuthenticated && hasNextPageChecked ? <>{children}</> : <Spinner />
}
