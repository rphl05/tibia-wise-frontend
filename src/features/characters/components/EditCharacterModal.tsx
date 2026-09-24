import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'

import { Modal } from '@/components/overlays/Modal/Modal'
import { useToast } from '@/components/feedback/Toast/ToastProvider'
import { CharacterForm } from './CharacterForm'

interface EditCharacterModalProps {
  characterId: string | null
  onClose: () => void
}

/** Edição de personagem na própria página (modal), sem navegação. */
export function EditCharacterModal({ characterId, onClose }: EditCharacterModalProps) {
  const { t } = useTranslation()
  const toast = useToast()
  const queryClient = useQueryClient()

  function handleSuccess() {
    void queryClient.invalidateQueries({ queryKey: ['characters'] })
    toast.success(t('settings.feedback.saved'))
    onClose()
  }

  return (
    <Modal
      open={characterId !== null}
      onClose={onClose}
      title={t('characters.editTitle')}
    >
      {characterId && <CharacterForm characterId={characterId} onSuccess={handleSuccess} />}
    </Modal>
  )
}
