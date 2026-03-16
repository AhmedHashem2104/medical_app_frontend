import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockVisitsPaginated, mockVisits } from '@/mock/data'
import type { Visit } from '@/types/visit'
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
