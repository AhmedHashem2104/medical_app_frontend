export const GENDER = {
  male: 'male',
  female: 'female',
  other: 'other',
  preferNotToSay: 'prefer_not_to_say',
} as const

export type Gender = (typeof GENDER)[keyof typeof GENDER]

export interface Profile {
  id: string
  userId: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  gender?: Gender
  address?: string
  city?: string
  country?: string
  avatarUrl?: string
  socials?: Record<string, string>
  createdAt: string
  updatedAt: string
}

export interface CreateProfilePayload {
  user_id: string
  socials?: Record<string, string>
  national_id?: string
  birth_date?: string
  img?: string
  gender?: Gender
  extra?: Record<string, unknown>
}

export interface UpdateProfilePayload {
  user_id?: string
  socials?: Record<string, string>
  national_id?: string
  birth_date?: string
  img?: string
  gender?: Gender
  extra?: Record<string, unknown>
}
