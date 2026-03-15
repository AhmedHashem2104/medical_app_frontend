import { api } from '@/lib/axios'
import type { User, CreateUserPayload, UpdateUserPayload } from '@/types/user'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getUsers(params: ListParams): Promise<PaginatedResponse<User>> {
  const { data } = await api.get('/users', { params })
  return data
}

export async function getUser(id: string): Promise<User> {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const { data } = await api.post('/users', payload)
  return data
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
  const { data } = await api.patch(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`)
}
