import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Checkbox } from '@/components/ui/FormFields/Checkbox'
import { Alert } from '@/components/feedback/Alert/Alert'
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton'
import { charactersApi, type CreateCharacterDto, type UpdateCharacterDto } from '../api/characters.api'
import { useCreateCharacterSchema, useUpdateCharacterSchema } from '../schemas/characterSchemas'
import { useIsPremium } from '@/features/subscriptions/api/subscriptions.api'

import './CharacterForm.css'

interface CharacterFormProps {
  /** ID do personagem para edição; omitir para criação. */
  characterId?: string
  /** Redirecionar após sucesso. */
  redirectTo?: string
  /** Callback após salvar; substitui o redirect quando informado. */
  onSuccess?: () => void
}

export function CharacterForm({ characterId, redirectTo = '/characters', onSuccess }: CharacterFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = Boolean(characterId ?? params.id)
  const id = characterId ?? params.id

  const createSchema = useCreateCharacterSchema()
  const updateSchema = useUpdateCharacterSchema()
  const schema = isEdit ? updateSchema : createSchema
  const defaultValues = isEdit ? {} : { is_private: false }
  const isPremium = useIsPremium()
  const [loadedLevel, setLoadedLevel] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<any>({ resolver: zodResolver(schema), defaultValues, mode: 'onChange' })

  const [loadError, setLoadError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(!isEdit)

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    charactersApi.get(id!)
      .then((data) => {
        if (cancelled) return
        const patch: Partial<UpdateCharacterDto> = {
          level: data.level ?? undefined,
          magic_level: data.magic_level ?? undefined,
          fist_fighting: data.fist_fighting ?? undefined,
          club_fighting: data.club_fighting ?? undefined,
          sword_fighting: data.sword_fighting ?? undefined,
          axe_fighting: data.axe_fighting ?? undefined,
          distance_fighting: data.distance_fighting ?? undefined,
          shielding: data.shielding ?? undefined,
          fishing: data.fishing ?? undefined,
          is_private: data.is_private,
        }
        Object.entries(patch).forEach(([k, v]) => v !== undefined && setValue(k as any, v))
        setLoadedLevel(data.level ?? null)
        setLoaded(true)
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(t('characters.errors.loadFailed'))
        }
      })
    return () => { cancelled = true }
  }, [isEdit, id, charactersApi, setValue, t])

  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = useCallback(
    handleSubmit(async (data: CreateCharacterDto | UpdateCharacterDto) => {
      setSubmitError(null)
      try {
        if (isEdit) {
          // Level oficial não é editável manualmente — vem do site do Tibia.
          const { level: _level, ...patch } = data as UpdateCharacterDto
          void _level
          await charactersApi.update(id!, patch)
          onSuccess?.()
        } else {
          await charactersApi.create(data as CreateCharacterDto)
        }
        if (!onSuccess) navigate(redirectTo, { replace: true })
      } catch {
        setSubmitError(t('characters.errors.saveFailed'))
      }
    }),
    [handleSubmit, isEdit, id, onSuccess, navigate, redirectTo, t],
  )

  if (!loaded) {
    return (
      <div className="character-form character-form--loading">
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </div>
    )
  }

  if (loadError) {
    return (
      <Alert type="error" title={loadError}>
        {loadError}
      </Alert>
    )
  }

  const R = register as any
  const E = errors as any

  return (
    <form onSubmit={onSubmit} noValidate className="character-form">
      <div className="character-form__header">
        <h1>{isEdit ? t('characters.editTitle') : t('characters.addTitle')}</h1>
        <Link to="/characters" className="character-form__back">
          ← {t('actions.back')}
        </Link>
      </div>

      <Input
        {...register('name')}
        label={t('characters.name')}
        placeholder={t('characters.namePlaceholder')}
        error={E.name?.message}
        autoFocus
        disabled={isEdit}
      />

      <div className="character-form__row">
        {isEdit ? (
          <div className="character-form__level-readonly">
            <span className="field__label">{t('characters.level')}</span>
            <strong>{loadedLevel ?? '—'}</strong>
            <small className="field__hint">{t('characters.levelAutoHint')}</small>
          </div>
        ) : (
          <Input
            {...R('level', { valueAsNumber: true })}
            label={t('characters.level')}
            type="number"
            min={1}
            max={3000}
            placeholder={t('characters.levelPlaceholder')}
            error={E.level?.message}
          />
        )}
        <Input
          {...R('magic_level', { valueAsNumber: true })}
          label={t('characters.magicLevel')}
          type="number"
          min={0}
          max={200}
          placeholder={t('characters.magicLevelPlaceholder')}
          error={E.magic_level?.message}
        />
      </div>

      <fieldset className="character-form__skills">
        <legend>{t('characters.skills')}</legend>
        <div className="character-form__skills-grid">
          <Input
            {...R('fist_fighting', { valueAsNumber: true })}
            label={t('characters.skillsLabels.fist')}
            type="number"
            min={10}
            max={200}
            error={E.fist_fighting?.message}
          />
          <Input
            {...R('club_fighting', { valueAsNumber: true })}
            label={t('characters.skillsLabels.club')}
            type="number"
            min={10}
            max={200}
            error={E.club_fighting?.message}
          />
          <Input
            {...R('sword_fighting', { valueAsNumber: true })}
            label={t('characters.skillsLabels.sword')}
            type="number"
            min={10}
            max={200}
            error={E.sword_fighting?.message}
          />
          <Input
            {...R('axe_fighting', { valueAsNumber: true })}
            label={t('characters.skillsLabels.axe')}
            type="number"
            min={10}
            max={200}
            error={E.axe_fighting?.message}
          />
          <Input
            {...R('distance_fighting', { valueAsNumber: true })}
            label={t('characters.skillsLabels.distance')}
            type="number"
            min={10}
            max={200}
            error={E.distance_fighting?.message}
          />
          <Input
            {...R('shielding', { valueAsNumber: true })}
            label={t('characters.skillsLabels.shielding')}
            type="number"
            min={10}
            max={200}
            error={E.shielding?.message}
          />
          <Input
            {...R('fishing', { valueAsNumber: true })}
            label={t('characters.skillsLabels.fishing')}
            type="number"
            min={10}
            max={200}
            error={E.fishing?.message}
          />
        </div>
      </fieldset>

      {isPremium && (
        <Checkbox
          {...R('is_private')}
          label={t('characters.isPrivate')}
        />
      )}

      {submitError && <Alert type="error">{submitError}</Alert>}

      <div className="character-form__actions">
        <Button type="button" variant="ghost" onClick={() => navigate(redirectTo)} disabled={isSubmitting}>
          {t('actions.cancel')}
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? t('characters.save') : t('characters.create')}
        </Button>
      </div>
    </form>
  )
}