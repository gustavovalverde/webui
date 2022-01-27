import type { Domain } from '@fonoster/domains/dist/client/types'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useNumbers } from '@/mods/numbers/hooks/useNumbers'
import { Notifier } from '@/mods/shared/components/Notification'
import { wait } from '@/mods/shared/helpers/wait'
import { Input, Panel, Select, Spinner } from '@/ui'

import { useCreateDomain } from '../../hooks/useCreateDomain'
import { useEditDomain } from '../../hooks/useEditDomain'
import { useCreationEditingDomain } from './useCreationEditingDomain'

export const CreationEditingDomain = () => {
  const { isOpen, isEdit, defaultValues, close } = useCreationEditingDomain()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Domain>({ defaultValues })

  useEffect(() => {
    reset(isEdit ? defaultValues : {})
  }, [isEdit, defaultValues, reset])

  const { mutate: create, isLoading: isCreateLoading } = useCreateDomain()
  const { mutate: edit, isLoading: isEditLoading } = useEditDomain()

  const isLoading = useMemo(
    () => isCreateLoading || isEditLoading,
    [isCreateLoading, isEditLoading]
  )

  const { numbers, isSuccess } = useNumbers()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    (domain: Domain) => {
      isEdit
        ? edit(domain, {
            onSuccess() {
              onClose()

              Notifier.success('Your Domain has been successfully edited.')
            },
          })
        : create(domain, {
            onSuccess() {
              onClose()

              Notifier.success('Your new Domain has been successfully created.')
            },
          })
    },
    [create, edit, isEdit, onClose]
  )

  const hasNumbers = useMemo(() => numbers.length !== 0, [numbers])

  const headings = useMemo(
    () => ({
      title: isEdit
        ? 'Edit a Domain to connect your SIP Network resources'
        : 'Create a Domain to connect your SIP Network resources',
      description:
        'You will be able to create Domains, SIP Agents, Domains, Functions, etc.',
      buttonText: isEdit ? 'Edit Domain' : 'Create Domain',
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
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Your Domain name"
                placeholder="Type a friendly name"
                disabled={isLoading}
                error={
                  errors?.name &&
                  'You must enter a name for your Domain, try something friendly.'
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
            name="domainUri"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Your Domain URI"
                placeholder="Type a URI (e.g acme)"
                disabled={isLoading}
                labelOptional={isEdit ? '(Readonly)' : ''}
                readOnly={isEdit}
                copy={isEdit}
                error={
                  errors?.domainUri && 'You must enter a URI for your Domain.'
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

          {hasNumbers && (
            <>
              <Controller
                name="egressNumberRef"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Select
                    className={hasNumbers ? 'mb-4' : 'mb-0'}
                    label="Egress Number"
                    placeholder="Choose a Egress Number"
                    labelOptional="(Optional)"
                    disabled={!hasNumbers || isLoading}
                    error={
                      errors?.egressNumberRef &&
                      'You must enter a Egress Number.'
                    }
                    {...{
                      name,
                      onBlur,
                      onChange,
                      value,
                    }}
                  >
                    <Select.Option value="">
                      Choose a Egress Number
                    </Select.Option>
                    {numbers.map(({ ref, e164Number }) => (
                      <Select.Option key={ref} value={ref}>
                        {e164Number}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="egressRule"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Input
                    className="mb-4"
                    label="Your Egress Rule"
                    labelOptional="(Optional)"
                    placeholder="Type a rule (e.g .*)"
                    disabled={isLoading}
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
        </>
      ) : (
        <Spinner />
      )}
    </Panel>
  )
}
