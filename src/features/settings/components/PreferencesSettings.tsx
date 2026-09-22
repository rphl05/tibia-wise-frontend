import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Button, Select, useToast } from '@/components'
import { useAuth } from '@/features/auth/AuthProvider'
import { useTheme, type ThemePreference } from '@/app/providers/ThemeProvider'
import { settingsApi } from '@/features/settings/api/settings.api'
import { getVerifiedCharacters } from '@/features/settings/utils/verifiedCharacters'
import { charactersApi } from '@/features/characters/api/characters.api'
import { ROUTES } from '@/config/routes'
import type { LanguagePreference } from '@/types/api'

const THEME_TO_API: Record<ThemePreference, 'DARK' | 'LIGHT' | 'SYSTEM'> = {
  dark: 'DARK',
  light: 'LIGHT',
  system: 'SYSTEM',
}

const LANG_TO_API: Record<string, LanguagePreference> = {
  'pt-BR': 'PT_BR',
  en: 'EN_US',
}

export function PreferencesSettings() {
  const { t, i18n } = useTranslation()
  const toast = useToast()
  const { user, refreshUser } = useAuth()
  const { preference, setPreference } = useTheme()
  const [saving, setSaving] = useState(false)

  const charactersQuery = useQuery({
    queryKey: ['characters'],
    queryFn: charactersApi.list,
  })
  const verifiedCharacters = getVerifiedCharacters(charactersQuery.data ?? [])

  async function handleThemeChange(value: ThemePreference) {
    setPreference(value)
    if (!user) return
    try {
      await settingsApi.updateMe({ default_theme: THEME_TO_API[value] })
      await refreshUser()
    } catch {
      toast.error(t('settings.feedback.saveError'))
    }
  }

  async function handleLanguageChange(lng: string) {
    await i18n.changeLanguage(lng)
    if (!user) return
    try {
      await settingsApi.updateMe({ default_language: LANG_TO_API[lng] ?? 'PT_BR' })
      await refreshUser()
    } catch {
      toast.error(t('settings.feedback.saveError'))
    }
  }

  async function handleDefaultCharacterChange(value: string) {
    if (!user || saving) return
    setSaving(true)
    try {
      await settingsApi.updateMe({
        default_character_id: value ? Number(value) : null,
      })
      await refreshUser()
      toast.success(t('settings.feedback.saved'))
    } catch {
      toast.error(t('settings.feedback.saveError'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="settings-page__section" aria-labelledby="settings-preferences-title">
      <h2 id="settings-preferences-title">{t('settings.preferences.title')}</h2>
      <p className="settings-page__section-description">
        {t('settings.preferences.description')}
      </p>

      <div className="settings-page__form-grid">
        <div className="settings-page__field">
          <Select
            label={t('settings.preferences.theme')}
            value={preference}
            hint={t('settings.preferences.themeHint')}
            onChange={(e) => void handleThemeChange(e.target.value as ThemePreference)}
          >
            <option value="dark">{t('theme.dark')}</option>
            <option value="light">{t('theme.light')}</option>
            <option value="system">{t('theme.system')}</option>
          </Select>
        </div>

        <div className="settings-page__field">
          <Select
            label={t('settings.preferences.language')}
            value={i18n.language}
            hint={t('settings.preferences.languageHint')}
            onChange={(e) => void handleLanguageChange(e.target.value)}
          >
            <option value="pt-BR">Português</option>
            <option value="en">English</option>
          </Select>
        </div>

        <div className="settings-page__field">
          {verifiedCharacters.length === 0 ? (
            <div className="settings-page__empty">
              <p>{t('settings.preferences.noDefaultCharacter')}</p>
              <Link to={ROUTES.characters}>
                <Button variant="secondary">
                  {t('settings.preferences.addCharacter')}
                </Button>
              </Link>
            </div>
          ) : (
            <Select
              label={t('settings.preferences.defaultCharacter')}
              value={user?.default_character_id ? String(user.default_character_id) : ''}
              hint={t('settings.preferences.defaultCharacterHint')}
              disabled={saving}
              onChange={(e) => void handleDefaultCharacterChange(e.target.value)}
            >
              <option value="">{t('settings.preferences.noCharacter')}</option>
              {verifiedCharacters.map((character) => (
                <option key={character.id} value={character.id}>
                  {character.name}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>
    </section>
  )
}
