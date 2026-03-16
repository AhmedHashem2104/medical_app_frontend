import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockOtps } from '@/mock/data'
import type { Otp, CreateOtpPayload, UpdateOtpPayload } from '@/types/otp'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getOtps(params: ListParams): Promise<PaginatedResponse<Otp>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay({
      data: mockOtps,
      total: mockOtps.length,
      page: 1,
      limit: 20,
      totalPages: 1,
    })
  }
  const { data } = await api.get('/otps', { params })
  return data
}

export async function getOtp(id: string): Promise<Otp> {
  if (MOCK_ENABLED) {
    const otp = mockOtps.find((o) => o.id === id) ?? mockOtps[0]
    return mockDelay(otp)
  }
  const { data } = await api.get(`/otps/${id}`)
  return data
}

export async function getOtpsByUser(userId: string): Promise<Otp[]> {
  if (MOCK_ENABLED) {
    return mockDelay(mockOtps.filter((o) => o.userId === userId))
  }
  const { data } = await api.get(`/otps/user/${userId}`)
  return data
}

// Super-admin only
export async function createOtp(payload: CreateOtpPayload): Promise<Otp> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({ id: `otp_mock_${Date.now()}`, ...payload, createdAt: new Date().toISOString() })
  }
  const { data } = await api.post('/otps', payload)
  return data
}

// Super-admin only
export async function updateOtp(id: string, payload: UpdateOtpPayload): Promise<Otp> {
  if (MOCK_ENABLED) {
    const otp = mockOtps.find((o) => o.id === id) ?? mockOtps[0]
    return mockDelay({ ...otp, ...payload })
  }
  const { data } = await api.put(`/otps/${id}`, payload)
  return data
}

// Super-admin only
export async function deleteOtp(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/otps/${id}`)
}
