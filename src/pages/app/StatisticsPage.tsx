import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { clsx } from 'clsx'

import { Tabs } from '@/components/navigation/Tabs/Tabs'
import { StatCard } from '@/components/ui/Card/StatCard'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Select } from '@/components/ui/FormFields/Select'

import { statisticsApi, type StatisticsParams, type StatisticsEvolutionPoint } from '@/features/statistics/api/statistics.api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import './StatisticsPage.css'

type TabId = 'overview' | 'evolution' | 'comparison' | 'xp' | 'profit' | 'places' | 'hunts'

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'evolution', label: 'Evolução' },
  { id: 'comparison', label: 'Comparação' },
  { id: 'xp', label: 'Análise XP' },
  { id: 'profit', label: 'Análise Profit' },
  { id: 'places', label: 'Locais' },
  { id: 'hunts', label: 'Hunts' },
]

const PERIODS: { value: StatisticsParams['period']; label: string }[] = [
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
  { value: '90d', label: '90 dias' },
  { value: 'all', label: 'Todo tempo' },
] as const

function formatNumber(n: string): string {
  return Number(n).toLocaleString()
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

function formatChange(value: string): string {
  const num = Number(value)
  return num >= 0 ? `+${num.toFixed(1)}%` : `${num.toFixed(1)}%`
}

export default function StatisticsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const period = (searchParams.get('period') as StatisticsParams['period'] | null) ?? '30d'

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as string
    setSearchParams({ period: value })
  }

  const handleTabChange = (id: string) => {
    setActiveTab(id as TabId)
  }

  // Queries
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['statistics', period],
    queryFn: () => statisticsApi.getStatistics({ period }),
  })

  const { data: xpEvolution, isLoading: xpLoading } = useQuery({
    queryKey: ['xpEvolution', period],
    queryFn: () => statisticsApi.getXpEvolution({ period }),
    enabled: activeTab === 'evolution',
  })

  const { data: profitEvolution, isLoading: profitLoading } = useQuery({
    queryKey: ['profitEvolution', period],
    queryFn: () => statisticsApi.getProfitEvolution({ period }),
    enabled: activeTab === 'evolution',
  })

  const { data: comparison, isLoading: compLoading } = useQuery({
    queryKey: ['comparison', period],
    queryFn: () => statisticsApi.getPeriodComparison({ period }),
    enabled: activeTab === 'comparison',
  })

  const { data: xpAnalysis, isLoading: xpAnalysisLoading } = useQuery({
    queryKey: ['xpAnalysis'],
    queryFn: statisticsApi.getXpAnalysis,
    enabled: activeTab === 'xp',
  })

  const { data: profitAnalysis, isLoading: profitAnalysisLoading } = useQuery({
    queryKey: ['profitAnalysis'],
    queryFn: statisticsApi.getProfitAnalysis,
    enabled: activeTab === 'profit',
  })

  const { data: placesPerformance, isLoading: placesLoading } = useQuery({
    queryKey: ['placesPerformance', period],
    queryFn: () => statisticsApi.getHuntingPlacePerformance({ period }),
    enabled: activeTab === 'places',
  })

  const { data: huntsComparison, isLoading: huntsLoading } = useQuery({
    queryKey: ['huntsComparison', period],
    queryFn: () => statisticsApi.getHuntComparison({ period }),
    enabled: activeTab === 'hunts',
  })

