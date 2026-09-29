import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Share2 } from 'lucide-react'

import { huntsApi } from '@/features/hunts/api/hunts.api'
import type { HuntDetail } from '@/types/api'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { Badge } from '@/components/ui/Badge/Badge'
import { Button } from '@/components/ui/Button/Button'
import { useToast } from '@/components/feedback/Toast/ToastProvider'
import { ApiError } from '@/lib/api/errors'
import { formatDate, formatDuration, formatNumber, formatSignedNumber, profitToneClass } from '@/lib/format'
import { ROUTES } from '@/config/routes'

import './HuntDetailsPage.css'

export default function HuntDetailsPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [copying, setCopying] = useState(false)

  const { data: hunt, isLoading, error } = useQuery<HuntDetail>({
    queryKey: ['hunt', id],
    // Endpoint público: respeita visibilidade/ownership no backend.
    queryFn: () => huntsApi.get(id!),
    enabled: Boolean(id),
    retry: (failureCount, err) =>
      !(err instanceof ApiError && (err.isNotFound || err.isForbidden)) && failureCount < 2,
  })

  if (isLoading) {
    return (
      <div className="hunt-details-page">
        <div className="hunt-details-page__skeleton">
          <Skeleton width="100%" height={120} />
          <Skeleton width="100%" height={80} />
          <Skeleton width="100%" height={200} />
        </div>
      </div>
    )
  }

  if (error || !hunt) {
    const notFound = error instanceof ApiError && (error.isNotFound || error.isForbidden)
    return (
      <div className="hunt-details-page">
        <EmptyState
          title={notFound ? t('hunts.privateTitle') : t('errors.generic')}
          description={notFound ? t('hunts.privateDescription') : t('hunts.notFound')}
          actionLabel={t('hunts.publicTitle')}
          onAction={() => navigate(ROUTES.hunts)}
        />
      </div>
    )
  }

  async function handleShare(h: HuntDetail) {
    const url = `${window.location.origin}${ROUTES.hunts}/${h.public_id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success(t('hunts.linkCopied'))
    } catch {
      toast.error(t('errors.generic'))
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="hunt-details-page">
      <header className="hunt-details-page__header">
        <h1>{hunt.name ?? t('hunts.unnamed')}</h1>
        <div className="hunt-details-page__meta">
          <Badge variant={hunt.visibility === 'PUBLIC' ? 'info' : 'default'}>
            {hunt.visibility === 'PUBLIC' ? t('hunts.public') : t('hunts.private')}
          </Badge>
          {hunt.status !== 'ACTIVE' && (
            <Badge variant="warning">{hunt.status}</Badge>
          )}
          {hunt.visibility === 'PUBLIC' && (
            <Button
              variant="secondary"
              size="sm"
              icon={<Share2 size={16} aria-hidden />}
              loading={copying}
              onClick={() => {
                setCopying(true)
                void handleShare(hunt)
              }}
            >
              {t('hunts.share')}
            </Button>
          )}
        </div>
      </header>

      <section className="hunt-details-page__stats">
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.date')}</span>
          <span className="value">{formatDate(hunt.created_at)}</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.duration')}</span>
          <span className="value">{formatDuration(hunt.duration_seconds)}</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.xpGain')}</span>
          <span className="value">{formatNumber(hunt.xp)}</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.rawXp')}</span>
          <span className="value">{formatNumber(hunt.raw_xp)}</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.rawXpPerHour')}</span>
          <span className="value">{formatNumber(hunt.raw_xp_per_hour)}/h</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.loot')}</span>
          <span className="value">{formatNumber(hunt.loot_value)} gp</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.supplies')}</span>
          <span className="value">{formatNumber(hunt.supplies_value)} gp</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.profit')}</span>
          <span className={`value ${profitToneClass(hunt.balance)}`}>
            {formatSignedNumber(hunt.balance)} gp
          </span>
        </div>
      </section>

      <section className="hunt-details-page__section">
        <h2>{t('hunts.loot')}</h2>
        {hunt.loot && hunt.loot.length > 0 ? (
          <dl className="hunt-details-page__loot">
            {hunt.loot.map((item) => (
              <div key={item.id} className="hunt-details-page__loot-item">
                <dt>{item.item_name}</dt>
                <dd>
                  x{formatNumber(item.quantity)} — {formatNumber(item.value)} gp
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>{t('hunts.noLoot')}</p>
        )}
      </section>

      <section className="hunt-details-page__section">
        <h2>{t('hunts.supplies')}</h2>
        {hunt.expenses && hunt.expenses.length > 0 ? (
          <dl className="hunt-details-page__expenses">
            {hunt.expenses.map((item) => (
              <div key={item.id} className="hunt-details-page__expense-item">
                <dt>{item.description}</dt>
                <dd>
                  x{formatNumber(item.quantity)} — {formatNumber(item.value)} gp
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>{t('hunts.noSupplies')}</p>
        )}
      </section>

      <section className="hunt-details-page__section">
        <h2>{t('hunts.creatures')}</h2>
        {hunt.creatures && hunt.creatures.length > 0 ? (
          <dl className="hunt-details-page__creatures">
            {hunt.creatures.map((c) => (
              <div key={c.id} className="hunt-details-page__creature-item">
                <dt>{c.creature_name}</dt>
                <dd>x{formatNumber(c.quantity)}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>{t('hunts.noCreatures')}</p>
        )}
      </section>
    </div>
  )
}
