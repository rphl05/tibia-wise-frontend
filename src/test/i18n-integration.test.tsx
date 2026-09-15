import i18n from '@/lib/i18n'

describe('i18n init', () => {
  it('registers resources correctly', async () => {
    await i18n.init({
      fallbackLng: 'pt-BR',
      resources: {
        'pt-BR': { translation: { nav: { myHunts: 'Minhas Hunts' } } },
        en: { translation: { nav: { myHunts: 'My Hunts' } } },
      },
    })

    expect(i18n.t('nav.myHunts')).toBe('Minhas Hunts')

    i18n.changeLanguage('en')
    expect(i18n.t('nav.myHunts')).toBe('My Hunts')
  })

  it('loads from project resources', () => {
    expect(i18n.t('nav.myHunts')).toBe('Minhas Hunts')
    expect(i18n.t('actions.login')).toBe('Entrar')
    expect(i18n.t('home.eyebrow')).toBe('Seus dados, melhores decisões')
  })
})