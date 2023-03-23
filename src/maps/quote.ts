import { Quote } from '@/models/quote'
import { MapFunction } from '@/services/mapper'
import { QuoteResponse } from '@/types/quoteResponse'

export const mapQuoteResponseToQuote: MapFunction<QuoteResponse, Quote> = function(source) {
  return new Quote({
    id: source._id,
    characterId: source.character,
    movieId: source.movie,
    dialog: source.dialog,
  })
}