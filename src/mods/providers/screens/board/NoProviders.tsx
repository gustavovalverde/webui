import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { Empty } from '@/ui'

import { useCreationEditingProvider } from '../../components/creation-editing'

export const NoProviders: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useCreationEditingProvider()

  return (
    <Empty
      title="No Providers"
      message="Add to your Project a SIP Provider to make and receive calls from regular phones."
      buttonProps={{
        text: 'New Provider',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
