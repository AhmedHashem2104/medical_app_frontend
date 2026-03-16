import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { getMockLoginResponse, getMockVerifyOtpResponse } from '@/mock/data'

export interface SignUpPayload {
  name: string
  email: string
  phone_number: string
  password: string
}

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

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface SignInResponse {
  token: string
  user: AuthUser
}

export async function signup(payload: SignUpPayload): Promise<SignInResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({
      token: 'mock_jwt_token_abc123',
      user: { id: 'usr_admin_001', name: payload.name, email: payload.email },
    })
  }
  const { data } = await api.post('/auth/signup', payload)
  return data.data
}

export async function signin(payload: LoginPayload): Promise<SignInResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay({
      token: 'mock_jwt_token_abc123',
      user: { id: 'usr_admin_001', name: 'Admin', email: payload.email },
    })
  }
  const { data } = await api.post('/auth/signin', payload)
  return data.data
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(getMockLoginResponse())
  }
  const { data } = await api.post('/auth/signin', payload)
  return data
}

export async function phoneLogin(payload: PhoneLoginPayload): Promise<LoginResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(getMockLoginResponse())
  }
  const { data } = await api.post('/auth/phone-login', payload)
  return data
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  if (MOCK_ENABLED) {
    void payload
    return mockDelay(getMockVerifyOtpResponse())
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
