import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockProfiles } from '@/mock/data'
import type { Profile, CreateProfilePayload, UpdateProfilePayload } from '@/types/profile'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getProfiles(params: ListParams): Promise<PaginatedResponse<Profile>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay({
      data: mockProfiles,
      total: mockProfiles.length,
      page: 1,
      limit: 20,
      totalPages: 1,
    })
  }
  const { data } = await api.get('/profiles', { params })
  return data
}

export async function getProfile(id: string): Promise<Profile> {
  if (MOCK_ENABLED) {
    const profile = mockProfiles.find((p) => p.id === id) ?? mockProfiles[0]
    return mockDelay(profile)
  }
  const { data } = await api.get(`/profiles/${id}`)
  return data
}

export async function getProfileByUser(userId: string): Promise<Profile> {
  if (MOCK_ENABLED) {
    const profile = mockProfiles.find((p) => p.userId === userId) ?? mockProfiles[0]
    return mockDelay(profile)
  }
  const { data } = await api.get(`/profiles/user/${userId}`)
  return data
}

// Super-admin only
export async function createProfile(payload: CreateProfilePayload): Promise<Profile> {
  if (MOCK_ENABLED) {
    void payload
    const now = new Date().toISOString()
    return mockDelay({ ...mockProfiles[0], id: `prf_mock_${Date.now()}`, createdAt: now, updatedAt: now })
  }
  const { data } = await api.post('/profiles', payload)
  return data
}

// Super-admin only
export async function updateProfile(id: string, payload: UpdateProfilePayload): Promise<Profile> {
  if (MOCK_ENABLED) {
    const profile = mockProfiles.find((p) => p.id === id) ?? mockProfiles[0]
    return mockDelay({ ...profile, updatedAt: new Date().toISOString() })
  }
  const { data } = await api.put(`/profiles/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteProfile(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/profiles/${id}`)
}
