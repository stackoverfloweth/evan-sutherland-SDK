export interface IMovie {
  id: string,
  academyAwardNominations: number,
  academyAwardWins: number,
  boxOfficeRevenueInMillions: number,
  budgetInMillions: number,
  name: string,
  rottenTomatoesScore: number,
  runtimeInMinutes: number,
}

export class Movie implements IMovie {
  public readonly id: string
  public academyAwardNominations: number
  public academyAwardWins: number
  public boxOfficeRevenueInMillions: number
  public budgetInMillions: number
  public name: string
  public rottenTomatoesScore: number
  public runtimeInMinutes: number

  public constructor(movie: IMovie) {
    this.id = movie.id
    this.academyAwardNominations = movie.academyAwardNominations
    this.academyAwardWins = movie.academyAwardWins
    this.boxOfficeRevenueInMillions = movie.boxOfficeRevenueInMillions
    this.budgetInMillions = movie.budgetInMillions
    this.name = movie.name
    this.rottenTomatoesScore = movie.rottenTomatoesScore
    this.runtimeInMinutes = movie.runtimeInMinutes
  }
}