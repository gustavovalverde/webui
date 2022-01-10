import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React, { useCallback } from 'react'

import { useModals } from '@/contexts/ModalsContext'
import { Empty } from '@/ui'

export const NoProjects: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { setOpenProjectModal } = useModals()

  const onClick = useCallback(
    () => setOpenProjectModal(true),
    [setOpenProjectModal]
  )

  return (
    <Empty
      title="No Projects"
      message="You haven’t created a Project yet. Use Projects to get started creating Providers, Numbers, Agents, and other resources for your organization."
      buttonProps={{
        text: 'New Project',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
