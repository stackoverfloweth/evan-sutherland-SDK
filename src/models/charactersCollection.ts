import { BaseCollection } from '@/models/baseCollection'
import { Character } from '@/models/character'
import { InvalidApiOptionsError } from '@/models/invalidApiOptionsError'
import { mapper } from '@/services/mapper'

export class CharactersCollection extends BaseCollection<Character> {
  public override async loadById(id: string): Promise<Character | undefined> {
    if (this.api.characters === undefined) {
      throw new InvalidApiOptionsError()
    }

    const response = await this.api.characters.getCharacter(id)

    return mapper.map('CharacterResponse', response, 'Character')
  }

  public override async loadNextPage(): Promise<{
    data: Character[],
    page: number,
    pages: number,
  }> {
    if (this.api.characters === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.characters.getCharacters({
      page: this.currentPage + 1,
    })

    const characters = mapper.map('CharacterResponse', docs, 'Character')

    return {
      data: characters,
      page,
      pages,
    }
  }
}