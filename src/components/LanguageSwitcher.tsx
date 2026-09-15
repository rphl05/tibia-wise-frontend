import { useTranslation } from 'react-i18next'

import './LanguageSwitcher.css'

const LANGS = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
] as const

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language

  return (
    <div className="lang-switcher" role="group" aria-label="Selecionar idioma">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={`lang-switcher__btn${current === lang.code ? ' lang-switcher__btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-label={lang.label}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}