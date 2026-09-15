import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeAll } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

import i18n from '@/lib/i18n'
import { PublicHeader } from '@/layouts/PublicLayout/PublicHeader'

describe('PublicHeader i18n', () => {
  beforeAll(async () => {
    await i18n.changeLanguage('pt-BR')
  })

  it('renders translated nav text (pt-BR default)', () => {
    render(
      <BrowserRouter>
        <PublicHeader />
      </BrowserRouter>
    )
    expect(screen.getByText('Minhas Hunts')).toBeTruthy()
    expect(screen.getByText('Tutoriais')).toBeTruthy()
  })

  it('renders login/register translated', () => {
    render(
      <BrowserRouter>
        <PublicHeader />
      </BrowserRouter>
    )
    expect(screen.getByText('Entrar')).toBeTruthy()
    expect(screen.getByText('Criar conta')).toBeTruthy()
  })

  it('key never appears as-is', () => {
    render(
      <BrowserRouter>
        <PublicHeader />
      </BrowserRouter>
    )
    expect(screen.queryByText('nav.myHunts')).toBeNull()
    expect(screen.queryByText('actions.login')).toBeNull()
  })
})