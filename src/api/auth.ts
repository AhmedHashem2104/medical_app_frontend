import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockLoginResponse, mockPhoneLoginResponse, mockVerifyOtpResponse } from '@/mock/data'

export interface LoginPayload {
  email: string
  password: string
}

export interface PhoneLoginPayload {
  phone: string
}

export interface LoginResponse {
  requiresOtp: boolean
  userId?: string
  token?: string
  role?: string
}

export interface VerifyOtpPayload {
  userId: string
  otp: string
}

export interface VerifyOtpResponse {
  token: string
  userId: string
  role: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(mockLoginResponse)
  }
  const { data } = await api.post('/auth/login', payload)
  return data
}

export async function phoneLogin(payload: PhoneLoginPayload): Promise<LoginResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(mockPhoneLoginResponse)
  }
  const { data } = await api.post('/auth/phone-login', payload)
  return data
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(mockVerifyOtpResponse)
  }
  const { data } = await api.post('/auth/verify-otp', payload)
  return data
}

export async function resendOtp(userId: string): Promise<void> {
  if (MOCK_ENABLED) {
    void userId
    return mockDelay(undefined)
  }
  await api.post('/auth/resend-otp', { userId })
}

export async function logout(): Promise<void> {
  if (MOCK_ENABLED) return mockDelay(undefined)
  await api.post('/auth/logout')
}
