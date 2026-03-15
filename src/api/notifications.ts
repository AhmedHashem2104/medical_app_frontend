import { api } from '@/lib/axios'
import type { Notification } from '@/types/notification'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getNotifications(params: ListParams): Promise<PaginatedResponse<Notification>> {
  const { data } = await api.get('/notifications', { params })
  return data
}

export async function markNotificationRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}/read`)
}

export async function markAllNotificationsRead(): Promise<void> {
  await api.patch('/notifications/read-all')
}
