import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate } from 'react-query'

import { getQueryClient } from '@/lib/queryClient'

export { Home as default } from '@/mods/home'

export async function getServerSideProps({ req }: NextPageContext) {
  const session = await getSession({ req })
  const queryClient = getQueryClient()

  /**
   * @todo Find a way to hydrate queries on server without using fetch or axios
   * await queryClient.prefetchQuery('projects', getProjects)
   */

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
