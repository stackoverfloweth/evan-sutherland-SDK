
import { BaseApi, BaseApiConfig } from '@/services/baseApi'
import { BookResponse } from '@/types/bookResponse'
import { PaginatedResponse } from '@/types/pagination'
import { RequestParams } from '@/types/requestParams'

export class BooksApi extends BaseApi {
  public constructor(apiConfig: BaseApiConfig = {}) {
    super(apiConfig, 'book')
  }

  public getBooks(requestParams: RequestParams<BookResponse> = {}): Promise<PaginatedResponse<BookResponse[]>> {
    return this.instance.get('', { params: requestParams })
      .then(({ data }) => data)
  }

  public getBook(id: string): Promise<BookResponse | undefined> {
    return this.instance.get<PaginatedResponse<BookResponse[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }
}