import { BaseCollection } from '@/models/baseCollection'
import { Book } from '@/models/book'
import { mapper } from '@/services/mapper'

export class BooksCollection extends BaseCollection<Book> {
  public override async loadById(id: string): Promise<Book | undefined> {
    const response = await this.api.books.getBook(id)

    return mapper.map('BookResponse', response, 'Book')
  }

  public override async loadNextPage(): Promise<{
    data: Book[],
    page: number,
    pages: number,
  }> {
    const { docs, page, pages } = await this.api.books.getBooks({
      page: this.currentPage + 1,
    })

    const books = mapper.map('BookResponse', docs, 'Book')

    return {
      data: books,
      page,
      pages,
    }
  }
}