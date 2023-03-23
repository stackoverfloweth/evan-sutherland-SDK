import { Movie } from '@/models'
import { MapFunction } from '@/services/mapper'
import { MovieResponse } from '@/types'

export const mapMovieResponseToMovie: MapFunction<MovieResponse, Movie> = function(source) {
  return new Movie({
    id: source._id,
    academyAwardNominations: source.academyAwardNominations,
    academyAwardWins: source.academyAwardWins,
    boxOfficeRevenueInMillions: source.boxOfficeRevenueInMillions,
    budgetInMillions: source.budgetInMillions,
    name: source.name,
    rottenTomatoesScore: source.rottenTomatoesScore,
    runtimeInMinutes: source.runtimeInMinutes,
  })
}