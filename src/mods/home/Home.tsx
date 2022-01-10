import { signOut } from 'next-auth/react'

import type { AppPage } from '@/@types'
import { NoProjects } from '@/components/NoProjects'

import { useLoggedIn } from '../auth'

export const Home: AppPage = () => {
  const { session } = useLoggedIn()

  return <NoProjects buttonProps={{ onClick: () => signOut() }} />
}

Home.isProtected = true
