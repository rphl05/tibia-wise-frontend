import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function useCreateCharacterSchema() {
  const { t } = useTranslation()

  return z.object({
    name: z
      .string()
      .min(1, t('characters.validation.nameRequired', 'Informe o nome do personagem'))
      .max(100, t('characters.validation.nameMax', 'Máximo 100 caracteres'))
      .regex(/^[a-zA-Z0-9 ',-]+$/, t('characters.validation.namePattern', 'Apenas letras, números, espaço, \',\' ou \'-\'')),
    is_private: z.boolean().optional(),
  })
}

export function useUpdateCharacterSchema() {
  const { t } = useTranslation()

  return z.object({
    level: z
      .number()
      .int()
      .min(1, t('characters.validation.levelMin', 'Mínimo 1'))
      .max(3000, t('characters.validation.levelMax', 'Máximo 3000'))
      .optional(),
    magic_level: z.number().int().min(0).max(200).optional(),
    fist_fighting: z.number().int().min(10).max(200).optional(),
    club_fighting: z.number().int().min(10).max(200).optional(),
    sword_fighting: z.number().int().min(10).max(200).optional(),
    axe_fighting: z.number().int().min(10).max(200).optional(),
    distance_fighting: z.number().int().min(10).max(200).optional(),
    shielding: z.number().int().min(10).max(200).optional(),
    fishing: z.number().int().min(10).max(200).optional(),
    is_private: z.boolean().optional(),
  })
}