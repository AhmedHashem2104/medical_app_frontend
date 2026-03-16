import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import { mockCategoriesPaginated, mockCategories } from '@/mock/data'
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '@/types/category'
import type { PaginatedResponse, ListParams } from '@/types/api'

export async function getCategories(params: ListParams): Promise<PaginatedResponse<Category>> {
  if (MOCK_ENABLED) {
    void params
    return mockDelay(mockCategoriesPaginated)
  }
  const { data } = await api.get('/categories', { params })
  return data
}

export async function getCategory(id: string): Promise<Category> {
  if (MOCK_ENABLED) {
    const cat = mockCategories.find((c) => c.id === id) ?? mockCategories[0]
    return mockDelay(cat)
  }
  const { data } = await api.get(`/categories/${id}`)
  return data
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  if (MOCK_ENABLED) {
    void payload
    const now = new Date().toISOString()
    return mockDelay({ id: `cat_mock_${Date.now()}`, isActive: true, createdAt: now, updatedAt: now, ...payload })
  }
  const { data } = await api.post('/categories', payload)
  return data
}

export async function updateCategory(id: string, payload: UpdateCategoryPayload): Promise<Category> {
  if (MOCK_ENABLED) {
    const cat = mockCategories.find((c) => c.id === id) ?? mockCategories[0]
    return mockDelay({ ...cat, ...payload })
  }
  const { data } = await api.patch(`/categories/${id}`, payload)
  return data
}

export async function deleteCategory(id: string): Promise<void> {
  if (MOCK_ENABLED) {
    void id
    return mockDelay(undefined)
  }
  await api.delete(`/categories/${id}`)
}
