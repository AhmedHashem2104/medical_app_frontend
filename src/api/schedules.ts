import { api } from '@/lib/axios'
import type { Schedule } from '@/types/schedule'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getSchedules(params: ListParams): Promise<PaginatedResponse<Schedule>> {
  const { data } = await api.get('/schedules', { params })
  return data
}

export async function getSchedule(id: string): Promise<Schedule> {
  const { data } = await api.get(`/schedules/${id}`)
  return data
}
