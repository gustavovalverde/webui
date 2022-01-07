import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Storage } from '@/helpers/Storage'

export const NEXT_PATH_KEY = 'fonoster.nextPage'

export const nextPage = new Storage(NEXT_PATH_KEY)

export const useNextPath = () => {
  const {
    query: { next },
  } = useRouter()

  useEffect(() => {
    if (next && typeof next === 'string') nextPage.set(next)
  }, [next])
}
