export const genders = ['female', 'male', 'males', 'most likely male'] as const
export type Gender = typeof genders[number]

export function isGender(value: unknown): value is Gender {
  return genders.includes(value as Gender)
}