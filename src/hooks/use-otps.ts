import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getOtps, getOtp, getOtpsByUser, createOtp, updateOtp, deleteOtp } from '@/api/otps'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateOtpPayload, UpdateOtpPayload } from '@/types/otp'

export function useOtps(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.otps.list(params),
    queryFn: () => getOtps(params),
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useOtp(id: string) {
  return useQuery({
    queryKey: queryKeys.otps.detail(id),
    queryFn: () => getOtp(id),
    enabled: !!id,
  })
}

export function useOtpsByUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.otps.byUser(userId),
    queryFn: () => getOtpsByUser(userId),
    enabled: !!userId,
  })
}

export function useCreateOtp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateOtpPayload) => createOtp(payload),
    onSuccess: () => {
      toast.success('OTP created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.otps.all })
    },
    onError: () => toast.error('Failed to create OTP.'),
  })
}

export function useUpdateOtp(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateOtpPayload) => updateOtp(id, payload),
    onSuccess: () => {
      toast.success('OTP updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.otps.all })
    },
    onError: () => toast.error('Failed to update OTP.'),
  })
}

export function useDeleteOtp() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteOtp(id),
    onSuccess: () => {
      toast.success('OTP deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.otps.all })
    },
    onError: () => toast.error('Failed to delete OTP.'),
  })
}
