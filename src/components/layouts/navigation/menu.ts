import {
  CollectionIcon,
  KeyIcon,
  LogoutIcon,
  PhoneIcon,
  ShoppingBagIcon,
  VariableIcon,
} from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

import { currentProjectStorage } from '@/hooks/useCurrentProject'

export const menu = [
  {
    name: 'SIP Network',
    menu: [
      { name: 'Providers', href: '/network/providers' },
      { name: 'Numbers', href: '/network/numbers' },
      { name: 'Domains', href: '#' },
      { name: 'Agents', href: '#' },
    ],
    icon: PhoneIcon,
  },
  { name: 'Apps', href: '#', icon: CollectionIcon },
  { name: 'Functions', href: '#', icon: VariableIcon },
  { name: 'Secrets', href: '#', icon: KeyIcon },
  { name: 'Marketplace', href: '#', icon: ShoppingBagIcon },
  {
    name: 'Sign Out',
    href: '#',
    onClick: () => {
      currentProjectStorage.destroy()
      signOut()
    },
    icon: LogoutIcon,
  },
]