if (statsLoading) {
    return (
      <div className="statistics-page">
        <div className="statistics-page__header">
          <h1>{t('statistics.title')}</h1>
          <div className="statistics-page__period-selector">
            <Select
              label={t('statistics.period')}
              value={period}
              onChange={handlePeriodChange}
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="statistics-page__skeleton">
          {[...Array(4)].map((_, i) => <Skeleton key={i} width="100%" height={100} />)}
        </div>
      </div>
    )
  }

  if (statsError || !stats || !stats.has_enough_data) {
    return (
      <div className="statistics-page">
        <div className="statistics-page__header">
          <h1>{t('statistics.title')}</h1>
          <Select
            label={t('statistics.period')}
            value={period}
            onChange={handlePeriodChange}
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </Select>
        </div>
        <EmptyState
          title={t('statistics.noData')}
          description={t('statistics.notEnoughData')}
          image="/assets/images/empty-statistics.webp"
        />
      </div>
    )
  }

  return (
    <div className="statistics-page">
      <header className="statistics-page__header">
        <h1>{t('statistics.title')}</h1>
        <div className="statistics-page__header-actions">
          <Select
            label={t('statistics.period')}
            value={period}
            onChange={handlePeriodChange}
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </Select>
        </div>
      </header>

      <Tabs tabs={TABS} active={activeTab} onChange={handleTabChange} aria-label={t('statistics.title')} />

      <section className="statistics-page__content" aria-labelledby={activeTab}>
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="statistics-page__tab">
            <div className="statistics-page__kpis">
              <StatCard label={t('statistics.totalHunts')} value={stats.count.toString()} />
              <StatCard label={t('statistics.avgXpPerHour')} value={formatNumber(stats.avg_xp_per_hour)} />
              <StatCard label={t('statistics.avgProfitPerHour')} value={formatNumber(stats.avg_loot)} />
              <StatCard label={t('statistics.totalPlayTime')} value={formatDuration(Number(stats.avg_duration))} />
              <StatCard label={t('statistics.totalXp')} value={formatNumber(stats.total_xp)} />
              <StatCard label={t('statistics.totalProfit')} value={formatNumber(stats.total_loot)} />
            </div>

            <div className="statistics-page__period-info">
              <p>{t('statistics.periodLabel', { period: t(`statistics.${period}`) })}</p>
            </div>
          </div>
        )}

        {/* Evolution */}
        {activeTab === 'evolution' && (
          <div className="statistics-page__tab">
            <div className="statistics-page__evolution">
              <div className="statistics-page__chart">
                <h3>{t('statistics.xpPerHour')}</h3>
                {xpLoading ? (
                  <div className="statistics-page__chart-skeleton"><Skeleton width="100%" height={300} /></div>
                ) : xpEvolution && xpEvolution.length > 0 ? (
                  <EvolutionChart data={xpEvolution} color="var(--action-primary)" />
                ) : (
                  <EmptyState title={t('statistics.noData')} />
                )}
              </div>
              <div className="statistics-page__chart">
                <h3>{t('statistics.profitPerHour')}</h3>
                {profitLoading ? (
                  <div className="statistics-page__chart-skeleton"><Skeleton width="100%" height={300} /></div>
                ) : profitEvolution && profitEvolution.length > 0 ? (
                  <EvolutionChart data={profitEvolution} color="var(--status-success)" />
                ) : (
                  <EmptyState title={t('statistics.noData')} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Comparison */}
        {activeTab === 'comparison' && (
          <div className="statistics-page__tab">
            {compLoading ? (
              <div className="statistics-page__skeleton">
                <Skeleton width="100%" height={120} />
                <Skeleton width="100%" height={120} />
              </div>
            ) : comparison ? (
              <div className="statistics-page__comparison">
                <div className="statistics-page__comparison-cards">
                  <div className="statistics-page__comparison-card">
                    <h3>{t('statistics.xpPerHour')}</h3>
                    <div className="statistics-page__comparison-row">
                      <div>
                        <span className="label">{t('statistics.currentPeriod')}</span>
                        <span className="value">{formatNumber(comparison.current.avg_xp_per_hour)}</span>
                      </div>
                      <div>
                        <span className="label">{t('statistics.previousPeriod')}</span>
                        <span className="value">{formatNumber(comparison.previous.avg_xp_per_hour)}</span>
                      </div>
                    </div>
                    <div className={clsx('statistics-page__change', Number(comparison.xp_change_pct) >= 0 ? 'positive' : 'negative')}>
                      {formatChange(comparison.xp_change_pct)}
                    </div>
                  </div>
                  <div className="statistics-page__comparison-card">
                    <h3>{t('statistics.profitPerHour')}</h3>
                    <div className="statistics-page__comparison-row">
                      <div>
                        <span className="label">{t('statistics.currentPeriod')}</span>
                        <span className="value">{formatNumber(comparison.current.avg_balance)}</span>
                      </div>
                      <div>
                        <span className="label">{t('statistics.previousPeriod')}</span>
                        <span className="value">{formatNumber(comparison.previous.avg_balance)}</span>
                      </div>
                    </div>
                    <div className={clsx('statistics-page__change', Number(comparison.profit_change_pct) >= 0 ? 'positive' : 'negative')}>
                      {formatChange(comparison.profit_change_pct)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState title={t('statistics.noData')} />
            )}
          </div>
        )}

        {/* XP Analysis */}
        {activeTab === 'xp' && (
          <div className="statistics-page__tab">
            {xpAnalysisLoading ? (
              <Skeleton width="100%" height={200} />
            ) : xpAnalysis ? (
              <div className="statistics-page__analysis">
                <h3>{t('statistics.xpAnalysis')}</h3>
                <div className="statistics-page__analysis-grid">
                  <StatCard label={t('statistics.totalXp')} value={formatNumber(xpAnalysis.total_xp)} />
                  <StatCard label={t('statistics.avgXpPerHunt')} value={formatNumber(xpAnalysis.xp_per_hunt_avg)} />
                  <StatCard label={t('statistics.bestHuntXp')} value={formatNumber(xpAnalysis.best_hunt_xp)} />
                  <StatCard label={t('statistics.bestXpPerHour')} value={formatNumber(xpAnalysis.best_hunt_xp_per_hour)} />
                </div>
              </div>
            ) : (
              <EmptyState title={t('statistics.noData')} />
            )}
          </div>
        )}

        {/* Profit Analysis */}
        {activeTab === 'profit' && (
          <div className="statistics-page__tab">
            {profitAnalysisLoading ? (
              <Skeleton width="100%" height={200} />
            ) : profitAnalysis ? (
              <div className="statistics-page__analysis">
                <h3>{t('statistics.profitAnalysis')}</h3>
                <div className="statistics-page__analysis-grid">
                  <StatCard label={t('statistics.totalProfit')} value={formatNumber(profitAnalysis.total_profit)} />
                  <StatCard label={t('statistics.avgProfitPerHunt')} value={formatNumber(profitAnalysis.profit_per_hunt_avg)} />
                  <StatCard label={t('statistics.bestHuntProfit')} value={formatNumber(profitAnalysis.best_hunt_profit)} />
                  <StatCard label={t('statistics.bestProfitPerHour')} value={formatNumber(profitAnalysis.best_hunt_profit_per_hour)} />
                </div>
              </div>
            ) : (
              <EmptyState title={t('statistics.noData')} />
            )}
          </div>
        )}

        {/* Hunting Places Performance */}
        {activeTab === 'places' && (
          <div className="statistics-page__tab">
            {placesLoading ? (
              <Skeleton width="100%" height={200} />
            ) : placesPerformance && placesPerformance.length > 0 ? (
              <div className="statistics-page__places">
                <h3>{t('statistics.huntingPlaces')}</h3>
                <div className="statistics-page__places-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('statistics.huntingPlace')}</th>
                        <th>{t('statistics.huntCount')}</th>
                        <th>{t('statistics.avgXpPerHour')}</th>
                        <th>{t('statistics.avgProfitPerHour')}</th>
                        <th>{t('statistics.totalXp')}</th>
                        <th>{t('statistics.totalProfit')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placesPerformance.map((place) => (
                        <tr key={place.hunting_place_id}>
                          <td>{place.hunting_place_name}</td>
                          <td>{place.hunt_count}</td>
                          <td>{formatNumber(place.avg_xp_per_hour)}</td>
                          <td>{formatNumber(place.avg_profit_per_hour)}</td>
                          <td>{formatNumber(place.total_xp)}</td>
                          <td>{formatNumber(place.total_profit)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState title={t('statistics.noData')} />
            )}
          </div>
        )}

        {/* Hunts Comparison */}
        {activeTab === 'hunts' && (
          <div className="statistics-page__tab">
            {huntsLoading ? (
              <Skeleton width="100%" height={200} />
            ) : huntsComparison && huntsComparison.length > 0 ? (
              <div className="statistics-page__hunts-comparison">
                <h3>{t('statistics.huntComparison')}</h3>
                <div className="statistics-page__hunts-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('statistics.hunt')}</th>
                        <th>{t('statistics.huntingPlace')}</th>
                        <th>{t('statistics.date')}</th>
                        <th>{t('statistics.duration')}</th>
                        <th>{t('statistics.xpGain')}</th>
                        <th>{t('statistics.xpPerHour')}</th>
                        <th>{t('statistics.balance')}</th>
                        <th>{t('statistics.profitPerHour')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {huntsComparison.map((hunt) => (
                        <tr key={hunt.hunt_id}>
                          <td><Link to={`/hunts/${hunt.hunt_id}`}>{hunt.hunt_name ?? '—'}</Link></td>
                          <td>{hunt.hunting_place}</td>
                          <td>{new Date(hunt.date).toLocaleDateString()}</td>
                          <td>{formatDuration(hunt.duration_seconds)}</td>
                          <td>{formatNumber(hunt.xp)}</td>
                          <td>{formatNumber(hunt.xp_per_hour)}</td>
                          <td className={Number(hunt.balance) >= 0 ? 'positive' : 'negative'}>
                            {Number(hunt.balance) >= 0 ? '+' : ''}{formatNumber(hunt.balance)}
                          </td>
                          <td>{formatNumber(hunt.profit_per_hour)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState title={t('statistics.noData')} />
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function EvolutionChart({
  data,
  color = 'var(--action-primary)',
}: {
  data: StatisticsEvolutionPoint[]
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
        <XAxis dataKey="period" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
        <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={(v) => Number(v).toLocaleString()} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
          }}
        />
        <Line
          type="monotone"
          dataKey="xp_per_hour"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 2 }}
          name="XP/h"
        />
        <Line
          type="monotone"
          dataKey="profit_per_hour"
          stroke="var(--status-success)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 2 }}
          name="Profit/h"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}