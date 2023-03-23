import { BaseCollection } from '@/models/baseCollection'
import { InvalidApiOptionsError } from '@/models/invalidApiOptionsError'
import { Movie } from '@/models/movie'
import { mapper } from '@/services/mapper'

export class MoviesCollection extends BaseCollection<Movie> {
  public override async loadById(id: string): Promise<Movie | undefined> {
    if (this.api.movies === undefined) {
      throw new InvalidApiOptionsError()
    }

    const response = await this.api.movies.getMovie(id)

    return mapper.map('MovieResponse', response, 'Movie')
  }

  public override async loadNextPage(): Promise<{
    data: Movie[],
    page: number,
    pages: number,
  }> {
    if (this.api.movies === undefined) {
      throw new InvalidApiOptionsError()
    }

    const { docs, page, pages } = await this.api.movies.getMovies({
      page: this.currentPage + 1,
    })

    const movies = mapper.map('MovieResponse', docs, 'Movie')

    return {
      data: movies,
      page,
      pages,
    }
  }
}