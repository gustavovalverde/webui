import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { PAGES } from '@/mods/shared/constants/pages'
import { Spinner } from '@/ui/Spinner'

import { useLoggedIn } from '../hooks/useLoggedIn'
import { redirectStore } from '../hooks/useRedirect'

export const Authenticated: NextPage = ({ children }) => {
  const { replace, asPath, push } = useRouter()
  const { isLoading, isAuthenticated } = useLoggedIn()
  const [hasNextPageChecked, setHasNextPageChecked] = useState(false)

  useEffect(() => {
    const path = redirectStore.get() as string

    if (isLoading) return

    if (!isAuthenticated) replace(`${PAGES.SIGN_IN}?redirect_to=${asPath}`)

    if (isAuthenticated && path) {
      if (!path.includes(asPath)) push(path)

      redirectStore.destroy()
    }

    setHasNextPageChecked(true)
  }, [asPath, replace, isLoading, isAuthenticated, push])

  return isAuthenticated && hasNextPageChecked ? <>{children}</> : <Spinner />
}
