import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockHistories } from '@/mock/data'
import type { History, CreateHistoryPayload, UpdateHistoryPayload } from '@/types/history'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getHistories(params: ListParams): Promise<PaginatedResponse<History>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay({
      data: mockHistories,
      total: mockHistories.length,
      page: 1,
      limit: 20,
      totalPages: 1,
    })
  }
  const { data } = await api.get('/history', { params })
  return data
}

export async function getHistory(id: string): Promise<History> {
  if (MOCK_ENABLED) {
    const history = mockHistories.find((h) => h.id === id) ?? mockHistories[0]
    return mockDelay(history)
  }
  const { data } = await api.get(`/history/${id}`)
  return data
}

export async function getHistoriesByUser(userId: string): Promise<History[]> {
  if (MOCK_ENABLED) {
    return mockDelay(mockHistories.filter((h) => h.userId === userId))
  }
  const { data } = await api.get(`/history/user/${userId}`)
  return data
}

// Super-admin only
export async function createHistory(payload: CreateHistoryPayload): Promise<History> {
  if (MOCK_ENABLED) {
    void payload
    const now = new Date().toISOString()
    return mockDelay({ id: `hist_mock_${Date.now()}`, ...payload, createdAt: now, updatedAt: now })
  }
  const { data } = await api.post('/history', payload)
  return data
}

// Super-admin only
export async function updateHistory(id: string, payload: UpdateHistoryPayload): Promise<History> {
  if (MOCK_ENABLED) {
    const history = mockHistories.find((h) => h.id === id) ?? mockHistories[0]
    return mockDelay({ ...history, ...payload, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/history/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteHistory(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/history/${id}`)
}
