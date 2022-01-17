import type { Provider } from '@fonoster/providers/dist/client/types'
import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { createPanelStore } from './createPanelStore'

const useStore = createPanelStore<Partial<Provider>>({
  name: '',
  username: '',
  secret: '',
  host: '',
  transport: '',
  expires: 3600,
})

export const useProviderPanel = () =>
  useStore(
    useCallback(s => s, []),
    shallow
  )
