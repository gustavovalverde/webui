import { NextApiRequest } from 'next'
import type { AppProps as NextAppProps } from 'next/app'

import { Response } from '@/lib/sdk/Response'

import type { AuthProps } from '.'

export interface AppProps extends Omit<NextAppProps, 'Component'> {
  Component: NextAppProps['Component'] & AuthProps
}

export type Nullable<T> = T | null

export type Handler = (req: NextApiRequest) => Promise<Response<unknown>>

export type IRequestHandler = Record<string, Handler>
