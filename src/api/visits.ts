import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockVisitsPaginated, mockVisits } from '@/mock/data'
import type { Visit, CreateVisitPayload, UpdateVisitPayload } from '@/types/visit'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getVisits(params: ListParams): Promise<PaginatedResponse<Visit>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockVisitsPaginated)
  }
  const { data } = await api.get('/visits', { params })
  return data
}

export async function getVisit(id: string): Promise<Visit> {
  if (MOCK_ENABLED) {
    const visit = mockVisits.find((v) => v.id === id) ?? mockVisits[0]
    return mockDelay(visit)
  }
  const { data } = await api.get(`/visits/${id}`)
  return data
}

export async function getVisitsBySchedule(scheduleId: string): Promise<Visit[]> {
  if (MOCK_ENABLED) {
    return mockDelay(mockVisits.filter((v) => v.scheduleId === scheduleId))
  }
  const { data } = await api.get(`/visits/schedule/${scheduleId}`)
  return data
}

// Super-admin only
export async function createVisit(payload: CreateVisitPayload): Promise<Visit> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockVisits[0], id: `vis_mock_${Date.now()}` })
  }
  const { data } = await api.post('/visits', payload)
  return data
}

// Super-admin only
export async function updateVisit(id: string, payload: UpdateVisitPayload): Promise<Visit> {
  if (MOCK_ENABLED) {
    const visit = mockVisits.find((v) => v.id === id) ?? mockVisits[0]
    return mockDelay({ ...visit, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/visits/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteVisit(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/visits/${id}`)
}
