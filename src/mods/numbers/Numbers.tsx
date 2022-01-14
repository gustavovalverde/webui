import { useCallback, useLayoutEffect, useState } from 'react'

import type { AppPage } from '@/@types'
import { DeleteResource } from '@/components/DeleteResource'
import { NoNumbers } from '@/components/empty-states/NoNumbers'
import { Notifier } from '@/components/Notification'
import { useDeleteNumber, useNumbers } from '@/hooks/sdk/useNumbers'
import { useTitle } from '@/hooks/useTitle'
import { Button, Spinner } from '@/ui'

export const Numbers: AppPage = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { mutate, isLoading } = useDeleteNumber()
  const [deleteRef, setDeleteRef] = useState('')
  const { setTitle } = useTitle()
  const { numbers, isSuccess } = useNumbers()

  useLayoutEffect(() => {
    setTitle('SIP Network / Numbers')
  }, [setTitle])

  const onOpen = useCallback((refId: string) => {
    setDeleteModalOpen(true)
    setDeleteRef(refId)
  }, [])

  const onDelete = useCallback(() => {
    mutate(deleteRef, {
      onSuccess() {
        setDeleteModalOpen(false)

        Notifier.success('Your Project has been successfully deleted.')
      },
    })
  }, [mutate, deleteRef])

  if (isSuccess && !numbers.length) return <NoNumbers />

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
              Provider Ref
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              E164 Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Webhook
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {numbers.map((num, idx) => (
            <tr
              key={num.ref}
              className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {num.ref}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {num.providerRef}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {num.e164Number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {num.ingressInfo?.webhook}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  size="small"
                  type="secondary"
                  className="mr-4"
                  onClick={() => onOpen(num.ref)}
                >
                  Delete
                </Button>
                <Button size="small" disabled>
                  Edit - (Available soon)
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteResource
        refId={deleteRef}
        title={`Delete Number (${deleteRef})`}
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

Numbers.isProtected = true
