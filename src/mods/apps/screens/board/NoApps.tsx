import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { Empty } from '@/ui'

import { useCreationEditingApp } from '../../components/creation-editing'

export const NoApps: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useCreationEditingApp()

  return (
    <Empty
      title="No Applications"
      message="You haven’t created a Application yet. Use Apps to get started creating Numbers, and using the Call manager."
      buttonProps={{
        text: 'New App',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
