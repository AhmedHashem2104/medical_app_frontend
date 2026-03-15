export const NOTIFICATION_TYPE = {
  appointment: 'appointment',
  reminder: 'reminder',
  system: 'system',
  billing: 'billing',
} as const

export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE]

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  createdAt: string
}
