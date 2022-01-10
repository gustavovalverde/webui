import React from 'react'

import { CreateProjectPanel } from './CreateProjectPanel'
import { Notification } from './Notification'

export const Layout: React.FC = ({ children }) => (
  <>
    <Notification />
    {children}
    <CreateProjectPanel />
  </>
)
