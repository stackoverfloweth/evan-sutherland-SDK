export type SortDirection = 'asc' | 'desc'
export type SortableKeys<T extends Record<PropertyKey, unknown>, K = string & Exclude<keyof T, '_id'>> = K

export type SortRequest<T extends Record<PropertyKey, unknown>> = {
  sort?: `${SortableKeys<T>}:${SortDirection}`,
}