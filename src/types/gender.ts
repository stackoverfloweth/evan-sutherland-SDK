export const genders = ['Female', 'Male', 'Males', 'Most likely male'] as const
export type Gender = typeof genders[number]