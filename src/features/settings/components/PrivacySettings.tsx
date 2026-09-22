import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { Button, Switch, useToast } from '@/components'
import { useAuth } from '@/features/auth/AuthProvider'
import { settingsApi } from '@/features/settings/api/settings.api'
import { getVerifiedCharacters } from '@/features/settings/utils/verifiedCharacters'
import { charactersApi } from '@/features/characters/api/characters.api'
import { ROUTES } from '@/config/routes'

export function PrivacySettings() {
  const { t } = useTranslation()
  const toast = useToast()
  const { user, refreshUser } = useAuth()
  const queryClient = useQueryClient()

  const [showProfile, setShowProfile] = useState(user?.show_profile ?? false)
  const [showStatistics, setShowStatistics] = useState(user?.show_statistics ?? false)
  const [saving, setSaving] = useState(false)

  const charactersQuery = useQuery({
    queryKey: ['characters'],
    queryFn: charactersApi.list,
  })
  const verifiedCharacters = getVerifiedCharacters(charactersQuery.data ?? [])

  async function persistPrivacy(patch: { show_profile?: boolean; show_statistics?: boolean }) {
    if (saving) return
    setSaving(true)
    try {
      await settingsApi.updateMe(patch)
      await refreshUser()
      toast.success(t('settings.feedback.saved'))
    } catch {
      // Reverte em caso de falha
      setShowProfile(user?.show_profile ?? false)
      setShowStatistics(user?.show_statistics ?? false)
      toast.error(t('settings.feedback.saveError'))
    } finally {
      setSaving(false)
    }
  }

  async function toggleCharacterPrivate(characterId: string, isPrivate: boolean) {
    try {
      await charactersApi.update(characterId, { is_private: isPrivate })
      await queryClient.invalidateQueries({ queryKey: ['characters'] })
      toast.success(t('settings.feedback.saved'))
    } catch {
      toast.error(t('settings.feedback.saveError'))
    }
  }

  return (
    <section className="settings-page__section" aria-labelledby="settings-privacy-title">
      <h2 id="settings-privacy-title">{t('settings.privacy.title')}</h2>
      <p className="settings-page__section-description">
        {t('settings.privacy.description')}
      </p>

      <div className="settings-page__card">
        <h3>{t('settings.privacy.profileSection')}</h3>
        <div className="settings-page__switch-row">
          <Switch
            label={t('settings.privacy.showProfile')}
            checked={showProfile}
            disabled={saving}
            onChange={(e) => {
              const value = e.target.checked
              setShowProfile(value)
              void persistPrivacy({ show_profile: value })
            }}
          />
          <small className="settings-page__hint">
            {t('settings.privacy.showProfileHint')}
          </small>
        </div>
        <div className="settings-page__switch-row">
          <Switch
            label={t('settings.privacy.showStatistics')}
            checked={showStatistics}
            disabled={saving}
            onChange={(e) => {
              const value = e.target.checked
              setShowStatistics(value)
              void persistPrivacy({ show_statistics: value })
            }}
          />
          <small className="settings-page__hint">
            {t('settings.privacy.showStatisticsHint')}
          </small>
        </div>
      </div>

      <div className="settings-page__card">
        <h3>{t('settings.privacy.charactersSection')}</h3>
        <p className="settings-page__hint">{t('settings.privacy.charactersHint')}</p>

        {verifiedCharacters.length === 0 ? (
          <div className="settings-page__empty">
            <p>{t('settings.privacy.noVerifiedCharacters')}</p>
            <Link to={ROUTES.characters}>
              <Button variant="secondary">
                {t('settings.privacy.viewMyCharacters')}
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="settings-page__character-list">
            {verifiedCharacters.map((character) => (
              <li key={character.id} className="settings-page__switch-row">
                <Switch
                  label={`${t('settings.privacy.characterPrivate')} — ${character.name}`}
                  checked={character.is_private}
                  onChange={(e) =>
                    void toggleCharacterPrivate(character.id, e.target.checked)
                  }
                />
                <small className="settings-page__hint">
                  {t('settings.privacy.characterPrivateHint')}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
