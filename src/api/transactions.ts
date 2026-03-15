import { api } from '@/lib/axios'
import type { Transaction } from '@/types/transaction'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getTransactions(params: ListParams): Promise<PaginatedResponse<Transaction>> {
  const { data } = await api.get('/transactions', { params })
  return data
}

export async function getTransaction(id: string): Promise<Transaction> {
  const { data } = await api.get(`/transactions/${id}`)
  return data
}
