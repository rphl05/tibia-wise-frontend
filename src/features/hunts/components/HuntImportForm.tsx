import { useQuery } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Textarea } from '@/components/ui/FormFields/Textarea'
import { Checkbox } from '@/components/ui/FormFields/Checkbox'
import { Alert } from '@/components/feedback/Alert/Alert'
import { charactersApi } from '@/features/characters/api/characters.api'
import { useImportHuntSchema } from '../schemas/huntSchemas'
import { huntsApi } from '../api/hunts.api'
import { CharacterSelector } from '@/features/characters/components/CharacterSelector'
import type { Character } from '@/types/api'

import './HuntImportForm.css'

interface HuntImportFormProps {
  onSuccess?: () => void
}

export function HuntImportForm({ onSuccess }: HuntImportFormProps) {
  const { t } = useTranslation()
  const schema = useImportHuntSchema()
  const [step, setStep] = useState<'character' | 'content' | 'success'>('character')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: charactersApi.list,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: 'onChange' })

  const rawContent = watch('raw_content')

  const handleCharacterSelect = useCallback((c: Character) => {
    setSelectedCharacter(c)
    setValue('character_id', Number(c.id))
    setStep('content')
  }, [setValue])

  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      setImportError(null)
      try {
        await huntsApi.import({
          raw_content: data.raw_content,
          character_id: data.character_id,
          name: data.name || undefined,
          notes: data.notes || undefined,
          is_fast_respawn: data.is_fast_respawn ?? false,
          visibility: data.is_public ? 'PUBLIC' : 'PRIVATE',
        })
        setStep('success')
        onSuccess?.()
      } catch {
        setImportError(t('hunts.import.importFailed'))
      }
    }),
    [handleSubmit, onSuccess, t],
  )

  if (step === 'character') {
    return (
      <div className="hunt-import">
        <h2>{t('hunts.import.step1')}</h2>
        <p className="hunt-import__description">{t('hunts.import.selectCharacterDesc')}</p>
        <CharacterSelector
          activeCharacter={selectedCharacter}
          characters={characters ?? []}
          loading={charactersLoading}
          onSelect={handleCharacterSelect}
        />
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="hunt-import hunt-import--success">
        <div className="hunt-import__success-icon">
          <CheckCircle2 size={64} aria-hidden />
        </div>
        <h2>{t('hunts.import.success')}</h2>
        <p>{t('hunts.import.successDesc')}</p>
        <Button onClick={() => { reset(); setStep('character'); setSelectedCharacter(null); setImportError(null) }}>
          {t('hunts.import.newImport')}
        </Button>
        {onSuccess && <Button variant="ghost" onClick={onSuccess}>{t('hunts.import.viewHunt')}</Button>}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="hunt-import-form">
      <div className="hunt-import-form__steps">
        <span className="done">{t('hunts.import.step1')}</span>
        <span className="active">{t('hunts.import.step2')}</span>
      </div>

      {importError && (
        <Alert type="error">
          {importError}
        </Alert>
      )}

      <Textarea
        {...register('raw_content')}
        label={t('hunts.import.contentLabel')}
        placeholder={t('hunts.import.contentPlaceholder')}
        rows={12}
        error={errors.raw_content?.message}
        autoFocus
      />
      {rawContent && (
        <p className="hunt-import-form__char-count">
          {rawContent.length}/20.000
        </p>
      )}

      {selectedCharacter && (
        <p className="hunt-import-form__character">
          <strong>{t('hunts.import.character')}:</strong> {selectedCharacter.name}
        </p>
      )}

      <Input
        {...register('name')}
        label={t('hunts.import.nameLabel')}
        placeholder={t('hunts.import.namePlaceholder')}
        error={errors.name?.message}
      />

      <Textarea
        {...register('notes')}
        label={t('hunts.import.notesLabel')}
        placeholder={t('hunts.import.notesPlaceholder')}
        rows={3}
        error={errors.notes?.message}
      />

      <div className="hunt-import-form__options">
        <Checkbox {...register('is_fast_respawn')} label={t('hunts.import.fastRespawn')} />
        <Checkbox
          {...register('is_public')}
          label={t('hunts.import.makePublic')}
        />
      </div>

      <div className="hunt-import-form__actions">
        <Button type="button" variant="ghost" onClick={() => setStep('character')}>{t('actions.back')}</Button>
        <Button type="submit" loading={isSubmitting}>
          {t('hunts.import.import')}
        </Button>
      </div>
    </form>
  )
}