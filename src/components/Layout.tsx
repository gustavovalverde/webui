import React from 'react'

import { CreateProjectModal } from './CreateProjectModal'

export const Layout: React.FC = ({ children }) => (
  <>
    {children}
    <CreateProjectModal />
  </>
)
