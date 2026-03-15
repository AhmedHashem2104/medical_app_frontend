import axios from 'axios'
import { useAuthStore } from '@/store/auth-store'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // HIPAA: never log error.response.data (may contain PII)
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const url = error.config?.url
      console.error(`API error: ${status} ${url}`)

      if (status === 401) {
        useAuthStore.getState().clearAuth()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
