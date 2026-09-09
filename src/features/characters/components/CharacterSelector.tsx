import { Plus, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'

import { Dropdown, DropdownItem } from '@/components/overlays/Dropdown/Dropdown'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'

import type { Character } from '@/types/api'

import './CharacterSelector.css'

interface CharacterSelectorProps {
  /** Personagem atualmente ativo. */
  activeCharacter: Character | null
  /** Lista de personagens do usuário. */
  characters: Character[]
  /** Carregando lista. */
  loading?: boolean
  /** Callback ao trocar personagem. */
  onSelect: (character: Character) => void
  /** Label do trigger. */
  triggerLabel?: string
}

const VOCATION_MAP: Record<number, string> = {
  1: 'Sorcerer',
  2: 'Druid',
  3: 'Paladin',
  4: 'Knight',
  5: 'Monk',
}

export function CharacterSelector({
  activeCharacter,
  characters,
  loading,
  onSelect,
  triggerLabel = 'Personagem ativo',
}: CharacterSelectorProps) {
  const navigate = useNavigate()

  const renderCharacter = (c: Character) => (
    <span className="character-selector__item">
      <span className="character-selector__name">{c.name}</span>
      <span className="character-selector__meta">
        Level {c.level ?? '?'} · {VOCATION_MAP[c.vocation_id ?? 0] ?? '—'} · {c.world ?? '—'}
      </span>
    </span>
  )

  if (loading) {
    return (
      <div className="character-selector character-selector--loading">
        <div className="character-selector__trigger">
          <Skeleton width={200} height={20} />
          <Skeleton width={160} height={14} />
        </div>
      </div>
    )
  }

  return (
    <Dropdown
      trigger={({ onClick, 'aria-expanded': expanded, 'aria-haspopup': haspopup }) => (
        <button
          type="button"
          className="character-selector__trigger"
          onClick={onClick}
          aria-expanded={expanded}
          aria-haspopup={haspopup}
          aria-label={triggerLabel}
        >
          {activeCharacter ? (
            <>
              <span className="character-selector__name">{activeCharacter.name}</span>
              <span className="character-selector__meta">
                Level {activeCharacter.level ?? '?'} · {VOCATION_MAP[activeCharacter.vocation_id ?? 0] ?? '—'}
              </span>
            </>
          ) : (
            <span className="character-selector__placeholder">{triggerLabel}</span>
          )}
          <ChevronDown size={16} aria-hidden className={clsx('character-selector__chevron', activeCharacter && 'character-selector__chevron--active')} />
        </button>
      )}
    >
      {characters.length === 0 ? (
        <div className="character-selector__empty">
          <p>{loading ? 'Carregando...' : 'Nenhum personagem'}</p>
        </div>
      ) : (
        <>
          {characters.map((c) => (
            <DropdownItem
              key={c.id}
              onClick={() => onSelect(c)}
            >
              {renderCharacter(c)}
              {activeCharacter?.id === c.id && <span className="character-selector__check">✓</span>}
            </DropdownItem>
          ))}
          <DropdownItem
            onClick={() => navigate('/characters/new')}
          >
            <Plus size={16} aria-hidden /> Adicionar personagem
          </DropdownItem>
        </>
      )}
    </Dropdown>
  )
}