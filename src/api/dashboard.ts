import { api } from '@/lib/axios'
import { MOCK_ENABLED } from '@/constants'
import { mockDelay } from '@/mock'
import {
  mockDashboardStats,
  mockAppointments7d,
  mockAppointments30d,
  mockAppointments90d,
  mockPaymentStatus,
} from '@/mock/data'

export interface DashboardStats {
  totalPatients: number
  totalOrganizations: number
  totalVisits: number
  totalRevenue: number
  patientsGrowth: number
  orgsGrowth: number
  visitsGrowth: number
  revenueGrowth: number
}

export interface AppointmentDataPoint {
  date: string
  count: number
}

export interface PaymentStatusData {
  status: string
  count: number
  amount: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (MOCK_ENABLED) return mockDelay(mockDashboardStats)
  const { data } = await api.get('/dashboard/stats')
  return data
}

export async function getAppointmentsOverTime(period: '7d' | '30d' | '90d'): Promise<AppointmentDataPoint[]> {
  if (MOCK_ENABLED) {
    const map = { '7d': mockAppointments7d, '30d': mockAppointments30d, '90d': mockAppointments90d }
    return mockDelay(map[period])
  }
  const { data } = await api.get('/dashboard/appointments', { params: { period } })
  return data
}

export async function getPaymentStatusBreakdown(): Promise<PaymentStatusData[]> {
  if (MOCK_ENABLED) return mockDelay(mockPaymentStatus)
  const { data } = await api.get('/dashboard/payment-status')
  return data
}
