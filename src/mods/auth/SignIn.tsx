import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { PoliciesOfUse } from '@/components/Policies'
import { Button, Container, Text, Title } from '@/ui'
import { SignInIcon } from '@/ui'

import { useNextPath } from './useNextPath'

export const SignIn: NextPage = () => {
  const [isLoading, setLoading] = useState(false)

  useNextPath()

  const signInGithub = useCallback(() => {
    setLoading(true)

    signIn('github')
  }, [])

  return (
    <Container>
      <div className="max-w-lg mx-auto">
        <SignInIcon />

        <Title className="my-7">Sign in to Fonoster</Title>
        <Text className="mb-7">
          Create a smart voice applications that meets your business needs
          without the clutter of unneeded features or historically burdensome
          customizations.
        </Text>

        <Button loading={isLoading} onClick={signInGithub}>
          Sign in with Github
        </Button>

        <PoliciesOfUse />
      </div>
    </Container>
  )
}
