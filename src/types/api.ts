/**
 * Tipos de domínio consumidos pela UI.
 * ATENÇÃO: estes tipos refletem os DTOs públicos da API (api/v1).
 * Não representam modelos internos do backend nem devem inventar campos.
 */

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN'
export type ThemePreference = 'DARK' | 'LIGHT' | 'SYSTEM'
export type LanguagePreference = 'PT_BR' | 'EN_US'
export type HuntVisibility = 'PUBLIC' | 'PRIVATE'

export interface Me {
  id: string
  email: string
  username: string
  display_name: string
  country_code: string | null
  birth_date: string | null
  role: UserRole
  status: string
  show_profile: boolean
  show_statistics: boolean
  default_character_id: string | null
  default_language: LanguagePreference
  default_theme: ThemePreference
  created_at: string
  updated_at: string
  username_changed_at: string | null
}

export interface Character {
  id: string
  name: string
  slug: string
  world: string | null
  level: number | null
  magic_level: number | null
  vocation_id: number | null
  is_private: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface CharacterDetail extends Character {
  fist_fighting: number | null
  club_fighting: number | null
  sword_fighting: number | null
  axe_fighting: number | null
  distance_fighting: number | null
  shielding: number | null
  fishing: number | null
}

export interface HuntSummary {
  id: string
  public_id: string
  character_id: string
  hunting_place_id: string | null
  duration_seconds: number
  xp: string
  loot_value: string
  balance: string
  visibility: HuntVisibility
  name: string | null
  created_at: string
}

export interface HuntDetail extends HuntSummary {
  imported_by_user_id: string
  supplies_value: string
  status: string
  notes: string | null
  loot: Array<{
    id: string
    item_id: string
    item_name: string
    quantity: number
    value: number
  }>
  expenses: Array<{
    id: string
    item_id: string | null
    description: string
    quantity: number
    value: number
  }>
  creatures: Array<{
    id: string
    creature_id: string
    creature_name: string
    quantity: number
  }>
}

export interface Paginated<T> {
  data: T[]
  page: number
  limit: number
}
