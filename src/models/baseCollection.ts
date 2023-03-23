import { ApiOptions, createApi, CreateApi } from '@/services/createApi'

export abstract class BaseCollection<T> {
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

  public abstract loadMore(): Promise<T[]>
}