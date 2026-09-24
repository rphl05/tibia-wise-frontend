import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function useImportHuntSchema() {
  const { t } = useTranslation()

  return z.object({
    raw_content: z
      .string()
      .min(10, t('hunts.validation.contentMin', 'Conteúdo muito curto (mín. 10 caracteres)'))
      .max(20000, t('hunts.validation.contentMax', 'Conteúdo muito longo (máx. 20.000 caracteres)')),
    character_id: z.number().int().positive(t('hunts.validation.characterRequired', 'Selecione um personagem')),
    hunting_place_id: z.number().int().positive().optional(),
    name: z.string().max(120).optional(),
    notes: z.string().max(1000).optional(),
    is_fast_respawn: z.boolean().optional(),
    /** Checkbox "Tornar esta Hunt pública" — mapeado para visibility no submit. */
    is_public: z.boolean().optional(),
  })
}

export function useUpdateHuntSchema() {
  return z.object({
    name: z.string().max(120).optional(),
    visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
    notes: z.string().max(1000).optional(),
  })
}