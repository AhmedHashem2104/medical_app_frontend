import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockSchedulesPaginated, mockSchedules } from '@/mock/data'
import type { Schedule, CreateSchedulePayload, UpdateSchedulePayload } from '@/types/schedule'
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

export async function getSchedulesByUser(userId: string): Promise<Schedule[]> {
  if (MOCK_ENABLED) {
    return mockDelay(mockSchedules.filter((s) => s.doctorId === userId))
  }
  const { data } = await api.get(`/schedules/user/${userId}`)
  return data
}

// Super-admin only
export async function createSchedule(payload: CreateSchedulePayload): Promise<Schedule> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockSchedules[0], id: `sch_mock_${Date.now()}` })
  }
  const { data } = await api.post('/schedules', payload)
  return data
}

// Super-admin only
export async function updateSchedule(id: string, payload: UpdateSchedulePayload): Promise<Schedule> {
  if (MOCK_ENABLED) {
    const schedule = mockSchedules.find((s) => s.id === id) ?? mockSchedules[0]
    return mockDelay({ ...schedule, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/schedules/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteSchedule(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/schedules/${id}`)
}
