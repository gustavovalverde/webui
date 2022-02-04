import React from 'react'

import { CreationEditingAgent } from '@/mods/agents/components/creation-editing'
import { CreationEditingApp } from '@/mods/apps/components/creation-editing'
import { CreationEditingDomain } from '@/mods/domains/components/creation-editing'
import { CreationEditingNumber } from '@/mods/numbers/components/creation-editing'
import { CreationEditingProject } from '@/mods/projects/components/creation-editing'
import { useCurrentProject } from '@/mods/projects/components/current-project'
import { NoProjects } from '@/mods/projects/components/NoProjects'
import { ProjectSettingsPanel } from '@/mods/projects/components/settings'
import { CreationEditingProvider } from '@/mods/providers/components/creation-editing'
import { CreationEditingSecret } from '@/mods/secrets/components/creation-editing'
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
            <CreationEditingProvider />
            <CreationEditingNumber />
            <CreationEditingSecret />
            <CreationEditingDomain />
            <CreationEditingAgent />
            <ProjectSettingsPanel />
            <CreationEditingApp />
          </>
        ) : (
          <NoProjects />
        )}
        <CreationEditingProject />
      </>
    )

  return <Spinner />
}
