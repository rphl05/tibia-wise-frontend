import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Input, Select, useToast } from '@/components'
import { useAuth } from '@/features/auth/AuthProvider'
import { getCountries } from '@/features/settings/data/countries'
import { settingsApi } from '@/features/settings/api/settings.api'
import { ApiError } from '@/lib/api/errors'
import type { UpdateMeDto } from '@/types/api'

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{4,30}$/
const USERNAME_COOLDOWN_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

export function ProfileSettings() {
  const { t, i18n } = useTranslation()
  const toast = useToast()
  const { user, refreshUser } = useAuth()

  const [displayName, setDisplayName] = useState(user?.display_name ?? '')
  const [username, setUsername] = useState(user?.username ?? '')
  const [countryCode, setCountryCode] = useState(user?.country_code ?? '')

  const [saving, setSaving] = useState(false)
  const [usernameError, setUsernameError] = useState<string | null>(null)

  const countries = useMemo(() => getCountries(i18n.language), [i18n.language])

  const [now] = useState(() => Date.now())
  const usernameChangedAt = user?.username_changed_at

  const usernameCooldownDays = useMemo(() => {
    if (!usernameChangedAt) return 0
    const elapsed = now - new Date(usernameChangedAt).getTime()
    const remaining = USERNAME_COOLDOWN_DAYS - Math.floor(elapsed / DAY_MS)
    return remaining > 0 ? remaining : 0
  }, [usernameChangedAt, now])

  const usernameLocked = usernameCooldownDays > 0

  const dirty =
    displayName !== (user?.display_name ?? '') ||
    username !== (user?.username ?? '') ||
    countryCode !== (user?.country_code ?? '')

  function handleCancel() {
    setDisplayName(user?.display_name ?? '')
    setUsername(user?.username ?? '')
    setCountryCode(user?.country_code ?? '')
    setUsernameError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || saving) return

    const usernameChanged = username !== user.username
    if (usernameChanged && !USERNAME_REGEX.test(username)) {
      setUsernameError(t('settings.profile.usernameInvalid'))
      return
    }

    const dto: UpdateMeDto = {}
    if (displayName !== user.display_name) dto.display_name = displayName
    if (usernameChanged) dto.username = username
    if (countryCode !== (user.country_code ?? '')) dto.country_code = countryCode || null

    setSaving(true)
    setUsernameError(null)
    try {
      await settingsApi.updateMe(dto)
      await refreshUser()
      toast.success(t('settings.feedback.saved'))
    } catch (err) {
      if (err instanceof ApiError && err.code === 'USERNAME_ALREADY_IN_USE') {
        setUsernameError(t('settings.profile.usernameTaken'))
      } else {
        toast.error(t('settings.feedback.saveError'))
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="settings-page__section" aria-labelledby="settings-profile-title">
      <h2 id="settings-profile-title">{t('settings.profile.title')}</h2>
      <p className="settings-page__section-description">
        {t('settings.profile.description')}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="settings-page__form-grid">
          <div className="settings-page__field">
            <Input
              label={t('settings.profile.displayName')}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={80}
              hint={t('settings.profile.displayNameHint')}
              disabled={saving}
              autoComplete="name"
            />
          </div>
          <div className="settings-page__field">
            <Input
              label={t('settings.profile.username')}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setUsernameError(null)
              }}
              hint={
                usernameLocked
                  ? t('settings.profile.usernameCooldown', { days: usernameCooldownDays })
                  : t('settings.profile.usernameHint')
              }
              error={usernameError ?? undefined}
              disabled={saving || usernameLocked}
              autoComplete="username"
            />
          </div>
          <div className="settings-page__field">
            <Select
              label={t('settings.profile.country')}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={saving}
            >
              <option value="">{t('settings.profile.countryPlaceholder')}</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="settings-page__actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={!dirty || saving}
          >
            {t('actions.cancel')}
          </Button>
          <Button type="submit" variant="primary" loading={saving} disabled={!dirty || saving}>
            {t('settings.profile.save')}
          </Button>
        </div>
      </form>
    </section>
  )
}
