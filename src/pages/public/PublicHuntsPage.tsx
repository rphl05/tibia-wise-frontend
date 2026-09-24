import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { huntsApi } from '@/features/hunts/api/hunts.api'
import { HuntCard, HuntCardSkeleton } from '@/features/hunts/components/HuntCard'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState/ErrorState'
import { Button } from '@/components/ui/Button/Button'

import './PublicHuntsPage.css'

const PAGE_LIMIT = 12

export default function PublicHuntsPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['hunts', 'public', page],
    queryFn: () => huntsApi.list({ page, limit: PAGE_LIMIT }),
  })

  const hunts = data?.data ?? []
  const hasNext = hunts.length === PAGE_LIMIT

  return (
    <div className="public-hunts-page">
      <header className="public-hunts-page__header">
        <h1>{t('hunts.publicTitle')}</h1>
        <p>{t('hunts.publicDescription')}</p>
      </header>

      {isLoading && (
        <div className="public-hunts-page__grid">
          {[...Array(6)].map((_, i) => (
            <HuntCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <ErrorState
          title={t('errors.generic')}
          description={t('hunts.errors.loadFailed')}
          onRetry={() => void refetch()}
        />
      )}

      {!isLoading && !isError && hunts.length === 0 && (
        <EmptyState
          title={t('hunts.empty')}
          description={t('hunts.publicEmptyDescription')}
          image="/assets/images/empty-hunts.webp"
        />
      )}

      {hunts.length > 0 && (
        <>
          <div className="public-hunts-page__grid">
            {hunts.map((hunt) => (
              <HuntCard key={hunt.id} hunt={hunt} showActions={false} />
            ))}
          </div>

          <div className="public-hunts-page__pagination">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {t('pagination.previous')}
            </Button>
            <span className="public-hunts-page__page">
              {t('pagination.page', { page })}
            </span>
            <Button
              variant="secondary"
              disabled={!hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              {t('pagination.next')}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
