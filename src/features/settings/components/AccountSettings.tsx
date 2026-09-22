import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  Alert,
  Button,
  Modal,
  Skeleton,
  useToast,
} from '@/components'
import { useAuth } from '@/features/auth/AuthProvider'
import { settingsApi } from '@/features/settings/api/settings.api'
import { getCountryName } from '@/features/settings/data/countries'
import type { SessionInfo } from '@/types/api'

export function AccountSettings() {
  const { t, i18n } = useTranslation()
  const toast = useToast()
  const { user, logout } = useAuth()
  const queryClient = useQueryClient()

  const [sessionToRevoke, setSessionToRevoke] = useState<SessionInfo | null>(null)
  const [confirmRevokeAll, setConfirmRevokeAll] = useState(false)

  const sessionsQuery = useQuery({
    queryKey: ['settings', 'sessions'],
    queryFn: settingsApi.listSessions,
  })

  const revokeMutation = useMutation({
    mutationFn: (id: string) => settingsApi.revokeSession(id),
    onSuccess: () => {
      toast.success(t('settings.account.revokeSessionSuccess'))
      void queryClient.invalidateQueries({ queryKey: ['settings', 'sessions'] })
    },
    onError: () => toast.error(t('settings.feedback.saveError')),
    onSettled: () => setSessionToRevoke(null),
  })

  const revokeAllMutation = useMutation({
    mutationFn: settingsApi.revokeAllSessions,
    onSuccess: () => void logout(),
    onError: () => toast.error(t('settings.feedback.saveError')),
    onSettled: () => setConfirmRevokeAll(false),
  })

  const activeSessions = (sessionsQuery.data ?? []).filter((s) => !s.revoked_at)

  function formatDateTime(value: string): string {
    return new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  }

  return (
    <section className="settings-page__section" aria-labelledby="settings-account-title">
      <h2 id="settings-account-title">{t('settings.account.title')}</h2>
      <p className="settings-page__section-description">
        {t('settings.account.description')}
      </p>

      <div className="settings-page__card">
        <h3>{t('settings.account.infoTitle')}</h3>
        <dl className="settings-page__info-list">
          <div className="settings-page__info-row">
            <dt>{t('settings.account.email')}</dt>
            <dd>
              {user?.email}
              <small className="settings-page__hint">
                {t('settings.account.emailHint')}
              </small>
            </dd>
          </div>
          <div className="settings-page__info-row">
            <dt>{t('settings.account.country')}</dt>
            <dd>{getCountryName(user?.country_code, i18n.language) || '—'}</dd>
          </div>
          <div className="settings-page__info-row">
            <dt>{t('settings.account.memberSince')}</dt>
            <dd>
              {user?.created_at
                ? new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' }).format(
                    new Date(user.created_at),
                  )
                : '—'}
            </dd>
          </div>
        </dl>
      </div>

      <div className="settings-page__card">
        <h3>{t('settings.account.securityTitle')}</h3>
        <Alert type="info" title={t('settings.account.changePasswordUnavailableTitle')}>
          {t('settings.account.changePasswordUnavailable')}
        </Alert>
      </div>

      <div className="settings-page__card">
        <h3>{t('settings.account.sessionsTitle')}</h3>
        <p className="settings-page__hint">{t('settings.account.sessionsDescription')}</p>

        {sessionsQuery.isLoading && (
          <div className="settings-page__sessions">
            <Skeleton height={64} />
            <Skeleton height={64} />
          </div>
        )}

        {sessionsQuery.isError && (
          <Alert type="error">{t('settings.account.sessionsError')}</Alert>
        )}

        {sessionsQuery.isSuccess && activeSessions.length === 0 && (
          <p className="settings-page__hint">{t('settings.account.sessionsEmpty')}</p>
        )}

        {activeSessions.length > 0 && (
          <ul className="settings-page__sessions">
            {activeSessions.map((session) => (
              <li key={session.id} className="settings-page__session">
                <div className="settings-page__session-info">
                  <strong>
                    {session.browser || session.user_agent || t('settings.account.unknownDevice')}
                  </strong>
                  <dl>
                    {session.operating_system && (
                      <div>
                        <dt>{t('settings.account.sessionOS')}</dt>
                        <dd>{session.operating_system}</dd>
                      </div>
                    )}
                    <div>
                      <dt>{t('settings.account.sessionLastActivity')}</dt>
                      <dd>{formatDateTime(session.last_activity_at)}</dd>
                    </div>
                    {session.approximate_location && (
                      <div>
                        <dt>{t('settings.account.sessionLocation')}</dt>
                        <dd>{session.approximate_location}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSessionToRevoke(session)}
                >
                  {t('settings.account.revokeSession')}
                </Button>
              </li>
            ))}
          </ul>
        )}

        {activeSessions.length > 0 && (
          <div className="settings-page__sessions-footer">
            <Button
              variant="danger"
              onClick={() => setConfirmRevokeAll(true)}
              disabled={revokeAllMutation.isPending}
            >
              {t('settings.account.revokeAll')}
            </Button>
            <small className="settings-page__hint">
              {t('settings.account.revokeAllHint')}
            </small>
          </div>
        )}
      </div>

      <div className="settings-page__card settings-page__card--danger">
        <h3>{t('settings.account.dangerTitle')}</h3>
        <Alert type="warning" title={t('settings.account.closeAccountUnavailableTitle')}>
          {t('settings.account.closeAccountUnavailable')}
        </Alert>
      </div>

      <Modal
        open={sessionToRevoke !== null}
        onClose={() => setSessionToRevoke(null)}
        title={t('settings.account.revokeSessionTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSessionToRevoke(null)}>
              {t('actions.cancel')}
            </Button>
            <Button
              variant="danger"
              loading={revokeMutation.isPending}
              onClick={() => sessionToRevoke && revokeMutation.mutate(sessionToRevoke.id)}
            >
              {t('settings.account.revokeSession')}
            </Button>
          </>
        }
      >
        <p>{t('settings.account.revokeSessionBody')}</p>
      </Modal>

      <Modal
        open={confirmRevokeAll}
        onClose={() => setConfirmRevokeAll(false)}
        title={t('settings.account.revokeAllTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmRevokeAll(false)}>
              {t('actions.cancel')}
            </Button>
            <Button
              variant="danger"
              loading={revokeAllMutation.isPending}
              onClick={() => revokeAllMutation.mutate()}
            >
              {t('settings.account.revokeAll')}
            </Button>
          </>
        }
      >
        <p>{t('settings.account.revokeAllBody')}</p>
      </Modal>
    </section>
  )
}
