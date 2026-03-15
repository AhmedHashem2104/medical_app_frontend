import { useQuery } from '@tanstack/react-query'
import { getSchedules, getSchedule } from '@/api/schedules'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'

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
