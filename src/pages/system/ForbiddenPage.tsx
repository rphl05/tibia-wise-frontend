import { ErrorPage } from './ErrorPage'

export default function ForbiddenPage() {
  return (
    <ErrorPage
      status={403}
      title="Acesso Negado"
      description="Você não tem permissão para acessar esta página."
      ctaText="Voltar ao Início"
      ctaHref="/"
    />
  )
}