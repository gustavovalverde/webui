import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import React from 'react'

import { classNames } from '@/mods/shared/helpers/classNames'

import { Logo } from '../Logo'
import { MobileMenu } from '.'
import { menu } from './menu'

export const Sidebar = () => {
  return (
    <>
      <div className="hidden w-28 dark:bg-gray-700 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            {menu.map(item =>
              item.menu ? (
                <Disclosure as="div" key={item.name} className="space-y-1">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          open ? 'bg-dark-600' : '',
                          'text-gray-300 hover:bg-dark-600 hover:text-white',
                          'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            'text-gray-300 group-hover:text-white',
                            'h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        <span className="mt-2">{item.name}</span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="space-y-1">
                        {item.menu.map(subItem => (
                          <Link key={subItem.name} href={subItem.href} passHref>
                            <a className="group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium text-gray-300 hover:bg-dark-600 hover:text-white">
                              {subItem.name}
                            </a>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : (
                <Link key={item.name} href={item.href as string}>
                  <a
                    key={item.name}
                    onClick={item.onClick}
                    className={classNames(
                      'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'cursor-pointer group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                    )}
                    target={item?.target ?? '_self'}
                  >
                    <item.icon
                      className={classNames(
                        'text-gray-300 group-hover:text-white',
                        'h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    <span className="mt-2">{item.name}</span>
                  </a>
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      <MobileMenu />
    </>
  )
}
