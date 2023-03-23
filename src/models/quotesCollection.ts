import { BaseCollection, Quote, InvalidApiOptionsError } from '@/models'
import { mapper } from '@/services'

export class QuotesCollection extends BaseCollection<Quote> {
  public override async loadMore(): Promise<Quote[]> {
    if (!this.hasMorePages) {
      return []
    }

    if (this.api.quotes === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.quotes.getQuotes({
      page: this.currentPage + 1,
    })

    const quotes = mapper.map('QuoteResponse', docs, 'Quote')

    this.collection.push(...quotes)
    this.currentPage = page
    this.totalPages = pages

    return quotes
  }
}