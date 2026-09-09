import { Shield, Eye, MoreVertical, Trash2, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dropdown, DropdownItem } from '@/components/overlays/Dropdown/Dropdown'
import { IconButton } from '@/components/ui/Button/IconButton'
import { Badge } from '@/components/ui/Badge/Badge'
import { Card } from '@/components/ui/Card/Card'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { charactersApi } from '../api/characters.api'

import './CharacterCard.css'

interface CharacterCardProps {
  character: {
    id: string
    name: string
    world?: string | null
    level?: number | null
    vocation_id?: number | null
    is_private: boolean
    status: string
  }
  /** Mostra ações de edição/validação (lista "Meus Personagens"). */
  showActions?: boolean
  /** Variante para lista pública (sem ações). */
  variant?: 'default' | 'public'
}

const VOCATION_MAP: Record<number, string> = {
  1: 'Sorcerer',
  2: 'Druid',
  3: 'Paladin',
  4: 'Knight',
  5: 'Monk',
}

function getVocationName(id: number | null | undefined): string {
  return id && VOCATION_MAP[id] ? VOCATION_MAP[id] : '—'
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'VALID':
      return <Badge variant="success">Validado</Badge>
    case 'PENDING':
      return <Badge variant="warning">Pendente</Badge>
    case 'INVALID':
      return <Badge variant="error">Inválido</Badge>
    default:
      return <Badge variant="default">{status}</Badge>
  }
}

export function CharacterCard({
  character,
  showActions = false,
  variant = 'default',
}: CharacterCardProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const refreshMutation = useMutation({
    mutationFn: () => charactersApi.refresh(character.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => charactersApi.delete(character.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })
    },
  })

  const handleDelete = useCallback(async () => {
    if (!confirm(t('characters.confirmDelete', 'Tem certeza que deseja excluir este personagem?'))) return
    await deleteMutation.mutateAsync()
  }, [deleteMutation, t])

  const handleRefresh = useCallback(async () => {
    await refreshMutation.mutateAsync()
  }, [refreshMutation])

  if (variant === 'public') {
    return (
      <Link to={`/characters/${character.id}`} className="character-card-link">
        <Card className="character-card character-card--public">
        <div className="character-card__header">
          <h3 className="character-card__name">{character.name}</h3>
          {character.is_private && <Badge variant="default">{t('characters.private')}</Badge>}
        </div>
        <dl className="character-card__details">
          <div>
            <dt>{t('characters.world')}</dt>
            <dd>{character.world ?? '—'}</dd>
          </div>
          <div>
            <dt>{t('characters.level')}</dt>
            <dd>{character.level ?? '—'}</dd>
          </div>
          <div>
            <dt>{t('characters.vocation')}</dt>
            <dd>{getVocationName(character.vocation_id)}</dd>
          </div>
        </dl>
      </Card>
      </Link>
    )
  }

  return (
    <Card className="character-card">
      <div className="character-card__header">
        <div className="character-card__main">
          <h3 className="character-card__name">{character.name}</h3>
          <div className="character-card__badges">
            {character.is_private && <Badge variant="default">{t('characters.private')}</Badge>}
            {getStatusBadge(character.status)}
          </div>
        </div>
        {showActions && (
          <Dropdown
            trigger={({ onClick, 'aria-expanded': expanded, 'aria-haspopup': haspopup }) => (
              <IconButton
                aria-label={t('characters.actions', 'Ações')}
                onClick={onClick}
                aria-expanded={expanded}
                aria-haspopup={haspopup}
              >
                <MoreVertical size={18} aria-hidden />
              </IconButton>
            )}
          >
            <DropdownItem onClick={() => navigate(`/characters/${character.id}`)}>
              <Eye size={16} aria-hidden /> {t('characters.view')}
            </DropdownItem>
            <DropdownItem onClick={() => navigate(`/characters/${character.id}/edit`)}>
              <Shield size={16} aria-hidden /> {t('characters.edit')}
            </DropdownItem>
            <DropdownItem onClick={handleRefresh} disabled={refreshMutation.isPending}>
              <Loader2 size={16} className={refreshMutation.isPending ? 'spinning' : ''} aria-hidden />
              {t('characters.refresh')}
            </DropdownItem>
            <DropdownItem danger onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 size={16} aria-hidden /> {t('actions.delete')}
            </DropdownItem>
          </Dropdown>
        )}
      </div>

      <dl className="character-card__details">
        <div>
          <dt>{t('characters.world')}</dt>
          <dd>{character.world ?? '—'}</dd>
        </div>
        <div>
          <dt>{t('characters.level')}</dt>
          <dd>{character.level ?? '—'}</dd>
        </div>
        <div>
          <dt>{t('characters.vocation')}</dt>
          <dd>{getVocationName(character.vocation_id)}</dd>
        </div>
      </dl>
    </Card>
  )
}

export function CharacterCardSkeleton() {
  return (
    <Card className="character-card">
      <div className="character-card__header">
        <div className="character-card__main">
          <Skeleton width={180} height={24} />
          <div className="character-card__badges">
            <Skeleton width={80} height={22} />
            <Skeleton width={80} height={22} />
          </div>
        </div>
        <Skeleton width={32} height={32} className="character-card__skeleton-action" />
      </div>
      <dl className="character-card__details">
        <div><Skeleton width={60} height={14} /><Skeleton width={100} height={18} /></div>
        <div><Skeleton width={60} height={14} /><Skeleton width={100} height={18} /></div>
        <div><Skeleton width={60} height={14} /><Skeleton width={100} height={18} /></div>
      </dl>
    </Card>
  )
}