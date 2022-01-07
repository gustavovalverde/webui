import React from 'react'

import { Typography } from '.'

type Paragraph = React.HTMLAttributes<HTMLParagraphElement>

export const Text: React.FC<Paragraph> = ({ className, ...props }) => (
  <Typography.Text>
    <p className={`text-gray-500 dark:text-gray-300 ${className}`} {...props} />
  </Typography.Text>
)

export const WhiteText: React.FC<Paragraph> = props => (
  <Typography.Text>
    <p {...props} />
  </Typography.Text>
)
