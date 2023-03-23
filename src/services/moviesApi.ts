import { AuthenticatedApiConfig, BaseApi } from '@/services'
import { Movie, PaginatedResponse } from '@/types'
import { RequestParams } from '@/types/requestParams'

export class MoviesApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'movie')
  }

  public getMovies(requestParams: RequestParams<Movie> = {}): Promise<PaginatedResponse<Movie[]>> {
    return this.instance.get('', { params: requestParams })
  }

  public getMovie(id: string): Promise<Movie | undefined> {
    return this.instance.get<PaginatedResponse<Movie[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }

  public getMovieQuotes(id: string, requestParams: RequestParams<Movie> = {}): Promise<PaginatedResponse<string[]>> {
    return this.instance.get(`${id}/quote`, { params: requestParams })
  }
}