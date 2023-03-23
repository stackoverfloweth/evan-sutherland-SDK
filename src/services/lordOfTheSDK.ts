import { BooksCollection } from '@/models/booksCollection'
import { CharactersCollection } from '@/models/charactersCollection'
import { MoviesCollection } from '@/models/moviesCollection'
import { QuotesCollection } from '@/models/quotesCollection'
import { ApiOptions } from '@/services'

export type Store = {
  books: BooksCollection,
  characters: CharactersCollection,
  movies: MoviesCollection,
  quotes: QuotesCollection,
}

export function LordOfTheSdk(options: ApiOptions = {}): Store {
  return {
    books: new BooksCollection(options),
    characters: new CharactersCollection(options),
    movies: new MoviesCollection(options),
    quotes: new QuotesCollection(options),
  }
}