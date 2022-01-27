import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { Empty } from '@/ui'

import { useCreationEditingDomain } from '../../components/creation-editing'

export const NoDomains: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useCreationEditingDomain()

  return (
    <Empty
      title="No Domains"
      message="You haven’t created a Domain yet. Use Domains to get started creating Domains, and using the Call manager."
      buttonProps={{
        text: 'New Domain',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
