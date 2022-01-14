import { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Notifier } from '@/components/Notification'
import { wait } from '@/helpers/wait'
import { useNumberPanel } from '@/hooks/panels/useNumberPanel'
import { useProviderPanel } from '@/hooks/panels/useProviderPanel'
import { useCreateNumber } from '@/hooks/sdk/useNumbers'
import { useProviders } from '@/hooks/sdk/useProviders'
import { Button, Input, Panel, Select, Spinner } from '@/ui'

export const CreateNumberPanel = () => {
  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      providerRef: '',
      e164Number: '',
      aorLink: '',
      ingressInfo: {
        webhook: '',
      },
    },
  })

  const { isOpen, close } = useNumberPanel()
  const { mutate, isLoading } = useCreateNumber()
  const { providers, isSuccess } = useProviders()
  const { open } = useProviderPanel()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    data =>
      mutate(data, {
        onSuccess() {
          onClose()

          Notifier.success('Your new Number has been successfully created.')
        },
      }),
    [mutate, onClose]
  )

  const aorLink = watch('aorLink')
  const webhook = watch('ingressInfo.webhook')

  const hasProviders = useMemo(() => providers.length !== 0, [providers])

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title="Create a Number to connect your SIP Network resources"
      description="You will be able to create Numbers, SIP Agents, Domains, Functions, etc."
      saveButtonProps={{
        children: 'Create Number',
        loading: isLoading,
        onClick: handleSubmit(onSave),
      }}
    >
      {isSuccess ? (
        <>
          <Controller
            name="providerRef"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Select
                className={hasProviders ? 'mb-4' : 'mb-0'}
                label="Service Provider"
                placeholder="Choose a Provider"
                disabled={!hasProviders || isLoading}
                error={
                  !hasProviders
                    ? 'Before adding a Number you must create a Provider (trunk)'
                    : errors?.providerRef && 'You must enter a service provider'
                }
                {...{
                  name,
                  onBlur,
                  onChange,
                  value,
                }}
              >
                <Select.Option value="">Choose a Provider</Select.Option>
                {providers.map(({ ref, name }) => (
                  <Select.Option key={ref} value={ref}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />

          {!hasProviders && (
            <Button
              type="secondary"
              block
              className="mb-4"
              onClick={() => {
                onClose()

                open()
              }}
            >
              Add Provider
            </Button>
          )}

          <Controller
            name="e164Number"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="E.164 Number"
                placeholder="Type a number (e.g. +16471234567)"
                descriptionText="Number in E.164 format (e.g. +16471234567)"
                disabled={isLoading}
                error={
                  errors?.e164Number &&
                  'You must enter a Number in E.164 format.'
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
            name="aorLink"
            control={control}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Address of Record (AOR)"
                labelOptional="Optional"
                placeholder="(e.g. sip:voice@region-nyc01)"
                disabled={Boolean(webhook || isLoading)}
                {...{
                  name,
                  onBlur,
                  onChange,
                  value,
                }}
              />
            )}
          />

          {!aorLink && (
            <Controller
              name="ingressInfo.webhook"
              control={control}
              rules={{ required: true }}
              render={({ field: { name, onBlur, onChange, value } }) => (
                <Input
                  className="mb-4"
                  label="Webhook"
                  placeholder="(e.g. https://c5b6-172-22215.ngrok.io)"
                  disabled={isLoading}
                  error={
                    errors?.ingressInfo?.webhook &&
                    'You must enter a webhook for your Number.'
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
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Panel>
  )
}
