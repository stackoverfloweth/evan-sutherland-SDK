import { BaseApi, BaseApiConfig } from '@/services'
import { Book, PaginatedResponse } from '@/types'
import { RequestParams } from '@/types/requestParams'

export class BooksApi extends BaseApi {
  public constructor(apiConfig: BaseApiConfig = {}) {
    super(apiConfig, 'book')
  }

  public getBooks(requestParams: RequestParams<Book> = {}): Promise<PaginatedResponse<Book[]>> {
    return this.instance.get('', { params: requestParams })
  }

  public getBook(id: string): Promise<Book | undefined> {
    return this.instance.get<PaginatedResponse<Book[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }
}