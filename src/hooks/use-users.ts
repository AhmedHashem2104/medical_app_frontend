import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUsers, getUser, updateUser, deleteUser } from '@/api/users'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { UpdateUserPayload } from '@/types/user'

export function useUsers(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => getUsers(params),
    staleTime: 2 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(id, payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(id) })
      const previous = queryClient.getQueryData(queryKeys.users.detail(id))
      queryClient.setQueryData(queryKeys.users.detail(id), (old: unknown) => ({
        ...(old as object),
        ...payload,
      }))
      return { previous }
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.users.detail(id), context.previous)
      }
      toast.error('Failed to update user.')
    },
    onSuccess: () => {
      toast.success('User updated successfully.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully.')
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
    },
    onError: () => {
      toast.error('Failed to delete user.')
    },
  })
}
