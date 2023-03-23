import { AuthenticatedApiConfig, BaseApi } from '@/services'
import { Character, PaginatedResponse } from '@/types'
import { RequestParams } from '@/types/requestParams'

export class CharactersApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'character')
  }

  public getCharacters(requestParams: RequestParams<Character> = {}): Promise<PaginatedResponse<Character[]>> {
    return this.instance.get('', { params: requestParams })
  }

  public getCharacter(id: string): Promise<Character | undefined> {
    return this.instance.get<PaginatedResponse<Character[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }

  public getCharacterQuotes(id: string, requestParams: RequestParams<Character> = {}): Promise<PaginatedResponse<string[]>> {
    return this.instance.get(`${id}/quote`, { params: requestParams })
  }
}
