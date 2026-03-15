import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getOrganizations, getOrganization, updateOrganization } from '@/api/organizations'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { Organization } from '@/types/organization'

export function useOrganizations(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.organizations.list(params),
    queryFn: () => getOrganizations(params),
    staleTime: 10 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: queryKeys.organizations.detail(id),
    queryFn: () => getOrganization(id),
    enabled: !!id,
    staleTime: 10 * 60_000,
  })
}

export function useUpdateOrganization(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Partial<Organization>) => updateOrganization(id, payload),
    onSuccess: () => {
      toast.success('Organization updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all })
    },
    onError: () => {
      toast.error('Failed to update organization.')
    },
  })
}
