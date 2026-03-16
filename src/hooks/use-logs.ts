import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getLogs, getLog, createLog, updateLog, deleteLog } from '@/api/logs'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateLogPayload, UpdateLogPayload } from '@/types/log'

export function useLogs(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.logs.list(params),
    queryFn: () => getLogs(params),
    staleTime: 2 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useLog(id: string) {
  return useQuery({
    queryKey: queryKeys.logs.detail(id),
    queryFn: () => getLog(id),
    enabled: !!id,
  })
}

export function useCreateLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLogPayload) => createLog(payload),
    onSuccess: () => {
      toast.success('Log created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.logs.all })
    },
    onError: () => toast.error('Failed to create log.'),
  })
}

export function useUpdateLog(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateLogPayload) => updateLog(id, payload),
    onSuccess: () => {
      toast.success('Log updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.logs.all })
    },
    onError: () => toast.error('Failed to update log.'),
  })
}

export function useDeleteLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteLog(id),
    onSuccess: () => {
      toast.success('Log deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.logs.all })
    },
    onError: () => toast.error('Failed to delete log.'),
  })
}
