import { Gender, isGender, Race } from '@/types'

export interface ICharacter {
  id: string,
  birth: string,
  death: string,
  gender: Gender | undefined,
  hair: string,
  height: string,
  name: string,
  race: Race,
  realm: string,
  spouse: string,
  wikiUrl: string,
}

export class Character implements ICharacter {
  public readonly id: string
  public birth: string
  public death: string
  public gender: Gender | undefined
  public hair: string
  public height: string
  public name: string
  public race: Race
  public realm: string
  public spouse: string
  public wikiUrl: string

  public constructor(character: ICharacter) {
    this.id = character.id
    this.birth = character.birth
    this.death = character.death
    this.gender = isGender(character.gender) ? character.gender : undefined
    this.hair = character.hair
    this.height = character.height
    this.name = character.name
    this.race = character.race
    this.realm = character.realm
    this.spouse = character.spouse
    this.wikiUrl = character.wikiUrl
  }
}