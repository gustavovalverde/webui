import { useCallback, useState } from 'react'

import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { Panel } from '@/ui'
import { Button, Checkbox, Input, Text, Title } from '@/ui'

import { useDeleteProject } from '../../hooks/useDeleteProject'
import { useCreationEditingProject } from '../creation-editing'
import { useCurrentProject } from '../current-project'
import { useProjectSettingsPanel } from '.'

export const ProjectSettingsPanel = () => {
  const { isOpen, close } = useProjectSettingsPanel()

  const { currentProject } = useCurrentProject()

  const { mutate, isLoading } = useDeleteProject()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const { openEditing } = useCreationEditingProject()

  const onDelete = useCallback(() => {
    if (currentProject?.ref)
      mutate(currentProject.ref, {
        onSuccess() {
          close()
          setDeleteModalOpen(false)

          Notifier.success('Your Project has been successfully deleted.')
        },
      })
  }, [mutate, currentProject?.ref, close])

  return (
    <Panel
      close={close}
      isOpen={isOpen}
      title="Project Settings"
      description="An amazing description about the projects"
    >
      <>
        {currentProject && (
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
                    <dt className="sm:col-span-2">
                      <Title level={5} className="m-0">
                        Edit Project
                      </Title>
                      <Text options={{ small: true }}>
                        Once you edit a Project, there is no going back.
                      </Text>
                    </dt>
                    <dd className="flex items-center  justify-end mt-1">
                      <Button onClick={() => openEditing(currentProject)}>
                        Edit Project
                      </Button>
                    </dd>
                  </div>

                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-8">
                    <dt className="sm:col-span-2">
                      <Title level={5} className="m-0">
                        Delete Project
                      </Title>
                      <Text options={{ small: true }}>
                        Once you delete a Project and all related data, there is
                        no going back.
                      </Text>
                    </dt>
                    <dd className="flex items-center justify-end mt-1">
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
        )}
      </>
    </Panel>
  )
}
