import '../styles/styles.css'

import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { injectStyle } from 'react-toastify/dist/inject-style'

import type { AppProps } from '@/@types'
import { Layout } from '@/components/Layout'
import { Progress } from '@/components/Progress'
import { getQueryClient } from '@/lib/queryClient'
import { Authenticated, Unauthenticated } from '@/mods/auth'
import { Meta } from '@/ui'

const Application = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(() => getQueryClient())

  useEffect(() => {
    injectStyle()
  }, [])

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Meta />
          <Progress />

          <ReactQueryDevtools initialIsOpen={false} />

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
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default Application
