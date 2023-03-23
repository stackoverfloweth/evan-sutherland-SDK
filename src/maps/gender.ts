import { MapFunction } from '@/services/mapper'
import { Gender, isGender } from '@/types/gender'
import { GenderResponse } from '@/types/genderResponse'

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