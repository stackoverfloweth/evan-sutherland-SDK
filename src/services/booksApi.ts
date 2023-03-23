import { BaseApi, BaseApiConfig } from '@/services'
import { BookResponse, PaginatedResponse } from '@/types'
import { RequestParams } from '@/types/requestParams'

export class BooksApi extends BaseApi {
  public constructor(apiConfig: BaseApiConfig = {}) {
    super(apiConfig, 'book')
  }

  public getBooks(requestParams: RequestParams<BookResponse> = {}): Promise<PaginatedResponse<BookResponse[]>> {
    return this.instance.get('', { params: requestParams })
  }

  public getBook(id: string): Promise<BookResponse | undefined> {
    return this.instance.get<PaginatedResponse<BookResponse[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }
}