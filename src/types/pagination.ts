export type PaginatedResponse<T> = {
  docs: T,
  limit: number,
  offset: number,
  page: number,
  pages: number,
  total: number,
}

export type PaginatedRequest = {
  limit?: number,
  page?: number,
  offset?: number,
}