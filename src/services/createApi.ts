import { BaseApiConfig } from '@/services/baseApi'
import { BooksApi } from '@/services/booksApi'
import { CharactersApi } from '@/services/charactersApi'
import { MoviesApi } from '@/services/moviesApi'
import { QuotesApi } from '@/services/quotesApi'
import { AuthenticatedApiConfig, isAuthenticatedApiConfig } from '@/types/authenticatedApiConfig'

export type CreateBaseApi = {
  books: BooksApi,
}

export type CreateAuthenticatedApi = CreateBaseApi & {
  books: BooksApi,
  characters: CharactersApi,
  movies: MoviesApi,
  quotes: QuotesApi,
}

export function createApi(options: BaseApiConfig): CreateBaseApi
export function createApi(options: AuthenticatedApiConfig): CreateAuthenticatedApi
export function createApi(options: BaseApiConfig | AuthenticatedApiConfig = {}): CreateAuthenticatedApi | CreateBaseApi {
  if (isAuthenticatedApiConfig(options)) {
    return {
      books: new BooksApi(),
      characters: new CharactersApi(options),
      movies: new MoviesApi(options),
      quotes: new QuotesApi(options),
    }
  }

  return {
    books: new BooksApi(),
  }
}