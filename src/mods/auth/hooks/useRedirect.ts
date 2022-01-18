import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Storage } from '@/mods/shared/helpers/Storage'

export const REDIRECT_TO_KEY = 'fonoster.redirectTo'

export const redirectStore = new Storage(REDIRECT_TO_KEY)

export const useRedirect = () => {
  const {
    query: { redirect_to: redirectTo },
  } = useRouter()

  useEffect(() => {
    if (redirectTo && typeof redirectTo === 'string')
      redirectStore.set(redirectTo)
  }, [redirectTo])
}
