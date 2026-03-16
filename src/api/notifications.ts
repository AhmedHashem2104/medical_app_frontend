import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockNotificationsPaginated } from '@/mock/data'
import type { Notification } from '@/types/notification'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getNotifications(params: ListParams): Promise<PaginatedResponse<Notification>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockNotificationsPaginated)
  }
  const { data } = await api.get('/notifications', { params })
  return data
}

export async function markNotificationRead(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.patch(`/notifications/${id}/read`)
}

export async function markAllNotificationsRead(): Promise<void> {
  if (MOCK_ENABLED) return mockDelay(undefined)
  await api.patch('/notifications/read-all')
}
