import { MenuAlt2Icon } from '@heroicons/react/outline'
import React from 'react'

import { useMobileMenu } from '@/hooks/useMobileMenu'
import { useTitle } from '@/hooks/useTitle'
import { Title } from '@/ui'

import { CurrentProject } from '../../mods/projects'
import { ResourceMenu } from './navigation/ResourceMenu'

export const Header = () => {
  const { open } = useMobileMenu()
  const { title } = useTitle()

  return (
    <header className="w-full">
      <div className="relative z-1 flex-shrink-0 h-16 bg-gray-800 flex">
        <button
          type="button"
          className="px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
          onClick={open}
        >
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between px-6">
          <div className="flex-1 flex justify-center items-center">
            <Title level={3} className="w-full flex m-0 p-0 block truncate">
              {title}
            </Title>
          </div>
          <div className="flex flex-1 justify-end items-center space-x-4 sm:ml-6 sm:space-x-6 ml-2">
            <CurrentProject />
            <ResourceMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
