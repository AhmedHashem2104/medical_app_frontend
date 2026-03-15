import { api } from '@/lib/axios'
import type { Organization } from '@/types/organization'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getOrganizations(params: ListParams): Promise<PaginatedResponse<Organization>> {
  const { data } = await api.get('/organizations', { params })
  return data
}

export async function getOrganization(id: string): Promise<Organization> {
  const { data } = await api.get(`/organizations/${id}`)
  return data
}

export async function createOrganization(payload: Partial<Organization>): Promise<Organization> {
  const { data } = await api.post('/organizations', payload)
  return data
}

export async function updateOrganization(id: string, payload: Partial<Organization>): Promise<Organization> {
  const { data } = await api.patch(`/organizations/${id}`, payload)
  return data
}
