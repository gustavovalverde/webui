import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { Panel } from '@/ui'
import { Button, Checkbox, Input, Text, Title } from '@/ui'

import { useDeleteProject } from '../../hooks/useDeleteProject'
import { useEditProject } from '../../hooks/useEditProject'
import { useRefreshSecret } from '../../hooks/useRefreshSecret'
import { useCurrentProject } from '../current-project'
import { useProjectSettingsPanel } from '.'

export const ProjectSettingsPanel = () => {
  const { isOpen, defaultValues, close } = useProjectSettingsPanel()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ defaultValues })

  const { mutate: edit, isLoading: isEditLoading } = useEditProject()

  const onSave = useCallback(
    project => {
      edit(project, {
        onSuccess() {
          close()

          Notifier.success('Your Project has been successfully edited.')
        },
      })
    },
    [edit, close]
  )

  const { currentProject } = useCurrentProject()

  const { mutate, isLoading: isDeleteLoading } = useDeleteProject()
  const { mutate: mutateRefreshSecret, isLoading: isRefreshSecretLoading } =
    useRefreshSecret()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const isLoading = useMemo(
    () => isDeleteLoading || isEditLoading,
    [isDeleteLoading, isEditLoading]
  )

  const onRefreshSecret = useCallback(() => {
    if (currentProject?.ref)
      mutateRefreshSecret(currentProject.ref, {
        onSuccess() {
          Notifier.success(
            'Your secret access key has been successfully renewed.'
          )
        },
      })
  }, [mutateRefreshSecret, currentProject?.ref])

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

  useEffect(() => {
    reset(currentProject ?? {})
  }, [currentProject, reset])

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
                <dl>
                  <div className="pt-4 sm:pt-5 sm:grid sm:grid-cols-1 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-300">
                      Access Key ID
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      <Input readOnly copy value={currentProject.accessKeyId} />
                    </dd>
                  </div>
                  <div className="pt-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-300">
                      Access Key Secret
                    </dt>
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 flex flex-col items-end">
                      <Input
                        reveal
                        readOnly
                        copy
                        value={currentProject.accessKeySecret}
                        className="w-full"
                      />
                      <Button
                        key="refresh-secret"
                        size="small"
                        type="secondary"
                        onClick={onRefreshSecret}
                        loading={isRefreshSecretLoading}
                        className="mt-2 text"
                      >
                        {isRefreshSecretLoading ? 'Renewing...' : 'Renew Key'}
                      </Button>
                    </dd>
                  </div>

                  <div className="pb-4 sm:grid sm:grid-cols-1 sm:gap-4">
                    <dd className="text-sm text-white sm:mt-0 sm:col-span-1">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { name, onBlur, onChange, value },
                        }) => (
                          <Input
                            className="mb-4"
                            label="Your Project name"
                            placeholder="Type a friendly name"
                            disabled={isLoading}
                            error={
                              errors?.name &&
                              'You must enter a name for your Project, try something friendly and related to your organization'
                            }
                            {...{
                              name,
                              onBlur,
                              onChange,
                              value,
                            }}
                          />
                        )}
                      />
                    </dd>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                      <Controller
                        name="allowExperiments"
                        control={control}
                        render={({
                          field: { name, onBlur, onChange, value },
                        }) => (
                          <Checkbox
                            label="Enable experimental APIs"
                            description="Access features that aren’t yet generally available."
                            disabled={isLoading}
                            checked={Boolean(value)}
                            {...{
                              name,
                              onBlur,
                              onChange,
                            }}
                          />
                        )}
                      />
                    </dd>
                  </div>

                  <div className="flex-shrink-0 flex justify-end">
                    <Button
                      className="ml-4"
                      loading={isEditLoading}
                      disabled={!isDirty}
                      type={isDirty ? 'primary' : 'secondary'}
                      onClick={handleSubmit(onSave)}
                    >
                      Save
                    </Button>
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
                        className="cancel"
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
