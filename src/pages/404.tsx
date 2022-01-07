import type { NextPage } from 'next'

import { Container, Typography } from '@/ui'

const NotFound: NextPage = () => (
  <Container>
    <Typography.Title level={2}>
      Fonoster 404 — This page could not be found.
    </Typography.Title>
  </Container>
)

export default NotFound
