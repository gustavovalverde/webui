import { Input } from '@supabase/ui'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback, useLayoutEffect, useState } from 'react'
import { dehydrate } from 'react-query'

import type { AppPage } from '@/@types'
import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { useTitle } from '@/mods/shared/hooks/useTitle'
import { getQueryClient } from '@/mods/shared/lib/queryClient'
import { Button, Checkbox, Text, Title } from '@/ui'

import { useCreationEditingProject } from '../components/creation-editing'
import { useCurrentProject } from '../components/current-project'
import { useDeleteProject } from '../hooks/useDeleteProject'

export const Settings: AppPage = () => {
  const { currentProject } = useCurrentProject()

  const { mutate, isLoading } = useDeleteProject()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const { openEditing } = useCreationEditingProject()

  const { setTitle } = useTitle()

  useLayoutEffect(() => {
    setTitle(`Projects / ${currentProject?.name} / Settings`)
  }, [setTitle, currentProject?.name])

  const onDelete = useCallback(() => {
    if (currentProject?.ref)
      mutate(currentProject.ref, {
        onSuccess() {
          setDeleteModalOpen(false)

          Notifier.success('Your Project has been successfully deleted.')
        },
      })
  }, [mutate, currentProject?.ref])

  return (
    currentProject && (
      <>
        <div>
          <div>
            <Title level={4} className="leading-6 m-0">
              General Information
            </Title>
            <Text>Project details and application.</Text>
          </div>
          <div className="mt-5 border-t border-gray-400">
            <dl className="sm:divide-y sm:divide-gray-600">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">Name</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {currentProject?.name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">
                  Access Key ID
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  <Input readOnly copy value={currentProject.accessKeyId} />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">
                  Access Key Secret
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  <Input
                    reveal
                    readOnly
                    copy
                    value={currentProject.accessKeySecret}
                  />
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">
                  Experimental APIs
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  <Checkbox
                    label="Enable experimental APIs"
                    description="Access features that aren’t yet generally available."
                    checked={Boolean(currentProject.allowExperiments)}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6">
          <div>
            <Title level={4} className="leading-6 m-0">
              Danger Zone
            </Title>
            <Text>
              This section is mainly dedicated to all actions that cannot be
              undone. Please be certain.
            </Text>
          </div>
          <div className="mt-5 border-t border-gray-400">
            <dl className="sm:divide-y sm:divide-gray-600">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-8">
                <dt>
                  <Title level={5} className="m-0">
                    Edit Project
                  </Title>
                  <Text options={{ small: true }}>
                    Once you edit a Project, there is no going back.
                  </Text>
                </dt>
                <dd className="flex items-center mt-1 sm:col-span-2">
                  <Button onClick={() => openEditing(currentProject)}>
                    Edit Project
                  </Button>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-8">
                <dt>
                  <Title level={5} className="m-0">
                    Delete Project
                  </Title>
                  <Text options={{ small: true }}>
                    Once you delete a Project and all related data, there is no
                    going back.
                  </Text>
                </dt>
                <dd className="flex items-center mt-1 sm:col-span-2">
                  <Button
                    type="secondary"
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    Delete Project
                  </Button>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <DeleteResource
          refId={currentProject.ref}
          title={`Delete Project (${currentProject.name})`}
          isOpen={isDeleteModalOpen}
          isLoading={isLoading}
          onDelete={onDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      </>
    )
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const queryClient = getQueryClient()

  /**
   * @todo Find a way to hydrate queries on server without using fetch or axios
   * await queryClient.prefetchQuery('projects', getProjects)
   */

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

Settings.isProtected = true

export default Settings
