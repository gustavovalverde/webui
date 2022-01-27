import type { CreateSecretRequest } from '@fonoster/secrets/dist/client/types'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Notifier } from '@/mods/shared/components/Notification'
import { wait } from '@/mods/shared/helpers/wait'
import { Input, Panel } from '@/ui'

import { useCreateSecret } from '../../hooks/useCreateSecret'
import { useCreationEditingSecret } from './useCreationEditingSecret'

export const CreationEditingSecret: React.FC = () => {
  const { isOpen, defaultValues, close } = useCreationEditingSecret()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSecretRequest>({ defaultValues })

  const { mutate: create, isLoading } = useCreateSecret()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    (secret: CreateSecretRequest) => {
      create(secret, {
        onSuccess() {
          onClose()

          Notifier.success('Your new Secret has been successfully created.')
        },
      })
    },
    [create, onClose]
  )

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title="Create a Secret to connect your SIP Network resources"
      description="You will be able to create Numbers, SIP Agents, Domains, Functions, etc."
      saveButtonProps={{
        children: 'Create Secret',
        loading: isLoading,
        onClick: handleSubmit(onSave),
      }}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^([a-zA-Z0-9][^*/><?\|:]*)$/,
            message: 'Secret name must not contain special characters.',
          },
        }}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input
            className="mb-4"
            label="Your name"
            placeholder="Type a friendly name"
            disabled={isLoading}
            descriptionText="Friendly name (e.g. PERSONAL_ACCESS_TOKEN)"
            error={
              errors?.name &&
              (errors.name.message ??
                'You must enter a name for your Secret, try something friendly.')
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
        name="secret"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input.TextArea
            className="mb-4"
            rows={12}
            label="Your value"
            placeholder="Type a secret value"
            disabled={isLoading}
            error={errors?.secret && 'You must enter a secret value.'}
            {...{
              name,
              onBlur,
              onChange,
              value,
            }}
          />
        )}
      />
    </Panel>
  )
}
