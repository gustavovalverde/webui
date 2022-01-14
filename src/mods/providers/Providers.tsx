import { useLayoutEffect } from 'react'

import type { AppPage } from '@/@types'
import { NoProviders } from '@/components/empty-states/NoProviders'
import { useTitle } from '@/hooks/useTitle'

export const Providers: AppPage = () => {
  const { setTitle } = useTitle()

  useLayoutEffect(() => {
    setTitle('SIP Network / VoIP Providers')
  }, [setTitle])

  return (
    <>
      <NoProviders />
    </>
  )
}

Providers.isProtected = true
