import { useCallback } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'

type Store = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useStore = create<Store>(set => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}))

export const useProjectModal = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
