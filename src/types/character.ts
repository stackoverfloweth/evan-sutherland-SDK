import { Gender } from '@/types/gender'
import { Race } from '@/types/race'

export type Character = {
  _id: string,
  birth: string,
  death: string,
  gender: Gender,
  hair: string,
  height: string,
  name: string,
  race: Race,
  realm: string,
  spouse: string,
  wikiUrl: string,
}