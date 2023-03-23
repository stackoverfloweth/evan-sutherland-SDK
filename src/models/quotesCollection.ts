import { BaseCollection, Quote, InvalidApiOptionsError } from '@/models'
import { mapper } from '@/services'

export class QuotesCollection extends BaseCollection<Quote> {
  public override async loadById(id: string): Promise<Quote | undefined> {
    if (this.api.movies === undefined) {
      throw new InvalidApiOptionsError()
    }

    const response = await this.api.quotes.getQuote(id)

    return mapper.map('QuoteResponse', response, 'Quote')
  }

  public override async loadNextPage(): Promise<{
    data: Quote[],
    page: number,
    pages: number,
  }> {
    if (this.api.quotes === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.quotes.getQuotes({
      page: this.currentPage + 1,
    })

    const quotes = mapper.map('QuoteResponse', docs, 'Quote')

    return {
      data: quotes,
      page,
      pages,
    }
  }
}