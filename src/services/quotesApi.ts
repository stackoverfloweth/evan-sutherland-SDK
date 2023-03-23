import { BaseApi } from '@/services/baseApi'
import { AuthenticatedApiConfig } from '@/types/authenticatedApiConfig'
import { PaginatedResponse } from '@/types/pagination'
import { QuoteResponse } from '@/types/quoteResponse'
import { RequestParams } from '@/types/requestParams'

export class QuotesApi extends BaseApi<AuthenticatedApiConfig> {
  public constructor(apiConfig: AuthenticatedApiConfig) {
    super(apiConfig, 'quote')
  }

  public getQuotes(requestParams: RequestParams<QuoteResponse> = {}): Promise<PaginatedResponse<QuoteResponse[]>> {
    return this.instance.get('', { params: requestParams })
      .then(({ data }) => data)
  }

  public getQuote(id: string): Promise<QuoteResponse | undefined> {
    return this.instance.get<PaginatedResponse<QuoteResponse[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }
}