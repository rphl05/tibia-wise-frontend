import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'

import { Modal } from '@/components/overlays/Modal/Modal'
import { useToast } from '@/components/feedback/Toast/ToastProvider'
import { HuntImportForm } from './HuntImportForm'

interface ImportHuntModalProps {
  open: boolean
  onClose: () => void
}

/** Importação de Hunt na própria página (modal), sem navegação. */
export function ImportHuntModal({ open, onClose }: ImportHuntModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const queryClient = useQueryClient()

  function handleSuccess() {
    void queryClient.invalidateQueries({ queryKey: ['myHunts'] })
    toast.success(t('hunts.import.success'))
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('hunts.import.title')}
    >
      <HuntImportForm onSuccess={handleSuccess} />
    </Modal>
  )
}
