import type { ListParams } from '@/types/api'

export const queryKeys = {
  users: {
    all: ['users'] as const,
    list: (params: ListParams) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', id] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    detail: (userId: string) => ['profiles', userId] as const,
  },
  organizations: {
    all: ['organizations'] as const,
    list: (params: ListParams) => ['organizations', 'list', params] as const,
    detail: (id: string) => ['organizations', id] as const,
  },
  schedules: {
    all: ['schedules'] as const,
    list: (params: ListParams) => ['schedules', 'list', params] as const,
    detail: (id: string) => ['schedules', id] as const,
  },
  visits: {
    all: ['visits'] as const,
    list: (params: ListParams) => ['visits', 'list', params] as const,
    detail: (id: string) => ['visits', id] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    list: (params: ListParams) => ['transactions', 'list', params] as const,
    detail: (id: string) => ['transactions', id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    list: (params: ListParams) => ['notifications', 'list', params] as const,
    unread: () => ['notifications', 'unread'] as const,
  },
  dashboard: {
    stats: () => ['dashboard', 'stats'] as const,
    appointments: (period: string) => ['dashboard', 'appointments', period] as const,
    paymentStatus: () => ['dashboard', 'payment-status'] as const,
  },
} as const
