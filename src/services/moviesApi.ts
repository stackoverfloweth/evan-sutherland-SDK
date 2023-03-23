import { AuthenticatedApiConfig, BaseApi } from '@/services'
import { MovieResponse, PaginatedResponse } from '@/types'
import { RequestParams } from '@/types/requestParams'

export class MoviesApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'movie')
  }

  public getMovies(requestParams: RequestParams<MovieResponse> = {}): Promise<PaginatedResponse<MovieResponse[]>> {
    return this.instance.get('', { params: requestParams })
  }

  public getMovie(id: string): Promise<MovieResponse | undefined> {
    return this.instance.get<PaginatedResponse<MovieResponse[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }

  public getMovieQuotes(id: string, requestParams: RequestParams<MovieResponse> = {}): Promise<PaginatedResponse<string[]>> {
    return this.instance.get(`${id}/quote`, { params: requestParams })
  }
}