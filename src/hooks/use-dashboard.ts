import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getAppointmentsOverTime, getPaymentStatusBreakdown } from '@/api/dashboard'
import { queryKeys } from '@/router/query-keys'

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: getDashboardStats,
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  })
}

export function useAppointmentsOverTime(period: '7d' | '30d' | '90d') {
  return useQuery({
    queryKey: queryKeys.dashboard.appointments(period),
    queryFn: () => getAppointmentsOverTime(period),
    staleTime: 5 * 60_000,
  })
}

export function usePaymentStatusBreakdown() {
  return useQuery({
    queryKey: queryKeys.dashboard.paymentStatus(),
    queryFn: getPaymentStatusBreakdown,
    staleTime: 5 * 60_000,
  })
}
