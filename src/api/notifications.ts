import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockNotificationsPaginated, mockNotifications } from '@/mock/data'
import type { Notification, CreateNotificationPayload, UpdateNotificationPayload } from '@/types/notification'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getNotifications(params: ListParams): Promise<PaginatedResponse<Notification>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockNotificationsPaginated)
  }
  const { data } = await api.get('/notifications', { params })
  return data
}

export async function getNotification(id: string): Promise<Notification> {
  if (MOCK_ENABLED) {
    const notif = mockNotifications.find((n) => n.id === id) ?? mockNotifications[0]
    return mockDelay(notif)
  }
  const { data } = await api.get(`/notifications/${id}`)
  return data
}

// Super-admin only
export async function createNotification(payload: CreateNotificationPayload): Promise<Notification> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockNotifications[0], id: `ntf_mock_${Date.now()}` })
  }
  const { data } = await api.post('/notifications', payload)
  return data
}

// Super-admin only
export async function updateNotification(id: string, payload: UpdateNotificationPayload): Promise<Notification> {
  if (MOCK_ENABLED) {
    const notif = mockNotifications.find((n) => n.id === id) ?? mockNotifications[0]
    return mockDelay({ ...notif, ...payload })
  }
  const { data } = await api.put(`/notifications/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteNotification(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/notifications/${id}`)
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
