import { BaseCollection, Book } from '@/models'
import { mapper } from '@/services'

export class BooksCollection extends BaseCollection<Book> {
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