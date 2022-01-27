import { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { useCreationEditingAgent } from '@/mods/agents/components/creation-editing'
import { Empty } from '@/ui'

export const NoAgents: React.FC<{ buttonProps?: ButtonProps }> = ({
  buttonProps,
}) => {
  const { open: onClick } = useCreationEditingAgent()

  return (
    <Empty
      title="No Agents"
      message="You haven’t created a Agent yet. Use Agents to get started creating Agents, and using the Call manager."
      buttonProps={{
        text: 'New Agent',
        onClick,
        ...buttonProps,
      }}
    />
  )
}
