import { useCallback } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'

type Store = {
  title: string
  setTitle: (title: string) => void
  reset: () => void
}

const useStore = create<Store>(set => ({
  title: 'Console',
  setTitle: title => set(() => ({ title })),
  reset: () => set(() => ({ title: 'Console' })),
}))

export const useTitle = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
