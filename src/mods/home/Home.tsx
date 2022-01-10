// import { signOut } from 'next-auth/react'

import type { AppPage } from '@/@types'
import { NoProjects } from '@/components/NoProjects'

export const Home: AppPage = () => {
  return (
    <>
      <NoProjects />
    </>
  )
}

Home.isProtected = true
