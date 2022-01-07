import '../styles/styles.css'

import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'

import type { AppProps } from '@/@types'
import { Authenticated, Unauthenticated } from '@/mods/auth'
import { Meta } from '@/ui'

const Application = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Meta />
    <NextNProgress color="#25b37e" />

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
