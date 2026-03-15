import { api } from '@/lib/axios'

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
  const { data } = await api.get('/dashboard/stats')
  return data
}

export async function getAppointmentsOverTime(period: '7d' | '30d' | '90d'): Promise<AppointmentDataPoint[]> {
  const { data } = await api.get('/dashboard/appointments', { params: { period } })
  return data
}

export async function getPaymentStatusBreakdown(): Promise<PaymentStatusData[]> {
  const { data } = await api.get('/dashboard/payment-status')
  return data
}
