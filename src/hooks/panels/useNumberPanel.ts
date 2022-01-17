import type { Number } from '@fonoster/numbers/dist/client/types'
import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from './createPanelStore'

const useStore = createPanelStore<Partial<Number>>({
  providerRef: '',
  e164Number: '',
  ingressInfo: {
    webhook: '',
  },
})

export const useNumberPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
