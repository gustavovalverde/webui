import '../styles/styles.css'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style'

import type { AppProps } from '@/@types'
import { Layout } from '@/components/Layout'
import { Progress } from '@/components/Progress'
import { Authenticated, Unauthenticated } from '@/mods/auth'
import { Meta } from '@/ui'

const Application = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  useEffect(() => {
    injectStyle()
  }, [])

  return (
    <SessionProvider session={session}>
      <Meta />
      <Progress />

      <div className="dark">
        {Component?.isProtected ? (
          <Authenticated>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Authenticated>
        ) : (
          <Unauthenticated>
            <Component {...pageProps} />
          </Unauthenticated>
        )}
      </div>
    </SessionProvider>
  )
}

export default Application
