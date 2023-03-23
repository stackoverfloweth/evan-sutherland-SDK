export interface IQuote {
  id: string,
  characterId: string,
  dialog: string,
  movieId: string,
}

export class Quote implements IQuote {
  public readonly id: string
  public characterId: string
  public movieId: string
  public dialog: string

  public constructor(quote: IQuote) {
    this.id = quote.id
    this.characterId = quote.characterId
    this.movieId = quote.movieId
    this.dialog = quote.dialog
  }
}