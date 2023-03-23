import { FilterRequest } from '@/types/filtering'

export function buildFilterQuery<T extends Record<string, unknown>>(filterRequest?: FilterRequest<T>): string {
  const queryStrings: string[] = []

  filterRequest?.match?.forEach(([param, value]) => {
    queryStrings.push(`${param}=${value}`)
  })

  filterRequest?.negate?.forEach(([param, value]) => {
    queryStrings.push(`${param}!=${value}`)
  })

  filterRequest?.include?.forEach(([param, value]) => {
    queryStrings.push(`${param}=${value.join(',')}`)
  })

  filterRequest?.exclude?.forEach(([param, value]) => {
    queryStrings.push(`${param}!=${value.join(',')}`)
  })

  filterRequest?.exists?.forEach((param) => {
    queryStrings.push(`${param}`)
  })

  filterRequest?.notExists?.forEach((param) => {
    queryStrings.push(`!${param}`)
  })

  filterRequest?.regex?.forEach(([param, value]) => {
    queryStrings.push(`${param}=${value.toString()}`)
  })

  filterRequest?.lessThan?.forEach(([param, value]) => {
    queryStrings.push(`${param}<${value}`)
  })

  filterRequest?.lessThanOrEqual?.forEach(([param, value]) => {
    queryStrings.push(`${param}<=${value}`)
  })

  filterRequest?.greaterThan?.forEach(([param, value]) => {
    queryStrings.push(`${param}>${value}`)
  })

  filterRequest?.greaterThanOrEqual?.forEach(([param, value]) => {
    queryStrings.push(`${param}>=${value}`)
  })


  return queryStrings.join('&')
}