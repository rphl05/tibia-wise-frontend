import { HuntImportForm } from '@/features/hunts/components/HuntImportForm'

export default function ImportHuntPage() {
  return (
    <div className="import-hunt-page">
      <h1>Importar Hunt</h1>
      <HuntImportForm onSuccess={() => {}} />
    </div>
  )
}