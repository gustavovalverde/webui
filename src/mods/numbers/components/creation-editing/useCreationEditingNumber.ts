import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from '../../../shared/hooks/useCreatePanelStore'

const useStore = createPanelStore({
  providerRef: '',
  e164Number: '',
  ingressInfo: {
    webhook: '',
    appRef: '',
  },
})

export const useCreationEditingNumber = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
