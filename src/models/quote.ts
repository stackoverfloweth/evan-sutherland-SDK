export interface IQuote {
  id: string,
  character: string,
  dialog: string,
  movie: string,
}

export class Quote implements IQuote {
  public readonly id: string
  public character: string
  public dialog: string
  public movie: string

  public constructor(quote: IQuote) {
    this.id = quote.id
    this.character = quote.character
    this.dialog = quote.dialog
    this.movie = quote.movie
  }
}