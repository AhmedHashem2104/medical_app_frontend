import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockOrganizationsPaginated, mockOrganizations } from '@/mock/data'
import type { Organization } from '@/types/organization'
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

export async function createOrganization(payload: Partial<Organization>): Promise<Organization> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockOrganizations[0], id: `org_mock_${Date.now()}` })
  }
  const { data } = await api.post('/organizations', payload)
  return data
}

export async function updateOrganization(id: string, payload: Partial<Organization>): Promise<Organization> {
  if (MOCK_ENABLED) {
    const org = mockOrganizations.find((o) => o.id === id) ?? mockOrganizations[0]
    return mockDelay({ ...org, ...payload })
  }
  const { data } = await api.patch(`/organizations/${id}`, payload)
  return data
}
