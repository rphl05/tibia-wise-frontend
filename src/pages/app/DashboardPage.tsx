import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { statisticsApi } from '@/features/statistics/api/statistics.api'
import { StatCard } from '@/components/ui/Card/StatCard'
import { HuntCard } from '@/features/hunts/components/HuntCard'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Card } from '@/components/ui/Card/Card'

import './DashboardPage.css'

export default function DashboardPage() {
  const { t } = useTranslation()

  const { data: dashboard, isLoading: dashboardLoading, error: dashboardError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: statisticsApi.getDashboard,
  })

  const { data: xpEvolution, isLoading: xpLoading } = useQuery({
    queryKey: ['xpEvolution'],
    queryFn: () => statisticsApi.getXpEvolution({ period: '30d' }),
  })

  if (dashboardLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page__skeleton">
          <div className="dashboard-page__kpis">
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
          </div>
          <Skeleton width="100%" height={300} className="dashboard-page__chart-skeleton" />
          <div className="dashboard-page__sections-skeleton">
            <Skeleton width="100%" height={200} />
            <Skeleton width="100%" height={200} />
            <Skeleton width="100%" height={200} />
          </div>
        </div>
      </div>
    )
  }

  if (dashboardError || !dashboard) {
    return (
      <div className="dashboard-page">
        <EmptyState
          title={t('statistics.error')}
          description={t('statistics.errorDesc')}
          actionLabel={t('actions.retry')}
          onAction={() => window.location.reload()}
        />
      </div>
    )
  }

  const formatNumber = (n: string) => Number(n).toLocaleString()
  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return h > 0 ? `${h}h ${m}min` : `${m}min`
  }

  return (
    <div className="dashboard-page">
      {/* KPIs */}
      <section className="dashboard-page__kpis" aria-label={t('statistics.overview')}>
        <StatCard
          label={t('statistics.totalHunts')}
          value={dashboard.total_hunts.toString()}
        />
        <StatCard
          label={t('statistics.avgXpPerHour')}
          value={formatNumber(dashboard.avg_xp_per_hour)}
          trend={t('statistics.change')}
        />
        <StatCard
          label={t('statistics.avgProfitPerHour')}
          value={formatNumber(dashboard.avg_profit_per_hour)}
        />
        <StatCard
          label={t('statistics.totalPlayTime')}
          value={formatDuration(Number(dashboard.total_play_time))}
        />
      </section>

      {/* XP/h Chart */}
      <section className="dashboard-page__chart" aria-label={t('statistics.evolution')}>
        <Card className="dashboard-page__chart-card">
          <h2 className="dashboard-page__chart-title">{t('statistics.xpPerHour')} (30d)</h2>
          {xpEvolution && xpEvolution.length > 0 && !xpLoading ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={xpEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
                  tickFormatter={(value) => Number(value).toLocaleString()}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="xp_per_hour"
                  stroke="var(--action-primary)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name={t('statistics.xpPerHour')}
                />
                <Line
                  type="monotone"
                  dataKey="profit_per_hour"
                  stroke="var(--status-success)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  name={t('statistics.profitPerHour')}
                  yAxisId="right"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="dashboard-page__chart-loading">
              <Skeleton width="100%" height={300} />
            </div>
          )}
        </Card>
      </section>

      {/* Last Hunt Summary + Latest Hunts + Recommendations */}
      <section className="dashboard-page__sections" aria-label={t('statistics.recentHunts')}>
        <div className="dashboard-page__section">
          <Card className="dashboard-page__last-hunt">
            <h3>{t('statistics.lastHunt')}</h3>
            {dashboard.recent_hunts && dashboard.recent_hunts.length > 0 ? (
              <HuntCard
                hunt={{
                  id: dashboard.recent_hunts[0].id,
                  public_id: dashboard.recent_hunts[0].id,
                  character_id: '',
                  hunting_place_id: '',
                  duration_seconds: dashboard.recent_hunts[0].duration_seconds,
                  xp: dashboard.recent_hunts[0].xp,
                  loot_value: '0',
                  balance: dashboard.recent_hunts[0].balance,
                  visibility: 'PRIVATE',
                  name: dashboard.recent_hunts[0].name,
                  created_at: dashboard.recent_hunts[0].created_at,
                }}
              />
            ) : (
              <p className="dashboard-page__empty">{t('statistics.noRecentHunts')}</p>
            )}
          </Card>
        </div>

        <div className="dashboard-page__section">
          <div className="dashboard-page__section-header">
            <h3>{t('statistics.recentHunts')}</h3>
          </div>
          <Card className="dashboard-page__recent-hunts">
            {dashboard.recent_hunts && dashboard.recent_hunts.length > 1 ? (
              <div className="dashboard-page__hunts-list">
                {dashboard.recent_hunts.slice(1, 5).map((hunt) => (
                  <HuntCard
                    key={hunt.id}
                    hunt={{
                      id: hunt.id,
                      public_id: hunt.id,
                      character_id: '',
                      hunting_place_id: '',
                      duration_seconds: hunt.duration_seconds,
                      xp: hunt.xp,
                      loot_value: '0',
                      balance: hunt.balance,
                      visibility: 'PRIVATE',
                      name: hunt.name,
                      created_at: hunt.created_at,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="dashboard-page__empty">{t('statistics.noRecentHunts')}</p>
            )}
          </Card>
        </div>

        <div className="dashboard-page__section">
          <div className="dashboard-page__section-header">
            <h3>{t('statistics.recommendations')}</h3>
          </div>
          <Card className="dashboard-page__recommendations">
            {dashboard.recommendations && dashboard.recommendations.length > 0 ? (
              <div className="dashboard-page__recommendations-list">
                {dashboard.recommendations.slice(0, 3).map((rec, idx) => (
                  <div key={idx} className="dashboard-page__recommendation-item">
                    <div className="dashboard-page__recommendation-info">
                      <h4>{rec.hunting_place_name}</h4>
                      <p className="dashboard-page__recommendation-reason">{rec.reason}</p>
                    </div>
                    <div className="dashboard-page__recommendation-metrics">
                      <span className="metric xp">
                        <strong>{formatNumber(rec.estimated_xp_per_hour)}</strong> XP/h
                      </span>
                      <span className="metric profit">
                        <strong>{formatNumber(rec.estimated_profit_per_hour)}</strong> Profit/h
                      </span>
                      <span className="metric compatibility">
                        {rec.compatibility_score}% match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="dashboard-page__empty">{t('statistics.noRecommendations')}</p>
            )}
          </Card>
        </div>
      </section>

      {/* Latest News */}
      <section className="dashboard-page__news" aria-label={t('statistics.latestNews')}>
        <Card className="dashboard-page__news-card">
          <div className="dashboard-page__news-header">
            <h3>{t('statistics.latestNews')}</h3>
          </div>
          {dashboard.latest_news && dashboard.latest_news.length > 0 ? (
            <div className="dashboard-page__news-list">
              {dashboard.latest_news.slice(0, 3).map((news) => (
                <div key={news.id} className="dashboard-page__news-item">
                  <h4>{news.title}</h4>
                  <p>{news.summary}</p>
                  <small>{new Date(news.created_at).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          ) : (
            <p className="dashboard-page__empty">{t('news.noNews')}</p>
          )}
        </Card>
      </section>
    </div>
  )
}