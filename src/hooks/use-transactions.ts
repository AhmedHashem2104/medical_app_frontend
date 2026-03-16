import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getTransactions,
  getTransaction,
  getTransactionsByUser,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/api/transactions'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateTransactionPayload, UpdateTransactionPayload } from '@/types/transaction'

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

export function useTransactionsByUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.transactions.byUser(userId),
    queryFn: () => getTransactionsByUser(userId),
    enabled: !!userId,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => createTransaction(payload),
    onSuccess: () => {
      toast.success('Transaction created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
    onError: () => toast.error('Failed to create transaction.'),
  })
}

export function useUpdateTransaction(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateTransactionPayload) => updateTransaction(id, payload),
    onSuccess: () => {
      toast.success('Transaction updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
    onError: () => toast.error('Failed to update transaction.'),
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      toast.success('Transaction deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all })
    },
    onError: () => toast.error('Failed to delete transaction.'),
  })
}
