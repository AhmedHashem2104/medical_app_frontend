import { api } from '@/lib/axios'
import type { Visit } from '@/types/visit'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getVisits(params: ListParams): Promise<PaginatedResponse<Visit>> {
  const { data } = await api.get('/visits', { params })
  return data
}

export async function getVisit(id: string): Promise<Visit> {
  const { data } = await api.get(`/visits/${id}`)
  return data
}
