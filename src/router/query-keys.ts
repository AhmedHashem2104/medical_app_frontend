import type { ListParams } from '@/types/api'

export const queryKeys = {
  users: {
    all: ['users'] as const,
    list: (params: ListParams) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', id] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    list: (params: ListParams) => ['profiles', 'list', params] as const,
    detail: (id: string) => ['profiles', id] as const,
    byUser: (userId: string) => ['profiles', 'user', userId] as const,
  },
  organizations: {
    all: ['organizations'] as const,
    list: (params: ListParams) => ['organizations', 'list', params] as const,
    detail: (id: string) => ['organizations', id] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    list: (params: ListParams) => ['transactions', 'list', params] as const,
    detail: (id: string) => ['transactions', id] as const,
    byUser: (userId: string) => ['transactions', 'user', userId] as const,
  },
  histories: {
    all: ['histories'] as const,
    list: (params: ListParams) => ['histories', 'list', params] as const,
    detail: (id: string) => ['histories', id] as const,
    byUser: (userId: string) => ['histories', 'user', userId] as const,
  },
  logs: {
    all: ['logs'] as const,
    list: (params: ListParams) => ['logs', 'list', params] as const,
    detail: (id: string) => ['logs', id] as const,
  },
  otps: {
    all: ['otps'] as const,
    list: (params: ListParams) => ['otps', 'list', params] as const,
    detail: (id: string) => ['otps', id] as const,
    byUser: (userId: string) => ['otps', 'user', userId] as const,
  },
  schedules: {
    all: ['schedules'] as const,
    list: (params: ListParams) => ['schedules', 'list', params] as const,
    detail: (id: string) => ['schedules', id] as const,
    byUser: (userId: string) => ['schedules', 'user', userId] as const,
  },
  visits: {
    all: ['visits'] as const,
    list: (params: ListParams) => ['visits', 'list', params] as const,
    detail: (id: string) => ['visits', id] as const,
    bySchedule: (scheduleId: string) => ['visits', 'schedule', scheduleId] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    list: (params: ListParams) => ['notifications', 'list', params] as const,
    detail: (id: string) => ['notifications', id] as const,
    unread: () => ['notifications', 'unread'] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (params: ListParams) => ['categories', 'list', params] as const,
    detail: (id: string) => ['categories', id] as const,
  },
  dashboard: {
    stats: () => ['dashboard', 'stats'] as const,
    appointments: (period: string) => ['dashboard', 'appointments', period] as const,
    paymentStatus: () => ['dashboard', 'payment-status'] as const,
  },
} as const
