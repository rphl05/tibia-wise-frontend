import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Crown, Shield, Sword, Target, Wand, Leaf, Fish } from 'lucide-react'

import { charactersApi, type CharacterDetail } from '@/features/characters/api/characters.api'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { Badge } from '@/components/ui/Badge/Badge'

import './CharacterDetailsPage.css'

const VOCATION_ICONS: Record<number, typeof Crown> = {
  1: Wand,
  2: Leaf,
  3: Target,
  4: Sword,
  5: Crown,
}

const VOCATION_NAMES: Record<number, string> = {
  1: 'Sorcerer',
  2: 'Druid',
  3: 'Paladin',
  4: 'Knight',
  5: 'Monk',
}

export default function CharacterDetailsPage() {
  const { t } = useTranslation()
  const { id } = useParams()

  const { data: character, isLoading, error } = useQuery<CharacterDetail>({
    queryKey: ['characters', id],
    queryFn: () => charactersApi.get(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="character-details-page">
        <div className="character-details-page__skeleton">
          <Skeleton width="100%" height={120} className="character-details-page__header-skeleton" />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </div>
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="character-details-page">
        <EmptyState
          title={t('errors.notFound.title')}
          description={t('characters.notFound')}
          actionLabel={t('actions.back')}
          onAction={() => window.history.back()}
        />
      </div>
    )
  }

  const VocationIcon = VOCATION_ICONS[character.vocation_id ?? 0] || Crown

  return (
    <div className="character-details-page">
      <header className="character-details-page__header">
        <div className="character-details-page__avatar">
          <VocationIcon size={48} aria-hidden />
        </div>
        <div className="character-details-page__info">
          <h1>{character.name}</h1>
          <div className="character-details-page__meta">
            <span>
              <Crown size={16} aria-hidden /> Level {character.level ?? '—'}
            </span>
            <span>
              <Shield size={16} aria-hidden /> {VOCATION_NAMES[character.vocation_id ?? 0] ?? '—'}
            </span>
            <span>
              <Sword size={16} aria-hidden /> {character.world ?? '—'}
            </span>
          </div>
        </div>
        <div className="character-details-page__badges">
          {character.is_private && <Badge variant="default">{t('characters.private')}</Badge>}
          <Badge variant={character.status === 'VALID' ? 'success' : character.status === 'PENDING' ? 'warning' : 'error'}>
            {character.status}
          </Badge>
        </div>
      </header>

      <section className="character-details-page__section">
        <h2>{t('characters.skills')}</h2>
        <dl className="character-details-page__skills">
<SkillRow label={t('characters.skillsLabels.fist')} value={character.fist_fighting} icon={<Shield size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.club')} value={character.club_fighting} icon={<Shield size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.sword')} value={character.sword_fighting} icon={<Sword size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.axe')} value={character.axe_fighting} icon={<Shield size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.distance')} value={character.distance_fighting} icon={<Target size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.shielding')} value={character.shielding} icon={<Shield size={16} aria-hidden />} />
        <SkillRow label={t('characters.skillsLabels.fishing')} value={character.fishing} icon={<Fish size={16} aria-hidden />} />
        <SkillRow label={t('characters.magicLevel')} value={character.magic_level} icon={<Wand size={16} aria-hidden />} />
      </dl>
      </section>

      <footer className="character-details-page__actions">
        <Link to={`/characters/${character.id}/edit`} className="btn-link">
          Editar
        </Link>
      </footer>
    </div>
  )
}

function SkillRow({ label, value, icon }: { label: string; value: number | null | undefined; icon: React.ReactNode }) {
  return (
    <div className="character-details-page__skill">
      <dt>
        {icon}
        {label}
      </dt>
      <dd>{value ?? '—'}</dd>
    </div>
  )
}