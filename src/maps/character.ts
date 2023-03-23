import { Character } from '@/models/character'
import { MapFunction } from '@/services/mapper'
import { CharacterResponse } from '@/types/characterResponse'

export const mapCharacterResponseToCharacter: MapFunction<CharacterResponse, Character> = function(source) {
  return new Character({
    id: source._id,
    birth: source.birth,
    death: source.death,
    gender: this.map('GenderResponse', source.gender, 'Gender'),
    hair: source.hair,
    height: source.height,
    name: source.name,
    race: source.race,
    realm: source.realm,
    spouse: source.spouse,
    wikiUrl: source.wikiUrl,
  })
}