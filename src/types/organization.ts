export interface Organization {
  id: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  services?: Record<string, unknown>
  appointments?: Record<string, unknown>
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateOrganizationPayload {
  name: string
  location: string
  services?: Record<string, unknown>
  appointments?: Record<string, unknown>
}

export interface UpdateOrganizationPayload {
  name?: string
  location?: string
  services?: Record<string, unknown>
  appointments?: Record<string, unknown>
}
