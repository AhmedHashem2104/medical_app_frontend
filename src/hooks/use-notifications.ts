import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '@/api/notifications'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'

export function useNotifications(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => getNotifications(params),
    staleTime: 30_000,
    refetchInterval: 30_000,
    placeholderData: (prev) => prev,
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
