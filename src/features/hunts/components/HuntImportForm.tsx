import { useQuery } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Textarea } from '@/components/ui/FormFields/Textarea'
import { Select } from '@/components/ui/FormFields/Select'
import { Checkbox } from '@/components/ui/FormFields/Checkbox'
import { Alert } from '@/components/feedback/Alert/Alert'
import { charactersApi } from '@/features/characters/api/characters.api'
import { useImportHuntSchema } from '../schemas/huntSchemas'
import { huntsApi } from '../api/hunts.api'
import { ROUTES } from '@/config/routes'
import type { Character } from '@/types/api'

import './HuntImportForm.css'

interface HuntImportFormProps {
  /** Disparado quando a importação é concluída com sucesso (invalidate/toast). */
  onSuccess?: () => void
  /** Mesmo handler do X do modal — usado pelo botão "Fechar" da tela de sucesso. */
  onClose?: () => void
}

export function HuntImportForm({ onSuccess, onClose }: HuntImportFormProps) {
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
        {charactersLoading ? (
          <Select label={t('hunts.import.character')} disabled>
            <option>{t('loading')}</option>
          </Select>
        ) : (characters ?? []).length === 0 ? (
          <>
            <Alert type="info">{t('characters.empty')}</Alert>
            <Link to={ROUTES.characterNew}>
              <Button variant="secondary">{t('characters.addButton')}</Button>
            </Link>
          </>
        ) : (
          <Select
            label={t('hunts.import.character')}
            placeholder={t('hunts.import.selectCharacter')}
            defaultValue=""
            onChange={(e) => {
              const found = (characters ?? []).find((c) => c.id === e.target.value)
              if (found) handleCharacterSelect(found)
            }}
            error={errors.character_id?.message}
            autoFocus
          >
            {(characters ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.world ? ` — ${c.world}` : ''}
                {c.level ? ` (Level ${c.level})` : ''}
              </option>
            ))}
          </Select>
        )}
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
        {onClose && <Button variant="ghost" onClick={onClose}>{t('hunts.import.close')}</Button>}
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
      </div>

      <div className="hunt-import-form__actions">
        <Button type="button" variant="ghost" onClick={() => setStep('character')}>{t('actions.back')}</Button>
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? t('hunts.import.importing') : t('hunts.import.import')}
        </Button>
      </div>
    </form>
  )
}
