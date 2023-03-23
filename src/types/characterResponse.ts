import { GenderResponse } from '@/types/genderResponse'
import { Race } from '@/types/race'

export type CharacterResponse = {
  _id: string,
  birth: string,
  death: string,
  gender: GenderResponse,
  hair: string,
  height: string,
  name: string,
  race: Race,
  realm: string,
  spouse: string,
  wikiUrl: string,
}