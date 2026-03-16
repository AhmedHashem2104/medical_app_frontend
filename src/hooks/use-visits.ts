import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getVisits,
  getVisit,
  getVisitsBySchedule,
  createVisit,
  updateVisit,
  deleteVisit,
} from '@/api/visits'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateVisitPayload, UpdateVisitPayload } from '@/types/visit'

export function useVisits(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.visits.list(params),
    queryFn: () => getVisits(params),
    staleTime: 3 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useVisit(id: string) {
  return useQuery({
    queryKey: queryKeys.visits.detail(id),
    queryFn: () => getVisit(id),
    enabled: !!id,
  })
}

export function useVisitsBySchedule(scheduleId: string) {
  return useQuery({
    queryKey: queryKeys.visits.bySchedule(scheduleId),
    queryFn: () => getVisitsBySchedule(scheduleId),
    enabled: !!scheduleId,
  })
}

export function useCreateVisit() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateVisitPayload) => createVisit(payload),
    onSuccess: () => {
      toast.success('Visit created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.visits.all })
    },
    onError: () => toast.error('Failed to create visit.'),
  })
}

export function useUpdateVisit(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateVisitPayload) => updateVisit(id, payload),
    onSuccess: () => {
      toast.success('Visit updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.visits.all })
    },
    onError: () => toast.error('Failed to update visit.'),
  })
}

export function useDeleteVisit() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteVisit(id),
    onSuccess: () => {
      toast.success('Visit deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.visits.all })
    },
    onError: () => toast.error('Failed to delete visit.'),
  })
}
