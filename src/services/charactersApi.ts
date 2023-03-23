import { BaseApi } from '@/services'
import { AuthenticatedApiConfig, CharacterResponse, PaginatedResponse } from '@/types'
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

  public getCharacterQuotes(id: string, requestParams: RequestParams<CharacterResponse> = {}): Promise<PaginatedResponse<string[]>> {
    return this.instance.get(`${id}/quote`, { params: requestParams })
  }
}
