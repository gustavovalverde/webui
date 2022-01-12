import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export { SignIn as default } from '@/mods/auth'

export async function getServerSideProps({ req }: NextPageContext) {
  const session = await getSession({ req })

  return {
    props: {
      session,
    },
  }
}
