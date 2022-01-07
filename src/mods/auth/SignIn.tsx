import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'

import { Button, Container, Text, Title, WhiteText } from '@/ui'

import { useNextPath } from './useNextPath'

export const SignIn: NextPage = () => {
  useNextPath()

  return (
    <Container>
      <div className="max-w-lg mx-auto">
        {/**
         * @todo Change to Image
         */}
        <img
          className="w-full h-full"
          src="/signin.svg"
          alt="Man looking at item at a store"
        />

        <Title className="my-7">Sign in to Fonoster</Title>
        <Text className="mb-7">
          Create a smart voice applications that meets your business needs
          without the clutter of unneeded features or historically burdensome
          customizations.
        </Text>

        <Button onClick={() => signIn('github')}>Sign in with Github</Button>

        <WhiteText className="mt-7">
          By signing, I agree to Fonoster’s{' '}
          <a
            href="https://fonoster.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href="https://fonoster.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy.
          </a>
        </WhiteText>
      </div>
    </Container>
  )
}
