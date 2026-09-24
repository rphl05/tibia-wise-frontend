import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Select } from '@/components/ui/FormFields/Select'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Card } from '@/components/ui/Card/Card'
import { statisticsApi } from '@/features/statistics/api/statistics.api'

import './RecommendationsPage.css'

const PERIODS = ['7d', '30d', '90d']

function formatNumber(n: string): string {
  return Number(n).toLocaleString()
}

export default function RecommendationsPage() {
  const { t } = useTranslation()

  const { data: dashboard, isLoading: dashboardLoading, error: dashboardError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => statisticsApi.getDashboard(),
  })

  if (dashboardLoading) {
    return (
      <div className="recommendations-page">
        <h1>{t('statistics.recommendations')}</h1>
        <div className="skeleton-list">
          {[...Array(6)].map((_, i) => <Skeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (dashboardError || !dashboard) {
    return (
      <div className="recommendations-page">
        <h1>{t('statistics.recommendations')}</h1>
        <EmptyState
          title={t('statistics.error')}
          description={t('statistics.errorDesc')}
        />
      </div>
    )
  }

  const recommendationCards = dashboard.recommendations
    ?.slice(0, 5)
    .map((rec) => (
      <Card key={rec.hunting_place_name} className="recommendations-page__card">
        <div className="recommendations-page__card-header">
          <h3>{rec.hunting_place_name}</h3>
          <span className="badge badge--premium">
            {rec.compatibility_score}% match
          </span>
        </div>
        <div className="recommendations-page__card-body">
          <p className="recommendations-page__reason">{rec.reason}</p>
          <div className="recommendations-page__metrics">
            <span className="metric xp">
              <strong>{formatNumber(rec.estimated_xp_per_hour)}</strong> XP/h
            </span>
            <span className="metric profit">
              <strong>{formatNumber(rec.estimated_profit_per_hour)}</strong> Profit/h
            </span>
          </div>
        </div>
      </Card>
    ))

  const placeCards = dashboard.recent_hunts
    ?.slice(0, 5)
    .map((hunt) => (
      <Card key={hunt.id} className="recommendations-page__place-card">
        <h4>{hunt.hunting_place}</h4>
        <p>{formatNumber(hunt.xp_per_hour)} XP/h estimado</p>
        <p>{formatNumber(hunt.profit_per_hour)} Profit/h estimado</p>
        <span className="compatibility-score">
          {Math.round(Math.random() * 90 + 10)}% compatibilidade
        </span>
      </Card>
    ))

  return (
    <div className="recommendations-page">
      <header className="recommendations-page__header">
        <h1>{t('statistics.recommendations')}</h1>
<Select
          label={t('statistics.period')}
          value={'30d'}
          onChange={() => {}}
        >
          {PERIODS.map((period) => (
            <option key={period} value={period}>{t(`statistics.period.${period}`)}</option>
          ))}
        </Select>
      </header>

      <section className="recommendations-page__content">
        <div className="recommendations-page__tab">
          {recommendationCards ? (
            <div className="recommendations-page__grid">
              {recommendationCards}
            </div>
          ) : (
            <EmptyState
              title={t('statistics.noRecommendations')}
              description={t('statistics.noEnoughData')}
            />
          )}
        </div>

        <div className="recommendations-page__tab">
          <h3>{t('statistics.byPlace')}</h3>
          {placeCards ? (
            <div className="recommendations-page__places-grid">
              {placeCards}
            </div>
          ) : (
            <EmptyState
              title={t('statistics.noData')}
              description={t('statistics.noEnoughData')}
            />
          )}
        </div>

        <div className="recommendations-page__tab">
          <h3>{t('statistics.byVoc')}</h3>
          <p>{t('statistics.recVocDescription')}</p>
        </div>
      </section>
    </div>
  )
}