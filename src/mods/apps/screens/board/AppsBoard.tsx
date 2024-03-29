import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback, useLayoutEffect, useState } from 'react'
import { dehydrate } from 'react-query'

import type { AppPage } from '@/@types'
import { DeleteResource } from '@/mods/shared/components/DeleteResource'
import { Notifier } from '@/mods/shared/components/Notification'
import { useTitle } from '@/mods/shared/hooks/useTitle'
import { getQueryClient } from '@/mods/shared/lib/queryClient'
import { Button, Spinner } from '@/ui'

import { useCreationEditingApp } from '../../components/creation-editing'
import { useApps } from '../../hooks/useApps'
import { useDeleteApp } from '../../hooks/useDeleteApp'
import { NoApps } from './NoApps'

export const AppsBoard: AppPage = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const { mutate, isLoading } = useDeleteApp()
  const [deleteRef, setDeleteRef] = useState('')
  const { setTitle } = useTitle()
  const { apps, isSuccess } = useApps()

  const { openEditing } = useCreationEditingApp()

  useLayoutEffect(() => {
    setTitle('Applications')
  }, [setTitle])

  const onOpen = useCallback((refId: string) => {
    setDeleteModalOpen(true)
    setDeleteRef(refId)
  }, [])

  const onDelete = useCallback(() => {
    mutate(deleteRef, {
      onSuccess() {
        setDeleteModalOpen(false)

        Notifier.success('Your App has been successfully deleted.')
      },
    })
  }, [mutate, deleteRef])

  if (isSuccess && !apps.length) return <NoApps />

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
              Project ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Welcome Intent ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white tracking-wider"
            >
              Voice
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app, idx) => (
            <tr
              key={app.ref}
              className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {app.ref}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {app.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {app?.intentsEngineConfig?.projectId || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {app?.intentsEngineConfig?.welcomeIntentId || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {app?.speechConfig?.voice || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  size="small"
                  type="secondary"
                  className="mr-4"
                  onClick={() => onOpen(app.ref)}
                >
                  Delete
                </Button>
                <Button size="small" onClick={() => openEditing(app as any)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteResource
        refId={deleteRef}
        title={`Delete App (${deleteRef})`}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const queryClient = getQueryClient()

  /**
   * @todo Find a way to hydrate queries on server without using fetch or axios
   * await queryClient.prefetchQuery('projects', getProjects)
   */

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

AppsBoard.isProtected = true

export default AppsBoard
