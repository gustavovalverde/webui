import React from 'react'

import { ModalsProvider } from '@/contexts/ModalsContext'

import { CreateProjectModal } from './CreateProjectModal'

export const Layout: React.FC = ({ children }) => (
  <ModalsProvider>
    {children}
    <CreateProjectModal />
  </ModalsProvider>
)
