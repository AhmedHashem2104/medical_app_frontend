import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getHistories, getHistory, getHistoriesByUser, createHistory, updateHistory, deleteHistory } from '@/api/history'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateHistoryPayload, UpdateHistoryPayload } from '@/types/history'

export function useHistories(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.histories.list(params),
    queryFn: () => getHistories(params),
    staleTime: 5 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useHistoryRecord(id: string) {
  return useQuery({
    queryKey: queryKeys.histories.detail(id),
    queryFn: () => getHistory(id),
    enabled: !!id,
  })
}

export function useHistoriesByUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.histories.byUser(userId),
    queryFn: () => getHistoriesByUser(userId),
    enabled: !!userId,
  })
}

export function useCreateHistory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateHistoryPayload) => createHistory(payload),
    onSuccess: () => {
      toast.success('History record created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.histories.all })
    },
    onError: () => toast.error('Failed to create history record.'),
  })
}

export function useUpdateHistory(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateHistoryPayload) => updateHistory(id, payload),
    onSuccess: () => {
      toast.success('History record updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.histories.all })
    },
    onError: () => toast.error('Failed to update history record.'),
  })
}

export function useDeleteHistory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteHistory(id),
    onSuccess: () => {
      toast.success('History record deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.histories.all })
    },
    onError: () => toast.error('Failed to delete history record.'),
  })
}
