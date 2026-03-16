import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  markNotificationRead,
  markAllNotificationsRead,
} from '@/api/notifications'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateNotificationPayload, UpdateNotificationPayload } from '@/types/notification'

export function useNotifications(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => getNotifications(params),
    staleTime: 30_000,
    refetchInterval: 30_000,
    placeholderData: (prev) => prev,
  })
}

export function useNotification(id: string) {
  return useQuery({
    queryKey: queryKeys.notifications.detail(id),
    queryFn: () => getNotification(id),
    enabled: !!id,
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) => createNotification(payload),
    onSuccess: () => {
      toast.success('Notification created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
    onError: () => toast.error('Failed to create notification.'),
  })
}

export function useUpdateNotification(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateNotificationPayload) => updateNotification(id, payload),
    onSuccess: () => {
      toast.success('Notification updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
    onError: () => toast.error('Failed to update notification.'),
  })
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      toast.success('Notification deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
    onError: () => toast.error('Failed to delete notification.'),
  })
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
    onError: () => {
      toast.error('Failed to mark notification as read.')
    },
  })
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      toast.success('All notifications marked as read.')
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
    onError: () => {
      toast.error('Failed to mark all as read.')
    },
  })
}
