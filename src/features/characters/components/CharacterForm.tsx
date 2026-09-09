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

import './CharacterForm.css'

interface CharacterFormProps {
  /** ID do personagem para edição; omitir para criação. */
  characterId?: string
  /** Redirecionar após sucesso. */
  redirectTo?: string
}

export function CharacterForm({ characterId, redirectTo = '/characters' }: CharacterFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = Boolean(characterId ?? params.id)
  const id = characterId ?? params.id

  const createSchema = useCreateCharacterSchema()
  const updateSchema = useUpdateCharacterSchema()
  const schema = isEdit ? updateSchema : createSchema
  const defaultValues = isEdit ? {} : { is_private: false }

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
        setLoaded(true)
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(t('characters.errors.loadFailed', 'Falha ao carregar personagem.'))
        }
      })
    return () => { cancelled = true }
  }, [isEdit, id, charactersApi, setValue, t])

  const onSubmit = useCallback(
    handleSubmit(async (data: CreateCharacterDto | UpdateCharacterDto) => {
      try {
        if (isEdit) {
          await charactersApi.update(id!, data as UpdateCharacterDto)
        } else {
          await charactersApi.create(data as CreateCharacterDto)
        }
        navigate(redirectTo, { replace: true })
      } catch (err) {
        // Error mapping could be added here
      }
    }),
    [handleSubmit, isEdit, id, charactersApi, navigate, redirectTo],
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
        placeholder={t('characters.namePlaceholder', 'Nome do personagem')}
        error={E.name?.message}
        autoFocus
        disabled={isEdit}
      />

      <div className="character-form__row">
        <Input
          {...R('level', { valueAsNumber: true })}
          label={t('characters.level')}
          type="number"
          min={1}
          max={3000}
          placeholder={t('characters.levelPlaceholder', 'Ex.: 150')}
          error={E.level?.message}
        />
        <Input
          {...R('magic_level', { valueAsNumber: true })}
          label={t('characters.magicLevel')}
          type="number"
          min={0}
          max={200}
          placeholder={t('characters.magicLevelPlaceholder', 'Ex.: 50')}
          error={E.magic_level?.message}
        />
      </div>

      <fieldset className="character-form__skills">
        <legend>{t('characters.skills')}</legend>
        <div className="character-form__skills-grid">
          <Input
            {...R('fist_fighting', { valueAsNumber: true })}
            label={t('characters.skills.fist')}
            type="number"
            min={10}
            max={200}
            error={E.fist_fighting?.message}
          />
          <Input
            {...R('club_fighting', { valueAsNumber: true })}
            label={t('characters.skills.club')}
            type="number"
            min={10}
            max={200}
            error={E.club_fighting?.message}
          />
          <Input
            {...R('sword_fighting', { valueAsNumber: true })}
            label={t('characters.skills.sword')}
            type="number"
            min={10}
            max={200}
            error={E.sword_fighting?.message}
          />
          <Input
            {...R('axe_fighting', { valueAsNumber: true })}
            label={t('characters.skills.axe')}
            type="number"
            min={10}
            max={200}
            error={E.axe_fighting?.message}
          />
          <Input
            {...R('distance_fighting', { valueAsNumber: true })}
            label={t('characters.skills.distance')}
            type="number"
            min={10}
            max={200}
            error={E.distance_fighting?.message}
          />
          <Input
            {...R('shielding', { valueAsNumber: true })}
            label={t('characters.skills.shielding')}
            type="number"
            min={10}
            max={200}
            error={E.shielding?.message}
          />
          <Input
            {...R('fishing', { valueAsNumber: true })}
            label={t('characters.skills.fishing')}
            type="number"
            min={10}
            max={200}
            error={E.fishing?.message}
          />
        </div>
      </fieldset>

      <Checkbox
        {...R('is_private')}
        label={t('characters.isPrivate', 'Tornar privado')}
      />

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