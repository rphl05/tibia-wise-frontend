import { ErrorPage } from './ErrorPage'

export default function ServerErrorPage() {
  return (
    <ErrorPage
      status={500}
      title="Erro Interno do Servidor"
      description="Ocorreu um erro inesperado. Nossa equipe já foi notificada."
      ctaText="Tentar Novamente"
      ctaHref="/"
    />
  )
}