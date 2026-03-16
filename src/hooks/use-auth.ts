import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { login, phoneLogin, verifyOtp, resendOtp, logout } from '@/api/auth'
import { useAuthStore } from '@/store/auth-store'
import type { LoginPayload, PhoneLoginPayload, VerifyOtpPayload } from '@/api/auth'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data, variables) => {
      if (data.requiresOtp && data.userId) {
        navigate('/verify-otp', { state: { userId: data.userId, email: variables.email } })
      } else if (data.token && data.userId && data.role) {
        useAuthStore.getState().setAuth(data.token, data.userId, data.role as 'super_admin' | 'admin' | 'doctor' | 'staff')
        navigate('/dashboard')
      }
    },
    onError: () => {
      toast.error('Login failed. Please check your credentials.')
    },
  })
}

export function usePhoneLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: PhoneLoginPayload) => phoneLogin(payload),
    onSuccess: (data, variables) => {
      if (data.requiresOtp && data.userId) {
        navigate('/verify-otp', { state: { userId: data.userId, phone: variables.phone } })
      } else if (data.token && data.userId && data.role) {
        useAuthStore.getState().setAuth(data.token, data.userId, data.role as 'super_admin' | 'admin' | 'doctor' | 'staff')
        navigate('/dashboard')
      }
    },
    onError: () => {
      toast.error('Phone login failed. Please check your number and try again.')
    },
  })
}

export function useVerifyOtp() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: (data) => {
      setAuth(data.token, data.userId, data.role as 'super_admin' | 'admin' | 'doctor' | 'staff')
      navigate('/dashboard')
    },
    onError: () => {
      toast.error('Invalid OTP. Please try again.')
    },
  })
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (userId: string) => resendOtp(userId),
    onSuccess: () => {
      toast.success('OTP resent successfully.')
    },
    onError: () => {
      toast.error('Failed to resend OTP.')
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuth()
      navigate('/login')
    },
  })
}
