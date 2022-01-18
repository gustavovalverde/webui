import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createShowingStore } from '@/mods/shared/hooks/useCreateShowingStore'

const useStore = createShowingStore()

export const useCreationEditingProject = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
