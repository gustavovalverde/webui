import React, { createContext, useContext, useState } from 'react'

import { dispatcher } from '@/helpers/dispatcher'

const ModalsContext = createContext({
  isOpenProjectModal: false,
  setOpenProjectModal: dispatcher<boolean>(),
})

export const useModals = () => useContext(ModalsContext)

export const ModalsProvider: React.FC = props => {
  const [isOpenProjectModal, setOpenProjectModal] = useState(false)

  return (
    <ModalsContext.Provider
      value={{ isOpenProjectModal, setOpenProjectModal }}
      {...props}
    />
  )
}
