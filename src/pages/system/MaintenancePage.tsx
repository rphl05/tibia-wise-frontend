import { ErrorPage } from './ErrorPage'

export default function MaintenancePage() {
  return (
    <ErrorPage
      status={503}
      title="Em Manutenção"
      description="O sistema está temporariamente indisponível para manutenção programada. Voltamos em breve!"
      ctaText="Tentar Novamente"
      ctaHref="/"
    />
  )
}