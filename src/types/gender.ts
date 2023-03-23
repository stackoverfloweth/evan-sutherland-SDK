export const genders = [
  'Female',
  'Male',
  'Males',
  'Most likely male',
] as const

// todo: this is incomplete, NaN and "male" are also in Api response type
export type Gender = typeof genders[number] | undefined