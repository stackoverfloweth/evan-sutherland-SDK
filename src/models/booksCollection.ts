import { BaseCollection } from '@/models/baseCollection'
import { Book } from '@/models/book'
import { mapper } from '@/services/mapper'

export class BooksCollection extends BaseCollection<Book> {
  public override async loadById(id: string): Promise<Book | undefined> {
    const existing = this.collection.find(book => book.id === id)

    if (existing) {
      return existing
    }

    const response = await this.api.books.getBook(id)

    return mapper.map('BookResponse', response, 'Book')
  }

  public override async loadMore(): Promise<Book[]> {
    if (!this.hasMorePages) {
      return []
    }

    const { docs, page, pages } = await this.api.books.getBooks({
      page: this.currentPage + 1,
    })

    const books = mapper.map('BookResponse', docs, 'Book')

    this.collection.push(...books)
    this.currentPage = page
    this.totalPages = pages

    return books
  }
}