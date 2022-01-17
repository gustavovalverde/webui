import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

import { classNames } from '@/helpers/classNames'
import { useCurrentProject } from '@/mods/projects'

export const CurrentProject = () => {
  const { projects, project, setCurrentProject } = useCurrentProject()

  return (
    <Listbox value={project} onChange={setCurrentProject}>
      {({ open }) => (
        <>
          <div className="w-full lg:w-2/5 md:w-1/2 max-w-xs relative">
            <Listbox.Button className="bg-gray-600 relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
              <span className="block truncate text-gray-300">
                {project?.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {projects.map(item => (
                  <Listbox.Option
                    key={item.ref}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-primary' : 'text-white',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected || item.ref === project?.ref
                              ? 'font-semibold'
                              : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {item.name}
                        </span>

                        {selected || item.ref === project?.ref ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
