import { useTranslation } from 'react-i18next'

import { Modal } from '@/components/overlays/Modal/Modal'
import { CharacterForm } from './CharacterForm'

interface EditCharacterModalProps {
  characterId: string | null
  onClose: () => void
}

/** Edição de personagem na própria página (modal), sem navegação. */
export function EditCharacterModal({ characterId, onClose }: EditCharacterModalProps) {
  const { t } = useTranslation()

  function handleSuccess() {
    // O formulário já invalida o cache e exibe o toast de sucesso.
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
