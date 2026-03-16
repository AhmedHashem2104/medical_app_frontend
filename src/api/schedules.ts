import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockSchedulesPaginated, mockSchedules } from '@/mock/data'
import type { Schedule } from '@/types/schedule'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getSchedules(params: ListParams): Promise<PaginatedResponse<Schedule>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockSchedulesPaginated)
  }
  const { data } = await api.get('/schedules', { params })
  return data
}

export async function getSchedule(id: string): Promise<Schedule> {
  if (MOCK_ENABLED) {
    const schedule = mockSchedules.find((s) => s.id === id) ?? mockSchedules[0]
    return mockDelay(schedule)
  }
  const { data } = await api.get(`/schedules/${id}`)
  return data
}
