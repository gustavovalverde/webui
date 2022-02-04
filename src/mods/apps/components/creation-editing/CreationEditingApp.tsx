import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useSecrets } from '@/mods/secrets/hooks/useSecrets'
import { Notifier } from '@/mods/shared/components/Notification'
import { wait } from '@/mods/shared/helpers/wait'
import { Button, Checkbox, Input, Panel, Select, Spinner } from '@/ui'

import { useCreateApp } from '../../hooks/useCreateApp'
import { useEditApp } from '../../hooks/useEditApp'
import { useCreationEditingApp } from './useCreationEditingApp'

export const CreationEditingApp: React.FC = () => {
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showTransferConfig, setShowTransferConfig] = useState(false)
  const [showIntensConfig, setShowIntentsConfig] = useState(false)

  const { isOpen, isEdit, defaultValues, close } = useCreationEditingApp()
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(isEdit ? defaultValues : {})
  }, [isEdit, defaultValues, reset])

  const { mutate: create, isLoading: isCreateLoading } = useCreateApp()
  const { mutate: edit, isLoading: isEditLoading } = useEditApp()

  const isLoading = useMemo(
    () => isCreateLoading || isEditLoading,
    [isCreateLoading, isEditLoading]
  )

  const { secrets, isSuccess } = useSecrets()

  const onClose = useCallback(() => {
    close()
    wait(reset)
  }, [close, reset])

  const onSave = useCallback(
    application => {
      isEdit
        ? edit(application, {
            onSuccess() {
              onClose()

              Notifier.success('Your Application has been successfully edited.')
            },
          })
        : create(application, {
            onSuccess() {
              onClose()

              Notifier.success(
                'Your new Application has been successfully created.'
              )
            },
          })
    },
    [create, edit, isEdit, onClose]
  )

  const hasSecrets = useMemo(() => secrets.length !== 0, [secrets])

  const headings = useMemo(
    () => ({
      title: isEdit
        ? 'Edit a Application to connect your SIP Network resources'
        : 'Create a Application to connect your SIP Network resources',
      description:
        'You will be able to create Numbers, SIP Agents, Domains, Functions, etc.',
      buttonText: isEdit ? 'Edit App' : 'Create App',
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
                label="Your name"
                placeholder="Type a friendly name"
                disabled={isLoading}
                error={
                  errors?.name &&
                  'You must enter a name for your Application, try something friendly.'
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
            name="initialDtmf"
            control={control}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Initial DTMF"
                type="number"
                labelOptional="(optional)"
                placeholder="(e.g. 1234)"
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

          <Controller
            name="speechConfig.secretName"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Select
                className={hasSecrets ? 'mb-4' : 'mb-0'}
                label="Speech Config Secret"
                disabled={!hasSecrets || isLoading}
                error={
                  !hasSecrets
                    ? 'Before adding a Application you must create a Secret'
                    : errors?.speechConfig?.secretName &&
                      'You must enter a Secret'
                }
                {...{
                  name,
                  onBlur,
                  onChange,
                  value,
                }}
              >
                <Select.Option value="">Choose a Secret</Select.Option>
                {secrets.map(({ name }) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />

          {!hasSecrets && (
            <Button
              type="secondary"
              block
              className="mb-4"
              onClick={() => {
                onClose()

                open()
              }}
            >
              Add Secret
            </Button>
          )}

          <Controller
            name="speechConfig.voice"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Type a voice"
                placeholder="(e.g. en-US-Wavenet-F)"
                disabled={isLoading}
                error={
                  errors?.speechConfig?.voice &&
                  'You must enter a voice for your Application.'
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
            name="speechConfig.languageCode"
            control={control}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Input
                className="mb-4"
                label="Type a lang-code"
                placeholder="(e.g. en-US)"
                labelOptional="(optional)"
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

          <Controller
            name="intentsEngineConfig.secretName"
            control={control}
            rules={{ required: true }}
            render={({ field: { name, onBlur, onChange, value } }) => (
              <Select
                className={hasSecrets ? 'mb-4' : 'mb-0'}
                label="Intents Engine Secret"
                disabled={!hasSecrets || isLoading}
                error={
                  !hasSecrets
                    ? 'Before adding a Application you must create a Secret'
                    : errors?.speechConfig?.secretName &&
                      'You must enter a Secret'
                }
                {...{
                  name,
                  onBlur,
                  onChange,
                  value,
                }}
              >
                <Select.Option value="">Choose a Secret</Select.Option>
                {/* eslint-disable-next-line sonarjs/no-identical-functions */}
                {secrets.map(({ name }) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />

          <Checkbox
            label="Show other configurable options"
            description="You can configure more options for your Application."
            disabled={isLoading}
            checked={showMoreOptions}
            onChange={e => setShowMoreOptions(e.target.checked)}
          />

          {showMoreOptions && (
            <>
              <Controller
                name="welcomeIntentPhrase"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Input
                    className="mb-4"
                    label="Type a welcome intent phrase"
                    placeholder="(e.g. ..."
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

              <Controller
                name="activationIntentId"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Input
                    className="mb-4"
                    label="Type a activation intent ID"
                    placeholder="(e.g. ..."
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

              <Controller
                name="activationTimeout"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Input
                    className="mb-4"
                    type="number"
                    label="Type a activation timeout"
                    placeholder="(e.g. ..."
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

              <Controller
                name="interactionTimeout"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Input
                    className="mb-4"
                    type="number"
                    label="Type a interaction timeout"
                    placeholder="(e.g. ..."
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

              <Controller
                name="enableEvents"
                control={control}
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <Checkbox
                    label="Enable Events"
                    description="Enable Events for your Application."
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

              <Checkbox
                label="Show transfer options"
                description="You can configure transfer options for your Application."
                disabled={isLoading}
                checked={showTransferConfig}
                onChange={e => setShowTransferConfig(e.target.checked)}
              />

              {showTransferConfig && (
                <>
                  <Controller
                    name="transferConfig.media"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a media"
                        placeholder="(e.g. ..."
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
                  <Controller
                    name="transferConfig.mediaBusy"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a media busy"
                        placeholder="(e.g. ..."
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
                  <Controller
                    name="transferConfig.mediaNoAnswer"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a media no answer"
                        placeholder="(e.g. ..."
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

                  <Controller
                    name="transferConfig.message"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a message"
                        placeholder="(e.g. ..."
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

                  <Controller
                    name="transferConfig.messageBusy"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a message busy"
                        placeholder="(e.g. ..."
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

                  <Controller
                    name="transferConfig.messageNoAnswer"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a message no answer"
                        placeholder="(e.g. ..."
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

              <Checkbox
                label="Show intents options"
                description="You can configure intents options for your Application."
                disabled={isLoading}
                checked={showIntensConfig}
                onChange={e => setShowIntentsConfig(e.target.checked)}
              />

              {showIntensConfig && (
                <>
                  <Controller
                    name="intentsEngineConfig.agent"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a agent"
                        placeholder="(e.g. ..."
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

                  <Controller
                    name="intentsEngineConfig.location"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a location"
                        placeholder="(e.g. ..."
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

                  <Controller
                    name="intentsEngineConfig.welcomeIntentEvent"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <Input
                        className="mb-4"
                        label="Type a welcome intent event"
                        placeholder="(e.g. ..."
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
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Panel>
  )
}
