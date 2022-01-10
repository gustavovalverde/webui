import { Typography } from '@supabase/ui'
import React from 'react'

type Paragraph = React.HTMLAttributes<HTMLParagraphElement>
type Heading = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5
}

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

export const Title: React.FC<Heading> = ({
  level = 2,
  children,
  className,
  style,
}) => <Typography.Title level={level} {...{ children, className, style }} />
