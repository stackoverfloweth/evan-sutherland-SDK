import { BaseApiConfig, BooksApi, CharactersApi, MoviesApi } from '@/services'
import { AuthenticatedApiConfig, isAuthenticatedApiConfig } from '@/types'

export type ApiOptions = BaseApiConfig | AuthenticatedApiConfig

// better types if we let TypeScript infer here
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createApi(options: ApiOptions) {
  if (isAuthenticatedApiConfig(options)) {
    return {
      books: new BooksApi(),
      characters: new CharactersApi(options),
      movies: new MoviesApi(options),
    }
  }

  return {
    books: new BooksApi(),
  }
}