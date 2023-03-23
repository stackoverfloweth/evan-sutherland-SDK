export type SortDirection = 'asc' | 'desc'
export type SortableKeys<T extends Record<string, unknown>, K = string & Exclude<keyof T, '_id'>> = K

export type SortRequest<T extends Record<string, unknown>> = {
  sort: `${SortableKeys<T>}:${SortDirection}`,
}