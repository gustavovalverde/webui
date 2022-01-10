import '../styles/styles.css'

import { SessionProvider } from 'next-auth/react'

import type { AppProps } from '@/@types'
import { Progress } from '@/components/Progress'
import { Authenticated, Unauthenticated } from '@/mods/auth'
import { Meta } from '@/ui'

const Application = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Meta />
    <Progress />

    <div className="dark">
      {Component?.isProtected ? (
        <Authenticated>
          <Component {...pageProps} />
        </Authenticated>
      ) : (
        <Unauthenticated>
          <Component {...pageProps} />
        </Unauthenticated>
      )}
    </div>
  </SessionProvider>
)

export default Application
