import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockUsersPaginated, mockUsers } from '@/mock/data'
import type { User, CreateUserPayload, UpdateUserPayload } from '@/types/user'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getUsers(params: ListParams): Promise<PaginatedResponse<User>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockUsersPaginated)
  }
  const { data } = await api.get('/users', { params })
  return data
}

export async function getUser(id: string): Promise<User> {
  if (MOCK_ENABLED) {
    const user = mockUsers.find((u) => u.id === id) ?? mockUsers[0]
    return mockDelay(user)
  }
  const { data } = await api.get(`/users/${id}`)
  return data
}

// Super-admin only
export async function createUser(payload: CreateUserPayload): Promise<User> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ ...mockUsers[0], id: `usr_mock_${Date.now()}` })
  }
  const { data } = await api.post('/users', payload)
  return data
}

// Super-admin only
export async function updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
  if (MOCK_ENABLED) {
    const user = mockUsers.find((u) => u.id === id) ?? mockUsers[0]
    return mockDelay({ ...user, ...payload })
  }
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteUser(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/users/${id}`)
}
