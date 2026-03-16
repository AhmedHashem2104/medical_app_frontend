import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockTransactionsPaginated, mockTransactions } from '@/mock/data'
import type { Transaction } from '@/types/transaction'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getTransactions(params: ListParams): Promise<PaginatedResponse<Transaction>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockTransactionsPaginated)
  }
  const { data } = await api.get('/transactions', { params })
  return data
}

export async function getTransaction(id: string): Promise<Transaction> {
  if (MOCK_ENABLED) {
    const txn = mockTransactions.find((t) => t.id === id) ?? mockTransactions[0]
    return mockDelay(txn)
  }
  const { data } = await api.get(`/transactions/${id}`)
  return data
}
