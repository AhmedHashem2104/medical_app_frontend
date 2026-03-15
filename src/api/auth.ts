import { api } from '@/lib/axios'

export interface LoginPayload {
  email: string
  password: string
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
  const { data } = await api.post('/auth/login', payload)
  return data
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  const { data } = await api.post('/auth/verify-otp', payload)
  return data
}

export async function resendOtp(userId: string): Promise<void> {
  await api.post('/auth/resend-otp', { userId })
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}
