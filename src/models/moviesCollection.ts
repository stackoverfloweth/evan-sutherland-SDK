import { BaseCollection, Movie, InvalidApiOptionsError } from '@/models'
import { mapper } from '@/services'

export class MoviesCollection extends BaseCollection<Movie> {
  public override async loadMore(): Promise<Movie[]> {
    if (!this.hasMorePages) {
      return []
    }

    if (this.api.movies === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.movies.getMovies({
      page: this.currentPage + 1,
    })

    const movies = mapper.map('MovieResponse', docs, 'Movie')

    this.collection.push(...movies)
    this.currentPage = page
    this.totalPages = pages

    return movies
  }
}