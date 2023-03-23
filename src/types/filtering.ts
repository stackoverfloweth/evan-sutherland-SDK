export type FilterableKeys<T extends Record<PropertyKey, unknown>, K = string & Exclude<keyof T, '_id'>> = K

export type FilterRequest<T extends Record<PropertyKey, unknown>> = {
  match?: [FilterableKeys<T>, string][],
  negate?: [FilterableKeys<T>, string][],
  include?: [FilterableKeys<T>, string[]][],
  exclude?: [FilterableKeys<T>, string[]][],
  exists?: FilterableKeys<T>[],
  notExists?: FilterableKeys<T>[],
  regex?: [FilterableKeys<T>, RegExp | string][],
  lessThan?: [FilterableKeys<T>, number][],
  lessThanOrEqual?: [FilterableKeys<T>, number][],
  greaterThan?: [FilterableKeys<T>, number][],
  greaterThanOrEqual?: [FilterableKeys<T>, number][],
}