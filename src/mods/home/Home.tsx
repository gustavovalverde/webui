// import { signOut } from 'next-auth/react'

import type { AppPage } from '@/@types'
import { useProjectPanel } from '@/hooks/panels/useProjectPanel'
import { Button, Title } from '@/ui'

export const Home: AppPage = () => {
  const { open } = useProjectPanel()

  return (
    <>
      <Title>Fonoster</Title>
      <Button onClick={open}>New Project</Button>
    </>
  )
}

Home.isProtected = true
