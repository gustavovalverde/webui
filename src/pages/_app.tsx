import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { DefaultSeo as Seo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'

import { Meta } from '@/ui/Meta'

export default function Application({ Component, pageProps }: AppProps) {
  const { basePath } = useRouter()

  return (
    <>
      <Meta />
      <Seo
        title="The Open Source Twilio Alternative | Fonoster"
        openGraph={{
          type: 'website',
          /**
           * @todo This info should be moved into a configuration file.
           */
          url: 'https://console.fonoster.com/',
          site_name: 'Fonoster',
          images: [
            {
              url: `https://console.fonoster.com${basePath}/images/og/og-image.jpg`,
              width: 800,
              height: 600,
              alt: 'Fonoster Og Image',
            },
          ],
        }}
        twitter={{
          handle: '@fonoster',
          site: '@fonoster',
          cardType: 'summary_large_image',
        }}
      />
      <NextNProgress color="#25b37e" />
      <Component {...pageProps} />
    </>
  )
}
