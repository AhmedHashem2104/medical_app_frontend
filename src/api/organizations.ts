import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockOrganizationsPaginated, mockOrganizations } from '@/mock/data'
import type { Organization, CreateOrganizationPayload, UpdateOrganizationPayload } from '@/types/organization'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getOrganizations(params: ListParams): Promise<PaginatedResponse<Organization>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockOrganizationsPaginated)
  }
  const { data } = await api.get('/organizations', { params })
  return data
}

export async function getOrganization(id: string): Promise<Organization> {
  if (MOCK_ENABLED) {
    const org = mockOrganizations.find((o) => o.id === id) ?? mockOrganizations[0]
    return mockDelay(org)
  }
  const { data } = await api.get(`/organizations/${id}`)
  return data
}

// Super-admin only
export async function createOrganization(payload: CreateOrganizationPayload): Promise<Organization> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockOrganizations[0], id: `org_mock_${Date.now()}` })
  }
  const { data } = await api.post('/organizations', payload)
  return data
}

// Super-admin only
export async function updateOrganization(id: string, payload: UpdateOrganizationPayload): Promise<Organization> {
  if (MOCK_ENABLED) {
    const org = mockOrganizations.find((o) => o.id === id) ?? mockOrganizations[0]
    return mockDelay({ ...org, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/organizations/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteOrganization(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/organizations/${id}`)
}
