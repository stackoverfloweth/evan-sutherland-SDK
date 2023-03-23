import { BaseApi } from '@/services/baseApi'
import { AuthenticatedApiConfig } from '@/types/authenticatedApiConfig'
import { MovieResponse } from '@/types/movieResponse'
import { PaginatedResponse } from '@/types/pagination'
import { RequestParams } from '@/types/requestParams'

export class MoviesApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'movie')
  }

  public getMovies(requestParams: RequestParams<MovieResponse> = {}): Promise<PaginatedResponse<MovieResponse[]>> {
    return this.instance.get('', { params: requestParams })
      .then(({ data }) => data)
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