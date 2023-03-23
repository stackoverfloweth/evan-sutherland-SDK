import { FilterRequest } from '@/types/filtering'
import { PaginatedRequest } from '@/types/pagination'
import { SortRequest } from '@/types/sorting'

export type RequestParams<T extends Record<PropertyKey, unknown>> = PaginatedRequest & SortRequest<T> & {
  filter?: FilterRequest<T>,
}