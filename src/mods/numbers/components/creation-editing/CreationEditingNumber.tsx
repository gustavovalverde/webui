import type { Number } from '@fonoster/numbers/dist/client/types'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

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
    formState: { errors },
  } = useForm<Number>({ defaultValues })

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
  const { open } = useCreationEditingProvider()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    (data: Number) => {
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

  const headings = useMemo(
    () => ({
      title: isEdit
        ? 'Edit a Number to connect your SIP Network resources'
        : 'Create a Number to connect your SIP Network resources',
      description:
        'You will be able to create Numbers, SIP Agents, Domains, Functions, etc.',
      buttonText: isEdit ? 'Edit Number' : 'Create Number',
    }),
    [isEdit]
  )

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
      {isSuccess ? (
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
            </>
          )}

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
        </>
      ) : (
        <Spinner />
      )}
    </Panel>
  )
}
