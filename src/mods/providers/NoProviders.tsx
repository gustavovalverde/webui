import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { useProviderPanel } from '@/hooks/panels/useProviderPanel'
import { Empty } from '@/ui'

export const NoProviders: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useProviderPanel()

  return (
    <Empty
      title="No Providers"
      message="You haven’t created a Provider yet. Use Providers to get started creating Numbers, and using the Call manager."
      buttonProps={{
        text: 'New Provider',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
