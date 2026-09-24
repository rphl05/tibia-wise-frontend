import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { charactersApi } from '@/features/characters/api/characters.api'
import { CharacterCard, CharacterCardSkeleton } from '@/features/characters/components/CharacterCard'
import { EditCharacterModal } from '@/features/characters/components/EditCharacterModal'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Button } from '@/components/ui/Button/Button'

import './CharactersListPage.css'

export default function CharactersListPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: characters, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: charactersApi.list,
  })

  if (isLoading) {
    return (
      <div className="characters-page">
        <div className="characters-page__header">
          <h1>{t('characters.title')}</h1>
        </div>
        <div className="characters-page__grid">
          {[...Array(4)].map((_, i) => <CharacterCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="characters-page">
        <div className="characters-page__header">
          <h1>{t('characters.title')}</h1>
        </div>
        <EmptyState
          title={t('errors.generic')}
          description={t('characters.errors.loadFailed')}
          actionLabel={t('actions.retry')}
          onAction={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="characters-page">
      <div className="characters-page__header">
        <h1>{t('characters.title')}</h1>
        <Link to="/characters/new" className="characters-page__add-btn">
          <Button>
            <span className="btn__icon" aria-hidden><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
            {t('characters.addButton')}
          </Button>
        </Link>
      </div>

      {characters && characters.length > 0 ? (
        <div className="characters-page__grid">
          {characters.map((c) => (
            <CharacterCard key={c.id} character={c} showActions onEdit={setEditingId} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('characters.empty')}
          description={t('characters.emptyDescription')}
          image="/assets/images/empty-characters.webp"
          actionLabel={t('characters.addButton')}
          onAction={() => navigate('/characters/new')}
        />
      )}
      <EditCharacterModal characterId={editingId} onClose={() => setEditingId(null)} />
    </div>
  )
}