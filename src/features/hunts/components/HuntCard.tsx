import { Swords, ChevronRight, Trash2, Clock, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'


import { Dropdown, DropdownItem } from '@/components/overlays/Dropdown/Dropdown'
import { Badge } from '@/components/ui/Badge/Badge'
import { Card } from '@/components/ui/Card/Card'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { huntsApi } from '../api/hunts.api'

import './HuntCard.css'

interface HuntCardProps {
  /** Exibe o menu de ações (detalhes/excluir). Padrão: true. */
  showActions?: boolean
  hunt: {
    id: string
    public_id: string
    character_id: string
    hunting_place_id: string | null
    duration_seconds: number
    xp: string
    loot_value: string
    balance: string
    visibility: 'PUBLIC' | 'PRIVATE'
    name: string | null
    created_at: string
  }
}

export function HuntCard({ hunt, showActions = true }: HuntCardProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => huntsApi.delete(hunt.public_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myHunts'] }),
  })

  const handleDelete = async () => {
    if (!confirm(t('hunts.confirmDelete'))) return
    await deleteMutation.mutateAsync()
  }

  const formatNumber = (n: string) => Number(n).toLocaleString()
  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    return h > 0 ? `${h}h ${m}min` : `${m}min`
  }

  return (
    <Link to={`/hunts/${hunt.public_id}`} className="hunt-card-link">
      <Card className="hunt-card">
      <header className="hunt-card__header">
        <h3 className="hunt-card__name">{hunt.name ?? t('hunts.unnamed')}</h3>
        <div className="hunt-card__badges">
          <Badge variant={hunt.visibility === 'PUBLIC' ? 'info' : 'default'}>
            {t(`hunts.${hunt.visibility.toLowerCase()}`)}
          </Badge>
        </div>
      </header>

      <dl className="hunt-card__stats">
        <div className="hunt-card__stat">
          <Clock size={16} aria-hidden />
          <span>{formatDuration(hunt.duration_seconds)}</span>
        </div>
        <div className="hunt-card__stat">
          <Swords size={16} aria-hidden />
          <span>{formatNumber(hunt.xp)}/h</span>
        </div>
        <div className="hunt-card__stat profit">
          <Zap size={16} aria-hidden />
          <span className={Number(hunt.balance) >= 0 ? 'positive' : 'negative'}>
            {Number(hunt.balance) >= 0 ? '+' : ''}{formatNumber(hunt.balance)}
          </span>
        </div>
      </dl>

      {showActions && (
      <footer className="hunt-card__footer">
        <Dropdown
          trigger={({ onClick, 'aria-expanded': expanded, 'aria-haspopup': haspopup }) => (
            <button
              type="button"
              className="hunt-card__menu-btn"
              onClick={onClick}
              aria-expanded={expanded}
              aria-haspopup={haspopup}
              aria-label={t('hunts.actions')}
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          )}
        >
          <DropdownItem onClick={() => {}}>
            Ver detalhes
          </DropdownItem>
          <DropdownItem onClick={handleDelete} disabled={deleteMutation.isPending}>
            <Trash2 size={16} aria-hidden /> {t('actions.delete')}
          </DropdownItem>
        </Dropdown>
      </footer>
      )}
    </Card>
    </Link>
  )
}

export function HuntCardSkeleton() {
  return (
    <Card className="hunt-card">
      <header className="hunt-card__header">
        <Skeleton width={180} height={24} />
      </header>
      <dl className="hunt-card__stats">
        <div><Skeleton width={80} height={20} /></div>
        <div><Skeleton width={80} height={20} /></div>
        <div><Skeleton width={80} height={20} /></div>
      </dl>
      <footer className="hunt-card__footer">
        <Skeleton width={32} height={32} />
      </footer>
    </Card>
  )
}