import {
  ClipboardListIcon,
  CollectionIcon,
  KeyIcon,
  LogoutIcon,
  PhoneIcon,
  ShoppingBagIcon,
  // VariableIcon,
} from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'

import { currentProjectStorage } from '@/mods/projects/components/current-project'

export const menu = [
  { name: 'Apps', href: '/apps', icon: CollectionIcon },
  {
    name: 'SIP Network',
    menu: [
      { name: 'Providers', href: '/network/providers' },
      { name: 'Numbers', href: '/network/numbers' },
      { name: 'Domains', href: '/network/domains' },
      { name: 'Agents', href: '/network/agents' },
    ],
    icon: PhoneIcon,
  },
  // { name: 'Functions', href: '#', icon: VariableIcon },
  { name: 'Secrets', href: '/secrets', icon: KeyIcon },
  {
    name: 'Monitoring',
    menu: [
      { name: 'SIP Logs', href: '/monitor/sip' },
      { name: 'Call Logs', href: '/monitor/call' },
      { name: 'App Logs', href: '/monitor/app' },
    ],
    icon: ClipboardListIcon,
  },
  {
    name: 'Marketplace',
    href: 'https://marketplace.fonoster.com',
    icon: ShoppingBagIcon,
    target: '_blank',
  },
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
