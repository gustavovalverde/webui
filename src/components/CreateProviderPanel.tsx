import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Notifier } from '@/components/Notification'
import { wait } from '@/helpers/wait'
import { useProviderPanel } from '@/hooks/panels/useProviderPanel'
import { useCreateProvider } from '@/hooks/sdk/useProviders'
import { Input, Panel, Radio } from '@/ui'

export const CreateProviderPanel = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      secret: '',
      host: '',
      transport: '',
      expires: '',
    },
  })

  const { isOpen, close } = useProviderPanel()
  const { mutate, isLoading } = useCreateProvider()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    data =>
      mutate(data, {
        onSuccess() {
          onClose()

          Notifier.success('Your new Provider has been successfully created.')
        },
      }),
    [mutate, onClose]
  )

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title="Create a Provider to connect your SIP Network resources"
      description="You will be able to create Numbers, SIP Agents, Domains, Functions, etc."
      saveButtonProps={{
        children: 'Create Provider',
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
            label="Your Provider name"
            placeholder="Type a friendly name"
            disabled={isLoading}
            error={
              errors?.name &&
              'You must enter a name for your Provider, try something friendly.'
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
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input
            className="mb-4"
            label="Your username"
            placeholder="Type a username"
            disabled={isLoading}
            error={
              errors?.username && 'You must enter a username for your Provider.'
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
        rules={{ required: true }}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input
            className="mb-4"
            label="Your secret"
            placeholder="Type a secret"
            disabled={isLoading}
            type="password"
            error={
              errors?.secret && 'You must enter a secret for your Provider.'
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
        name="host"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input
            className="mb-4"
            label="Hostname or IP of the Provider"
            placeholder="Type a host"
            disabled={isLoading}
            error={errors?.host && 'You must enter a host for your Provider.'}
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
        name="transport"
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Radio.Group
            className="mb-4"
            type="cards"
            label="Transport"
            labelOptional="Will use TCP if none is provided"
            {...{
              name,
              onBlur,
              onChange,
              value,
            }}
          >
            <Radio
              label="Transmission Control Protocol (TCP)"
              value="tcp"
              disabled={isLoading}
            />
            <Radio
              label="User Datagram Protocol (UDP)"
              value="udp"
              disabled={isLoading}
            />
          </Radio.Group>
        )}
      />

      <Controller
        name="expires"
        control={control}
        render={({ field: { name, onBlur, onChange, value } }) => (
          <Input
            className="mb-4"
            label="SIP registration refresh (in seconds)"
            placeholder="Type a expires"
            type="number"
            disabled={isLoading}
            error={
              errors?.secret && 'You must enter a expires for your Provider.'
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
    </Panel>
  )
}
