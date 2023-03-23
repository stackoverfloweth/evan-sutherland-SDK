import { PaginatedRequest } from '@/types/pagination'
import { SortRequest } from '@/types/sorting'

export type RequestParams<T extends Record<string, unknown>> = {
  pagination?: PaginatedRequest,
  sorting?: SortRequest<T>,
}