import { useCallback } from 'react'

import type { AppPage } from '@/@types'
import { useModals } from '@/contexts/ModalsContext'
import { Checkbox, Input, Modal } from '@/ui'

export const CreateProjectModal: AppPage = () => {
  const { isOpenProjectModal, setOpenProjectModal } = useModals()

  const onClose = useCallback(
    () => setOpenProjectModal(false),
    [setOpenProjectModal]
  )

  return (
    <Modal
      close={onClose}
      isOpen={isOpenProjectModal}
      title="Create a Project to get started managing your resources"
      description="You will be able to create and manage your Providers, Numbers, SIP Agents, Domains, Functions, etc."
      saveButtonProps={{
        children: 'Create Project',
      }}
    >
      <Input
        className="mb-6"
        label="Your Project name"
        placeholder="Type a friendly name"
      />
      <Checkbox
        label="Enable experimental APIs"
        description="Access features that aren’t yet generally available."
        checked={true}
      />
    </Modal>
  )
}
