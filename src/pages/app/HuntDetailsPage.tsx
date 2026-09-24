import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { huntsApi } from '@/features/hunts/api/hunts.api'
import type { HuntDetail } from '@/types/api'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { Badge } from '@/components/ui/Badge/Badge'

import './HuntDetailsPage.css'

export default function HuntDetailsPage() {
  const { t } = useTranslation()
  const { id } = useParams()

  const { data: hunt, isLoading, error } = useQuery<HuntDetail>({
    queryKey: ['hunt', id],
    queryFn: () => huntsApi.myHuntDetail(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="hunt-details-page">
        <div className="hunt-details-page__skeleton">
          <Skeleton width="100%" height={120} />
          <Skeleton width="100%" height={80} />
        </div>
      </div>
    )
  }

  if (error || !hunt) {
    return (
      <div className="hunt-details-page">
        <EmptyState
          title={t('errors.notFound.title')}
          description={t('hunts.notFound')}
          actionLabel={t('actions.back')}
          onAction={() => window.history.back()}
        />
      </div>
    )
  }

  const formatNumber = (n: string) => Number(n).toLocaleString()

  return (
    <div className="hunt-details-page">
      <header className="hunt-details-page__header">
        <h1>{hunt.name ?? t('hunts.unnamed')}</h1>
        <div className="hunt-details-page__meta">
          <Badge variant={hunt.visibility === 'PUBLIC' ? 'info' : 'default'}>
            {hunt.visibility === 'PUBLIC' ? 'Público' : 'Privado'}
          </Badge>
        </div>
      </header>

      <section className="hunt-details-page__stats">
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.duration')}</span>
          <span className="value">{formatDuration(hunt.duration_seconds)}</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.xpPerHour')}</span>
          <span className="value">{formatNumber(hunt.xp)}/h</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.profitPerHour')}</span>
          <span className="value">{formatNumber(hunt.balance)}/h</span>
        </div>
        <div className="hunt-details-page__stat">
          <span className="label">{t('hunts.balance')}</span>
          <span className="value">{formatNumber(hunt.balance)}</span>
        </div>
      </section>

      <section className="hunt-details-page__section">
        <h2>{t('hunts.loot')}</h2>
        {hunt.loot && hunt.loot.length > 0 ? (
          <dl className="hunt-details-page__loot">
            {hunt.loot.map((item: { id: string; item_name: string; quantity: number; value: number }) => (
              <div key={item.id} className="hunt-details-page__loot-item">
                <dt>{item.item_name}</dt>
                <dd>x{item.quantity} — {item.value.toLocaleString()} gp</dd>
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
            {hunt.expenses.map((item: { id: string; description: string; quantity: number; value: number }) => (
              <div key={item.id} className="hunt-details-page__expense-item">
                <dt>{item.description}</dt>
                <dd>x{item.quantity} — {item.value.toLocaleString()} gp</dd>
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
            {hunt.creatures.map((c: { id: string; creature_name: string; quantity: number }) => (
              <div key={c.id} className="hunt-details-page__creature-item">
                <dt>{c.creature_name}</dt>
                <dd>x{c.quantity}</dd>
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

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}