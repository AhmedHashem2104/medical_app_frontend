import type { Profile } from './profile'

export interface User {
  id: string
  email: string
  phone?: string
  role: 'admin' | 'doctor' | 'staff' | 'patient'
  isActive: boolean
  isVerified: boolean
  createdAt: string
  updatedAt: string
  profile?: Profile
}

export interface CreateUserPayload {
  email: string
  phone?: string
  password: string
  role: User['role']
}

export interface UpdateUserPayload {
  email?: string
  phone?: string
  role?: User['role']
  isActive?: boolean
}
