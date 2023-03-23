import { BaseApi } from '@/services/baseApi'
import { AuthenticatedApiConfig } from '@/types/authenticatedApiConfig'
import { CharacterResponse } from '@/types/characterResponse'
import { PaginatedResponse } from '@/types/pagination'
import { QuoteResponse } from '@/types/quoteResponse'
import { RequestParams } from '@/types/requestParams'

export class CharactersApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'character')
  }

  public getCharacters(requestParams: RequestParams<CharacterResponse> = {}): Promise<PaginatedResponse<CharacterResponse[]>> {
    return this.instance.get('', { params: requestParams })
      .then(({ data }) => data)
  }

  public getCharacter(id: string): Promise<CharacterResponse | undefined> {
    return this.instance.get<PaginatedResponse<CharacterResponse[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }

  public getCharacterQuotes(id: string, requestParams: RequestParams<QuoteResponse> = {}): Promise<PaginatedResponse<QuoteResponse[]>> {
    return this.instance.get(`${id}/quote`, { params: requestParams })
  }
}
