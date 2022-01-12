import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from './createPanel'

const useStore = createPanelStore()

export const useProviderPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
