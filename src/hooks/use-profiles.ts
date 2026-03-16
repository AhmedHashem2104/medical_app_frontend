import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getProfiles, getProfile, getProfileByUser, createProfile, updateProfile, deleteProfile } from '@/api/profiles'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateProfilePayload, UpdateProfilePayload } from '@/types/profile'

export function useProfiles(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.profiles.list(params),
    queryFn: () => getProfiles(params),
    staleTime: 5 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.profiles.detail(id),
    queryFn: () => getProfile(id),
    enabled: !!id,
  })
}

export function useProfileByUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.profiles.byUser(userId),
    queryFn: () => getProfileByUser(userId),
    enabled: !!userId,
  })
}

export function useCreateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProfilePayload) => createProfile(payload),
    onSuccess: () => {
      toast.success('Profile created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all })
    },
    onError: () => toast.error('Failed to create profile.'),
  })
}

export function useUpdateProfile(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(id, payload),
    onSuccess: () => {
      toast.success('Profile updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all })
    },
    onError: () => toast.error('Failed to update profile.'),
  })
}

export function useDeleteProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProfile(id),
    onSuccess: () => {
      toast.success('Profile deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all })
    },
    onError: () => toast.error('Failed to delete profile.'),
  })
}
