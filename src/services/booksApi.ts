import { BaseApi, BaseApiConfig } from '@/services'
import { Book, PaginatedRequest, PaginatedResponse } from '@/types'


export class BooksApi extends BaseApi {
  public constructor(apiConfig: BaseApiConfig = {}) {
    super(apiConfig, 'book')
  }

  public getBooks(pageRequest: PaginatedRequest = {}): Promise<PaginatedResponse<Book[]>> {
    return this.instance.get('', { params: pageRequest })
  }

  public getBook(id: string): Promise<Book | undefined> {
    return this.instance.get<PaginatedResponse<Book[]>>(`/${id}`)
      .then(({ data }) => {
        const [value] = data.docs

        return value
      })
  }
}