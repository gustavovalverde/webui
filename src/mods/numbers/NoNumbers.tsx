import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { useNumberPanel } from '@/hooks/panels/useNumberPanel'
import { Empty } from '@/ui'

export const NoNumbers: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useNumberPanel()

  return (
    <Empty
      title="No Numbers"
      message="You haven’t created a Provider yet. Use Providers to get started creating Numbers, and using the Call manager."
      buttonProps={{
        text: 'New Number',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
