import { BaseCollection, Character, InvalidApiOptionsError } from '@/models'
import { mapper } from '@/services'

export class CharactersCollection extends BaseCollection<Character> {
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