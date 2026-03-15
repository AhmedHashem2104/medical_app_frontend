import { useQuery } from '@tanstack/react-query'
import { getVisits, getVisit } from '@/api/visits'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'

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
