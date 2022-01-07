import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'

import { Button, Container, Text, Typography, WhiteText } from '@/ui'

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

        <Typography.Title level={2} className="my-7">
          Sign in to Fonoster
        </Typography.Title>
        <Text>
          Create a smart voice applications that meets your business needs
          without the clutter of unneeded features or historically burdensome
          customizations.
        </Text>
        <div className="mt-7">
          <Button onClick={() => signIn('github')}>Sign in with Github</Button>

          <WhiteText className="mt-7">
            By signing, I agree to Fonoster’s Terms and Privacy Policy.
          </WhiteText>
        </div>
      </div>
    </Container>
  )
}
