import type { ButtonProps } from '@supabase/ui/dist/cjs/components/Button/Button'
import React from 'react'

import { Button, Container, Text, Title } from '@/ui'

import { EmptyIcon } from './svg'

interface Props {
  title: string
  message: string
  buttonProps?: ButtonProps & { text: string }
}

export const Empty: React.FC<Props> = ({ title, message, buttonProps }) => (
  <Container>
    <div className="max-w-xl mx-auto text-center">
      <EmptyIcon className="w-14 mx-auto mb-4" />

      <Title level={3}>{title}</Title>
      <Text>{message}</Text>

      {buttonProps && (
        <div>
          <Button {...buttonProps}>{buttonProps.text}</Button>
        </div>
      )}
    </div>
  </Container>
)
