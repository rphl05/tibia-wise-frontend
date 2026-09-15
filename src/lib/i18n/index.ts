import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import ptCommon from './locales/pt-BR/common.json'

export const SUPPORTED_LANGUAGES = ['pt-BR', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const LANGUAGE_STORAGE_KEY = 'tw-language'

const resources = {
  'pt-BR': { translation: ptCommon },
  en: { translation: enCommon },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // default idiom bra cache/localStorage or navigator
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n

/** Locale BCP-47 usado para Intl a partir do idioma ativo. */
export function currentLocale(): string {
  return i18n.language === 'en' ? 'en-US' : 'pt-BR'
}