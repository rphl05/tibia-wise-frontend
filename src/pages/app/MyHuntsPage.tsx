import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'

import { huntsApi } from '@/features/hunts/api/hunts.api'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Button } from '@/components/ui/Button/Button'
import { HuntCard, HuntCardSkeleton } from '@/features/hunts/components/HuntCard'


import './MyHuntsPage.css'

export default function MyHuntsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery({
    queryKey: ['myHunts'],
    queryFn: () => huntsApi.myHunts(),
  })

  if (isLoading) {
    return (
      <div className="my-hunts-page">
        <div className="my-hunts-page__header">
          <h1>{t('hunts.title')}</h1>
          <Link to="/hunts/import">
            <Button><Plus size={18} aria-hidden /> {t('hunts.import')}</Button>
          </Link>
        </div>
        <div className="my-hunts-page__grid">
          {[...Array(4)].map((_, i) => <HuntCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="my-hunts-page">
        <div className="my-hunts-page__header">
          <h1>{t('hunts.title')}</h1>
        </div>
        <EmptyState
          title={t('errors.generic')}
          description={t('hunts.errors.loadFailed')}
          actionLabel={t('actions.retry')}
          onAction={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="my-hunts-page">
      <div className="my-hunts-page__header">
        <h1>{t('hunts.title')}</h1>
        <Link to="/hunts/import">
          <Button><Plus size={18} aria-hidden /> {t('hunts.import')}</Button>
        </Link>
      </div>

      {data?.data && data.data.length > 0 ? (
        <div className="my-hunts-page__grid">
          {data.data.map((hunt) => (
            <HuntCard key={hunt.id} hunt={hunt} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('hunts.empty')}
          description={t('hunts.emptyDescription')}
          image="/assets/images/empty-hunts.webp"
          actionLabel={t('hunts.import')}
          onAction={() => navigate('/hunts/import')}
        />
      )}
    </div>
  )
}