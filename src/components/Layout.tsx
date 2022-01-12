import React from 'react'

import { useProjects } from '@/hooks/sdk/useProjects'
import { Spinner } from '@/ui'

import { CreateProjectPanel } from './CreateProjectPanel'
import { NoProjects } from './empty-states'
import { Notification } from './Notification'

export const Layout: React.FC = ({ children }) => {
  const { projects, isSuccess } = useProjects()

  return isSuccess ? (
    <>
      <Notification />
      {projects.length ? children : <NoProjects />}
      <CreateProjectPanel />
    </>
  ) : (
    <Spinner />
  )
}
