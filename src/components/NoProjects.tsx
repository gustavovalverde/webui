import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { Empty } from '@/ui'

export const NoProjects: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => (
  <Empty
    title="No Projects"
    message="You haven’t created a Project yet. Use Projects to get started creating Providers, Numbers, Agents, and other resources for your organization."
    buttonProps={{
      text: 'New Project',
      ...buttonProps,
    }}
  />
)
