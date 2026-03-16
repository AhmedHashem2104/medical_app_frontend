import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '@/api/categories'
import { queryKeys } from '@/router/query-keys'
import type { ListParams } from '@/types/api'
import type { CreateCategoryPayload, UpdateCategoryPayload } from '@/types/category'

export function useCategories(params: ListParams) {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => getCategories(params),
    staleTime: 5 * 60_000,
    placeholderData: (prev) => prev,
  })
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => getCategory(id),
    enabled: !!id,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
    onSuccess: () => {
      toast.success('Category created.')
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
    },
    onError: () => toast.error('Failed to create category.'),
  })
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => updateCategory(id, payload),
    onSuccess: () => {
      toast.success('Category updated.')
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
    },
    onError: () => toast.error('Failed to update category.'),
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success('Category deleted.')
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all })
    },
    onError: () => toast.error('Failed to delete category.'),
  })
}
