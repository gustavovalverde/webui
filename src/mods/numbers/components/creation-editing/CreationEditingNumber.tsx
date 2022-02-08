// import type { Number } from '@fonoster/numbers/dist/client/types'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useApps } from '@/mods/apps/hooks/useApps'
import { useCreationEditingProvider } from '@/mods/providers/components/creation-editing'
import { useProviders } from '@/mods/providers/hooks/useProviders'
import { Notifier } from '@/mods/shared/components/Notification'
import { wait } from '@/mods/shared/helpers/wait'
import { Button, Input, Panel, Select, Spinner } from '@/ui'

import { useCreateNumber } from '../../hooks/useCreateNumber'
import { useEditNumber } from '../../hooks/useEditNumber'
import { useCreationEditingNumber } from './useCreationEditingNumber'

export const CreationEditingNumber = () => {
  const { isOpen, isEdit, defaultValues, close } = useCreationEditingNumber()
  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(isEdit ? defaultValues : {})
  }, [isEdit, defaultValues, reset])

  const { mutate: create, isLoading: isCreateLoading } = useCreateNumber()
  const { mutate: edit, isLoading: isEditLoading } = useEditNumber()

  const isLoading = useMemo(
    () => isCreateLoading || isEditLoading,
    [isCreateLoading, isEditLoading]
  )

  const { providers, isSuccess } = useProviders()
  const { apps, isSuccess: isSuccessApp } = useApps()
  const { open } = useCreationEditingProvider()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    data => {
      const number = isEdit
        ? {
            ...data,
            aorLink: undefined,
          }
        : data

      isEdit
        ? edit(number, {
            onSuccess() {
              onClose()

              Notifier.success('Your Number has been successfully edited.')
            },
          })
        : create(number, {
            onSuccess() {
              onClose()

              Notifier.success('Your new Number has been successfully created.')
            },
          })
    },
    [create, edit, isEdit, onClose]
  )

  const hasProviders = useMemo(() => providers.length !== 0, [providers])
  const hasApps = useMemo(() => apps.length !== 0, [apps])

  const headings = useMemo(
    () => ({
      title: isEdit
        ? 'Edit a Number to handle incoming and outgoing calls.'
        : 'Create a new Number to handle incoming and outgoing calls.',
      description:
        'You will need a Number to make and receive calls from traditional phones.',
      buttonText: isEdit ? 'Edit Number' : 'Create Number',
    }),
    [isEdit]
  )

  const webhook = watch('ingressInfo.webhook')
  const appRef = watch('ingressInfo.appRef')

  return (
    <Panel
      close={onClose}
      isOpen={isOpen}
      title={headings.title}
      description={headings.description}
      saveButtonProps={{
        children: headings.buttonText,
        loading: isLoading,
        onClick: handleSubmit(onSave),
      }}
    >
      {isSuccess && isSuccessApp ? (
        <>
          {!isEdit && (
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
                        : errors?.providerRef &&
                          'You must enter a service provider'
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
                    placeholder="Type a number (e.g. +17853178070)"
                    descriptionText="Number in E.164 format (e.g. +17853178070)"
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
            </>
          )}

          <Controller
            name="ingressInfo.appRef"
            control={control}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Select
                className={hasApps ? 'mb-4' : 'mb-0'}
                label="Select Application or type a webhook"
                placeholder="Choose a Application"
                disabled={!hasApps || Boolean(webhook) || isLoading}
                error={
                  !hasApps
                    ? 'Before adding a Number you must create a Application'
                    : errors?.providerRef && 'You must enter a Application'
                }
                {...{
                  name,
                  onBlur,
                  onChange,
                  value,
                }}
              >
                <Select.Option value="">Choose a Application</Select.Option>
                {apps.map(({ ref, name }) => (
                  <Select.Option key={ref} value={ref}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />

          <Controller
            name="ingressInfo.webhook"
            control={control}
            rules={{ required: !appRef }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                placeholder="Type a webhook (e.g. https://c5b6-172-22215.ngrok.io)"
                disabled={Boolean(appRef) || isLoading}
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
        </>
      ) : (
        <Spinner />
      )}
    </Panel>
  )
}
