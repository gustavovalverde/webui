import React from 'react'

import { CreateProjectPanel } from './CreateProjectPanel'

export const Layout: React.FC = ({ children }) => (
  <>
    {children}
    <CreateProjectPanel />
  </>
)
