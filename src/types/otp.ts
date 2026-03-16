export const OTP_TYPE = {
  email: 'EMAIL',
  sms: 'SMS',
} as const

export type OtpType = (typeof OTP_TYPE)[keyof typeof OTP_TYPE]

export interface Otp {
  id: string
  userId: string
  otp: string
  type: OtpType
  expiresAt: string
  createdAt: string
}

export interface CreateOtpPayload {
  userId: string
  otp: string
  type: OtpType
  expiresAt: string
}

export interface UpdateOtpPayload {
  userId?: string
  otp?: string
  type?: OtpType
  expiresAt?: string
}
