export interface IBook {
  id: string,
  name: string,
}

export class Book implements IBook {
  public readonly id: string
  public name: string

  public constructor(book: IBook) {
    this.id = book.id
    this.name = book.name
  }
}