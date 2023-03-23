import { BaseCollection, Character, InvalidApiOptionsError } from '@/models'
import { mapper } from '@/services'

export class CharactersCollection extends BaseCollection<Character> {
  public override async loadById(id: string): Promise<Character | undefined> {
    const existing = this.collection.find(character => character.id === id)

    if (existing) {
      return existing
    }

    if (this.api.characters === undefined) {
      throw new InvalidApiOptionsError()
    }

    const response = await this.api.characters.getCharacter(id)

    return mapper.map('CharacterResponse', response, 'Character')
  }

  public override async loadMore(): Promise<Character[]> {
    if (!this.hasMorePages) {
      return []
    }

    if (this.api.characters === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.characters.getCharacters({
      page: this.currentPage + 1,
    })

    const characters = mapper.map('CharacterResponse', docs, 'Character')

    this.collection.push(...characters)
    this.currentPage = page
    this.totalPages = pages

    return characters
  }
}