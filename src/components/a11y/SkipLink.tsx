import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import './SkipLink.css'

export function SkipLink() {
  const { t } = useTranslation()

  return (
    <Link
      to="#main-content"
      className="skip-link"
      onClick={(e) => {
        e.preventDefault()
        const target = document.getElementById('main-content')
        target?.focus()
        window.location.hash = 'main-content'
      }}
    >
      {t('a11y.skipLink', 'Pular para o conteúdo principal')}
    </Link>
  )
}

export default SkipLink