import { Menu, Transition } from '@headlessui/react'
import { PlusSmIcon } from '@heroicons/react/outline'
import React, { useMemo } from 'react'
import { Fragment } from 'react'

import { classNames } from '@/helpers/classNames'
import { useNumberPanel } from '@/hooks/panels/useNumberPanel'
import { useProjectPanel } from '@/hooks/panels/useProjectPanel'
import { useProviderPanel } from '@/hooks/panels/useProviderPanel'

export const ResourceMenu = () => {
  const { open: openProjectPanel } = useProjectPanel()
  const { open: openProviderPanel } = useProviderPanel()
  const { open: openNumberPanel } = useNumberPanel()

  const nav = useMemo(
    () => [
      { name: 'New Project', onClick: () => openProjectPanel() },
      { name: 'New Provider', onClick: () => openProviderPanel() },
      { name: 'New Number', onClick: () => openNumberPanel() },
    ],
    [openProjectPanel, openNumberPanel, openProviderPanel]
  )

  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button className="flex bg-primary p-1 rounded-full items-center justify-center text-white focus:outline-none text-sm">
          <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {nav.map(({ name, onClick }) => (
            <Menu.Item key={name}>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-600' : '',
                    'w-full block px-4 py-2 text-sm text-gray-300 text-left'
                  )}
                  onClick={onClick}
                >
                  {name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
