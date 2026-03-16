import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getSchedules,
  getSchedule,
  getSchedulesByUser,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '@/api/schedules'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateSchedulePayload, UpdateSchedulePayload } from '@/types/schedule'

export function useSchedules(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.schedules.list(params),
    queryFn: () => getSchedules(params),
    staleTime: 60_000,
    refetchInterval: 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useSchedule(id: string) {
  return useQuery({
    queryKey: queryKeys.schedules.detail(id),
    queryFn: () => getSchedule(id),
    enabled: !!id,
    staleTime: 60_000,
  })
}

export function useSchedulesByUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.schedules.byUser(userId),
    queryFn: () => getSchedulesByUser(userId),
    enabled: !!userId,
  })
}

export function useCreateSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateSchedulePayload) => createSchedule(payload),
    onSuccess: () => {
      toast.success('Schedule created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all })
    },
    onError: () => toast.error('Failed to create schedule.'),
  })
}

export function useUpdateSchedule(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateSchedulePayload) => updateSchedule(id, payload),
    onSuccess: () => {
      toast.success('Schedule updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all })
    },
    onError: () => toast.error('Failed to update schedule.'),
  })
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      toast.success('Schedule deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.schedules.all })
    },
    onError: () => toast.error('Failed to delete schedule.'),
  })
}
