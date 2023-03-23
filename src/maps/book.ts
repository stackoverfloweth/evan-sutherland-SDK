import { Book } from '@/models'
import { MapFunction } from '@/services'
import { BookResponse } from '@/types'

export const mapBookResponseToBook: MapFunction<BookResponse, Book> = function(source) {
  return new Book({
    id: source._id,
    name: source.name,
  })
}