import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { statisticsApi } from '@/features/statistics/api/statistics.api'
import { Tabs } from '@/components/navigation/Tabs/Tabs'
import { Select } from '@/components/ui/FormFields/Select'
import { Pagination } from '@/components/navigation/Pagination/Pagination'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Table } from '@/components/data-display/Table/Table'

import './RankingsPage.css'

type RankType = 'xpPerHour' | 'profitPerHour' | 'totalXp' | 'totalProfit'

const TABS: { id: RankType; label: string }[] = [
  { id: 'xpPerHour', label: 'XP/h' },
  { id: 'profitPerHour', label: 'Profit/h' },
  { id: 'totalXp', label: 'Total XP' },
  { id: 'totalProfit', label: 'Total Profit' },
]

const PERIODS = ['7d', '30d', '90d', 'all'] as const

const TAB_LABELS: Record<RankType, string> = {
  xpPerHour: 'XP/h',
  profitPerHour: 'Profit/h',
  totalXp: 'Total XP',
  totalProfit: 'Total Profit',
}

export default function RankingsPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<RankType>('xpPerHour')
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [vocation, setVocation] = useState<number | 'all'>('all')
  const [world, setWorld] = useState('all')
  const [page, setPage] = useState(1)

  const { data: ranking, isLoading, error } = useQuery({
    queryKey: ['ranking', activeTab, period, vocation, world, page],
    queryFn: () => statisticsApi.getRanking({
      type: activeTab,
      period,
      vocation: vocation === 'all' ? undefined : vocation,
      world: world === 'all' ? undefined : world,
      page,
      pageSize: 20,
    }),
  })

  if (isLoading) {
    return (
      <div className="rankings-page">
        <h1>{t('rankings.title', 'Rankings')}</h1>
        <div className="rankings-page__skeleton">
          <Skeleton width="100%" height={48} />
          <Skeleton width="100%" height={48} />
          {[...Array(5)].map((_, i) => <Skeleton key={i} width="100%" height={56} />)}
        </div>
      </div>
    )
  }

  if (error || !ranking || !ranking.items.length) {
    return (
      <div className="rankings-page">
        <h1>{t('rankings.title', 'Rankings')}</h1>
        <EmptyState
          title={t('rankings.noData', 'Sem dados')}
          description={t('rankings.noDataDesc', 'Nenhum dado de ranking disponível para os filtros selecionados.')}
        />
      </div>
    )
  }

  return (
    <div className="rankings-page">
      <header className="rankings-page__header">
        <h1>{t('rankings.title', 'Rankings')}</h1>
        <Tabs
          tabs={TABS}
          active={activeTab}
          onChange={(id) => setActiveTab(id as RankType)}
          aria-label={t('rankings.title')}
        />
      </header>

      <section className="rankings-page__filters">
        <Select
          label={t('rankings.period', 'Período')}
          value={period}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPeriod(e.target.value as '7d' | '30d' | '90d' | 'all')}
        >
          {PERIODS.map((p) => (
            <option key={p} value={p}>{t(`rankings.period.${p}`)}</option>
          ))}
        </Select>
        <Select
          label={t('rankings.vocation', 'Vocação')}
          value={vocation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const val = e.target.value
            setVocation(val === 'all' ? 'all' : parseInt(val, 10))
          }}
        >
          <option value="all">{t('rankings.all', 'Todas')}</option>
          <option value={1}>{t('vocations.knight', 'Knight')}</option>
          <option value={2}>{t('vocations.paladin', 'Paladin')}</option>
          <option value={3}>{t('vocations.sorcerer', 'Sorcerer')}</option>
          <option value={4}>{t('vocations.druid', 'Druid')}</option>
        </Select>
        <Select
          label={t('rankings.world', 'Mundo')}
          value={world}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWorld(e.target.value)}
        >
          <option value="all">{t('rankings.all', 'Todos')}</option>
          {/* Worlds would come from API */}
        </Select>
      </section>

      <section className="rankings-page__table">
        <Table>
          <thead>
            <tr>
              <th>{t('rankings.rank', '#')}</th>
              <th>{t('rankings.character', 'Personagem')}</th>
              <th>{t('rankings.vocation', 'Vocação')}</th>
              <th>{t('rankings.world', 'Mundo')}</th>
              <th>{t('rankings.level', 'Level')}</th>
              <th>{t(`rankings.${TAB_LABELS[activeTab]}`)}</th>
            </tr>
          </thead>
          <tbody>
            {ranking.items.map((entry, index) => (
              <tr key={entry.character_name}>
                <td>{(page - 1) * 20 + index + 1}</td>
                <td>{entry.character_name}</td>
                <td>{t(`vocations.${entry.vocation_id}`)}</td>
                <td>{entry.world}</td>
                <td>{entry.level}</td>
                <td>{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {ranking.totalPages > 1 && (
        <section className="rankings-page__pagination">
          <Pagination
            page={page}
            pageCount={ranking.totalPages}
            onPageChange={setPage}
          />
        </section>
      )}
    </div>
  )
}