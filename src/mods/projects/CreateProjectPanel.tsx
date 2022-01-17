import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Notifier } from '@/components/Notification'
import { wait } from '@/helpers/wait'
import { useProjectPanel } from '@/hooks/panels/useProjectPanel'
import { useCreateProject } from '@/hooks/sdk/useProjects'
import { Checkbox, Input, Panel } from '@/ui'

export const CreateProjectPanel = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      allowExperiments: true,
    },
  })

  const { isOpen, close } = useProjectPanel()
  const { mutate, isLoading } = useCreateProject()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    data =>
      mutate(data, {
        onSuccess() {
          onClose()

          Notifier.success('Your new Project has been successfully created.')
        },
      }),
    [mutate, onClose]
  )

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title="Create a Project to get started managing your resources"
      description="You will be able to create and manage your Providers, Numbers, SIP Agents, Domains, Functions, etc."
      saveButtonProps={{
        children: 'Create Project',
        loading: isLoading,
        onClick: handleSubmit(onSave),
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onBlur, onChange, value } }) => (
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

      <Controller
        name="allowExperiments"
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Checkbox
            label="Enable experimental APIs"
            description="Access features that aren’t yet generally available."
            disabled={isLoading}
            checked={value}
            {...{
              name,
              onBlur,
              onChange,
            }}
          />
        )}
      />
    </Panel>
  )
}
