import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function useCreateCharacterSchema() {
  const { t } = useTranslation()

  return z.object({
    name: z
      .string()
      .min(1, t('characters.validation.nameRequired'))
      .max(100, t('characters.validation.nameMax'))
      .regex(/^[a-zA-Z0-9 ',-]+$/, t('characters.validation.namePattern')),
    is_private: z.boolean().optional(),
  })
}

export function useUpdateCharacterSchema() {
  const { t } = useTranslation()

  // Skills: inteiros, mínimo 10 (ou 0 para Magic Level). Mensagens amigáveis;
  // campo vazio é permitido (opcional) — nunca "Expected number, received NaN".
  const skillSchema = () =>
    z
      .number({ error: t('characters.validation.intInvalid') })
      .int(t('characters.validation.intInvalid'))
      .min(10, t('characters.validation.skillMin'))
      .max(200, t('characters.validation.skillMax'))
      .optional()

  return z.object({
    level: z
      .number({ error: t('characters.validation.intInvalid') })
      .int(t('characters.validation.intInvalid'))
      .min(1, t('characters.validation.levelMin'))
      .max(3000, t('characters.validation.levelMax'))
      .optional(),
    magic_level: z
      .number({ error: t('characters.validation.intInvalid') })
      .int(t('characters.validation.intInvalid'))
      .min(0, t('characters.validation.intMinZero'))
      .max(200, t('characters.validation.skillMax'))
      .optional(),
    fist_fighting: skillSchema(),
    club_fighting: skillSchema(),
    sword_fighting: skillSchema(),
    axe_fighting: skillSchema(),
    distance_fighting: skillSchema(),
    shielding: skillSchema(),
    fishing: skillSchema(),
    is_private: z.boolean().optional(),
  })
}
