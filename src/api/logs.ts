import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockLogs } from '@/mock/data'
import type { Log, CreateLogPayload, UpdateLogPayload } from '@/types/log'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getLogs(params: ListParams): Promise<PaginatedResponse<Log>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay({
      data: mockLogs,
      total: mockLogs.length,
      page: 1,
      limit: 20,
      totalPages: 1,
    })
  }
  const { data } = await api.get('/logs', { params })
  return data
}

export async function getLog(id: string): Promise<Log> {
  if (MOCK_ENABLED) {
    const log = mockLogs.find((l) => l.id === id) ?? mockLogs[0]
    return mockDelay(log)
  }
  const { data } = await api.get(`/logs/${id}`)
  return data
}

// Super-admin only
export async function createLog(payload: CreateLogPayload): Promise<Log> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ id: `log_mock_${Date.now()}`, createdAt: new Date().toISOString() })
  }
  const { data } = await api.post('/logs', payload)
  return data
}

// Super-admin only
export async function updateLog(id: string, payload: UpdateLogPayload): Promise<Log> {
  if (MOCK_ENABLED) {
    const log = mockLogs.find((l) => l.id === id) ?? mockLogs[0]
    return mockDelay({ ...log, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/logs/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteLog(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/logs/${id}`)
}
