import type { Number } from '@fonoster/numbers/dist/client/types'
import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from '../../../shared/hooks/useCreatePanelStore'

const useStore = createPanelStore<Partial<Number>>({
  providerRef: '',
  e164Number: '',
  ingressInfo: {
    webhook: '',
  },
})

export const useCreationEditingNumber = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
