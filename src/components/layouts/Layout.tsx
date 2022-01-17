import React from 'react'

import { CreateNumberPanel } from '@/mods/numbers'
import {
  CreateProjectPanel,
  NoProjects,
  useCurrentProject,
} from '@/mods/projects'
import { CreateProviderPanel } from '@/mods/providers'
import { Spinner } from '@/ui'

import { Notification } from '../Notification'
import { Header } from './Header'
import { Sidebar } from './navigation'

const Content: React.FC = ({ children }) => (
  <div className="h-full flex w-full">
    <Sidebar />

    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <section className="p-6 min-w-0 flex-1 h-full flex flex-col lg:order-last">
            {children}
          </section>
        </main>
      </div>
    </div>
  </div>
)

export const Layout: React.FC = ({ children }) => {
  const { hasProjects, isSuccess } = useCurrentProject()

  if (isSuccess)
    return (
      <>
        <Notification />
        {hasProjects ? (
          <>
            <Content {...{ children }} />
            <CreateProviderPanel />
            <CreateNumberPanel />
          </>
        ) : (
          <NoProjects />
        )}
        <CreateProjectPanel />
      </>
    )

  return <Spinner />
}
