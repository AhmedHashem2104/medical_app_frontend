import { useQuery } from '@tanstack/react-query'
import { getTransactions, getTransaction } from '@/api/transactions'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'

export function useTransactions(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.transactions.list(params),
    queryFn: () => getTransactions(params),
    staleTime: 5 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => getTransaction(id),
    enabled: !!id,
  })
}
