import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createShowingStore } from './createShowingStore'

const useStore = createShowingStore()

export const useProjectPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
