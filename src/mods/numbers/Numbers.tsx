import { useLayoutEffect } from 'react'

import type { AppPage } from '@/@types'
import { NoNumbers } from '@/components/empty-states/NoNumbers'
import { useTitle } from '@/hooks/useTitle'

export const Numbers: AppPage = () => {
  const { setTitle } = useTitle()

  useLayoutEffect(() => {
    setTitle('SIP Network / Numbers')
  }, [setTitle])

  return (
    <>
      <NoNumbers />
    </>
  )
}

Numbers.isProtected = true
