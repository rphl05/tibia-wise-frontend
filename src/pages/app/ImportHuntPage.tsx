import { useTranslation } from 'react-i18next'

import { ImportHuntModal } from '@/features/hunts/components/ImportHuntModal'
import { useNavigate } from 'react-router-dom'

/** Mantida para deep-links: abre o modal de importação e retorna a Minhas Hunts ao fechar. */
export default function ImportHuntPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="import-hunt-page">
      <h1 className="visually-hidden">{t('hunts.import.title')}</h1>
      <ImportHuntModal open onClose={() => navigate('/my-hunts')} />
    </div>
  )
}
