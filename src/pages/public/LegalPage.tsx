import { useTranslation } from 'react-i18next'

import './LegalPage.css'

interface LegalPageProps {
  kind: 'terms' | 'privacy'
}

/** Páginas legais públicas. Conteúdo jurídico será adicionado posteriormente. */
export default function LegalPage({ kind }: LegalPageProps) {
  const { t } = useTranslation()

  return (
    <div className="legal-page">
      <h1>{t(`legal.${kind}.title`)}</h1>
      <p className="legal-page__placeholder">{t('legal.placeholder')}</p>
    </div>
  )
}
