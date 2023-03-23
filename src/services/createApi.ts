import { BaseApiConfig } from '@/services/baseApi'
import { BooksApi } from '@/services/booksApi'
import { CharactersApi } from '@/services/charactersApi'
import { MoviesApi } from '@/services/moviesApi'
import { QuotesApi } from '@/services/quotesApi'
import { AuthenticatedApiConfig, isAuthenticatedApiConfig } from '@/types/authenticatedApiConfig'

export type ApiOptions = BaseApiConfig | AuthenticatedApiConfig

// better types if we let TypeScript infer here
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createApi(options: ApiOptions) {
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

export type CreateApi = ReturnType<typeof createApi>