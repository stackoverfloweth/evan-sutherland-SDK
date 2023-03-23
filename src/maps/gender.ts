import { MapFunction } from '@/services'
import { Gender, GenderResponse, isGender } from '@/types'

export const mapGenderResponseToGender: MapFunction<GenderResponse, Gender | undefined> = function(source) {
  if (source === undefined) {
    return undefined
  }

  const lowercase = source.toLowerCase()

  if (isGender(lowercase)) {
    return lowercase
  }

  return undefined
}