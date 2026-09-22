import { useParams } from 'react-router-dom'

import { CharacterForm } from '@/features/characters/components/CharacterForm'
import { AddCharacterFlow } from '@/features/characters/components/AddCharacterFlow'

export default function CharacterFormPage() {
  const { id } = useParams()
  return id ? <CharacterForm characterId={id} /> : <AddCharacterFlow />
}