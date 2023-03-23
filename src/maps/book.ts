import { Book } from '@/models/book'
import { MapFunction } from '@/services/mapper'
import { BookResponse } from '@/types/bookResponse'

export const mapBookResponseToBook: MapFunction<BookResponse, Book> = function(source) {
  return new Book({
    id: source._id,
    name: source.name,
  })
}