import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockTransactionsPaginated, mockTransactions } from '@/mock/data'
import type { Transaction, CreateTransactionPayload, UpdateTransactionPayload } from '@/types/transaction'
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

export async function getTransactionsByUser(userId: string): Promise<Transaction[]> {
  if (MOCK_ENABLED) {
    return mockDelay(mockTransactions.filter((t) => t.patientId === userId))
  }
  const { data } = await api.get(`/transactions/user/${userId}`)
  return data
}

// Super-admin only
export async function createTransaction(payload: CreateTransactionPayload): Promise<Transaction> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockTransactions[0], id: `txn_mock_${Date.now()}` })
  }
  const { data } = await api.post('/transactions', payload)
  return data
}

// Super-admin only
export async function updateTransaction(id: string, payload: UpdateTransactionPayload): Promise<Transaction> {
  if (MOCK_ENABLED) {
    const txn = mockTransactions.find((t) => t.id === id) ?? mockTransactions[0]
    return mockDelay({ ...txn, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/transactions/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteTransaction(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/transactions/${id}`)
}
