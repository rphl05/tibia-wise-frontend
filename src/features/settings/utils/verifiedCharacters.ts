import type { Character } from '@/types/api'

/**
 * O backend ainda NÃO expõe o status de verificação nas listagens de
 * personagens (`GET /me/characters` retorna apenas status ACTIVE/INACTIVE).
 * Este helper só considera verificado um personagem quando o backend
 * informar explicitamente a verificação — nunca inferimos que um
 * personagem está confirmado apenas porque existe no banco.
 * Quando o backend passar a expor `verified_at`/`verified`, o filtro
 * passa a funcionar automaticamente.
 */
export function isCharacterVerified(character: Character): boolean {
  const c = character as Character & {
    verified?: boolean
    verified_at?: string | null
  }
  return c.verified === true || typeof c.verified_at === 'string'
}

export function getVerifiedCharacters(characters: Character[]): Character[] {
  return characters.filter(isCharacterVerified)
}
