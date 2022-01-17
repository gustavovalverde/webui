import { useCallback, useLayoutEffect, useState } from 'react'

import type { AppPage } from '@/@types'
import { DeleteResource } from '@/components/DeleteResource'
import { Notifier } from '@/components/Notification'
import { useProviderPanel } from '@/hooks/panels/useProviderPanel'
import { useDeleteProvider, useProviders } from '@/hooks/sdk/useProviders'
import { useTitle } from '@/hooks/useTitle'
import { Button, Spinner } from '@/ui'

import { NoProviders } from './NoProviders'

export const Providers: AppPage = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { mutate, isLoading } = useDeleteProvider()
  const [deleteRef, setDeleteRef] = useState('')
  const { setTitle } = useTitle()
  const { providers, isSuccess } = useProviders()

  const { openEditing } = useProviderPanel()

  useLayoutEffect(() => {
    setTitle('SIP Network / VoIP Providers')
  }, [setTitle])

  const onOpen = useCallback((refId: string) => {
    setDeleteModalOpen(true)
    setDeleteRef(refId)
  }, [])

  const onDelete = useCallback(() => {
    mutate(deleteRef, {
      onSuccess() {
        setDeleteModalOpen(false)

        Notifier.success('Your Provider has been successfully deleted.')
      },
    })
  }, [mutate, deleteRef])

  if (isSuccess && !providers.length) return <NoProviders />

  return isSuccess ? (
    <>
      <table className="table-auto border-collapse border border-gray-500 divide-y divide-gray-400 rounded">
        <thead className="bg-gray-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Ref
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Hostname
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Transport
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, idx) => (
            <tr
              key={provider.ref}
              className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {provider.ref}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {provider.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {provider.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {provider.host}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {provider.transport}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  size="small"
                  type="secondary"
                  className="mr-4"
                  onClick={() => onOpen(provider.ref)}
                >
                  Delete
                </Button>
                <Button size="small" onClick={() => openEditing(provider)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteResource
        refId={deleteRef}
        title={`Delete Provider (${deleteRef})`}
        isOpen={isDeleteModalOpen}
        isLoading={isLoading}
        onDelete={onDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  ) : (
    <Spinner />
  )
}

Providers.isProtected = true
