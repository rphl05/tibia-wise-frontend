import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/FormFields/Input'
import { Checkbox } from '@/components/ui/FormFields/Checkbox'
import { Alert } from '@/components/feedback/Alert/Alert'
import { useToast } from '@/components/feedback/Toast/ToastProvider'
import { charactersApi } from '../api/characters.api'
import { ApiError } from '@/lib/api/errors'
import type { Character } from '@/types/api'

import './AddCharacterFlow.css'

type Step = 'name' | 'verify' | 'done'

const NAME_REGEX = /^[a-zA-Z0-9 ',-]+$/

export function AddCharacterFlow() {
  const { t } = useTranslation()
  const toast = useToast()
  const queryClient = useQueryClient()

  const [step, setStep] = useState<Step>('name')
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [nameError, setNameError] = useState<string | null>(null)

  const [character, setCharacter] = useState<Character | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setNameError(t('characters.validation.nameRequired'))
      return
    }
    if (!NAME_REGEX.test(trimmed)) {
      setNameError(t('characters.validation.namePattern'))
      return
    }

    setLoading(true)
    setNameError(null)
    try {
      const created = await charactersApi.create({ name: trimmed, is_private: isPrivate })
      const verification = await charactersApi.generateVerification(created.id)
      setCharacter(created)
      setToken(verification.token)
      setStep('verify')
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : t('characters.wizard.createFailed'),
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleCopyToken() {
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      toast.success(t('characters.wizard.tokenCopied'))
    } catch {
      toast.error(t('characters.wizard.copyFailed'))
    }
  }

  async function handleVerify() {
    if (!character || loading) return
    setLoading(true)
    setVerifyError(null)
    try {
      await charactersApi.verify(character.id)
      let updated = character
      try {
        // Busca level e dados atualizados diretamente do site do Tibia.
        updated = await charactersApi.refresh(character.id)
      } catch {
        // Sem bloquear: o nível pode ser atualizado depois pela lista/detalhe.
      }
      setCharacter(updated)
      await queryClient.invalidateQueries({ queryKey: ['characters'] })
      setStep('done')
    } catch (err) {
      setVerifyError(
        err instanceof ApiError ? err.message : t('characters.wizard.verifyFailed'),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="character-wizard">
      <div className="character-wizard__header">
        <h1>{t('characters.addTitle')}</h1>
        <Link to="/characters" className="character-wizard__back">
          ← {t('actions.back')}
        </Link>
      </div>

      {step === 'name' && (
        <form onSubmit={handleCreate} noValidate className="character-wizard__card">
          <p className="character-wizard__description">
            {t('characters.wizard.nameDescription')}
          </p>
          <Input
            label={t('characters.name')}
            placeholder={t('characters.namePlaceholder')}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setNameError(null)
            }}
            error={nameError ?? undefined}
            maxLength={100}
            autoFocus
            disabled={loading}
            autoComplete="off"
          />
          <Checkbox
            label={t('characters.isPrivate')}
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            disabled={loading}
          />
          <div className="character-wizard__actions">
            <Link to="/characters">
              <Button type="button" variant="ghost" disabled={loading}>
                {t('actions.cancel')}
              </Button>
            </Link>
            <Button type="submit" loading={loading}>
              {t('characters.wizard.continue')}
            </Button>
          </div>
        </form>
      )}

      {step === 'verify' && character && token && (
        <div className="character-wizard__card">
          <p className="character-wizard__description">
            {t('characters.wizard.verifyDescription', { name: character.name })}
          </p>

          <ol className="character-wizard__steps">
            <li>{t('characters.wizard.step1')}</li>
            <li>{t('characters.wizard.step2')}</li>
            <li>{t('characters.wizard.step3')}</li>
          </ol>

          <div className="character-wizard__token">
            <code>{token}</code>
            <Button type="button" variant="secondary" size="sm" onClick={() => void handleCopyToken()}>
              {t('characters.wizard.copyCode')}
            </Button>
          </div>

          {verifyError && <Alert type="error">{verifyError}</Alert>}

          <div className="character-wizard__actions">
            <Button variant="primary" loading={loading} onClick={() => void handleVerify()}>
              {t('characters.wizard.verifyButton')}
            </Button>
          </div>
        </div>
      )}

      {step === 'done' && character && (
        <div className="character-wizard__card">
          <Alert type="success" title={t('characters.wizard.successTitle')}>
            {character.level
              ? t('characters.wizard.successBodyWithLevel', { level: character.level })
              : t('characters.wizard.successBody')}
          </Alert>
          <div className="character-wizard__actions">
            <Link to="/characters">
              <Button variant="secondary">{t('characters.wizard.viewCharacters')}</Button>
            </Link>
            <Link to={`/characters/${character.id}/edit`}>
              <Button variant="primary">{t('characters.wizard.editSkills')}</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
