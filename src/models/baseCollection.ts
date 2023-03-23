import { ApiOptions, createApi, CreateApi } from '@/services/createApi'

export abstract class BaseCollection<T extends { id: string }> {
  protected readonly api: CreateApi
  protected totalPages: number = Infinity
  protected currentPage: number = 0
  public readonly collection: T[] = []

  public get hasLoaded(): boolean {
    return this.currentPage > 0
  }

  public get hasMorePages(): boolean {
    return this.currentPage < this.totalPages
  }

  public constructor(apiOptions: ApiOptions) {
    this.api = createApi(apiOptions)
  }

  public async getById(id: string): Promise<T | undefined> {
    const existing = this.collection.find(record => record.id === id)

    if (existing) {
      return existing
    }

    const record = await this.loadById(id)

    if (!record) {
      return undefined
    }

    this.collection.push(record)

    return record
  }

  public async getList(): Promise<T[]> {
    if (this.hasLoaded) {
      return this.collection
    }

    return await this.getNextPage()
  }

  public async getNextPage(): Promise<T[]> {
    if (!this.hasMorePages) {
      return []
    }

    const { data, page, pages } = await this.loadNextPage()

    this.collection.push(...data)
    this.currentPage = page
    this.totalPages = pages

    return data
  }

  protected abstract loadById(id: string): Promise<T | undefined>
  protected abstract loadNextPage(): Promise<{
    data: T[],
    page: number,
    pages: number,
  }>
}