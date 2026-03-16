import { subDays, format, subHours, subMinutes } from 'date-fns'
import type { User } from '@/types/user'
import type { Profile } from '@/types/profile'
import type { Organization } from '@/types/organization'
import type { Schedule } from '@/types/schedule'
import type { Visit } from '@/types/visit'
import type { Transaction } from '@/types/transaction'
import type { Notification } from '@/types/notification'
import type { Category } from '@/types/category'
import type { History } from '@/types/history'
import type { Log } from '@/types/log'
import type { Otp } from '@/types/otp'
import type { PaginatedResponse } from '@/types/api'
import type { DashboardStats, AppointmentDataPoint, PaymentStatusData } from '@/api/dashboard'
import type { LoginResponse, VerifyOtpResponse } from '@/api/auth'

// ─── Mock credential quick-fill ───────────────────────────────────────────────

export interface MockCredential {
  id: string
  label: string
  role: string
  email: string
  password: string
  phone: string
}

export const MOCK_CREDENTIALS: MockCredential[] = [
  { id: 'usr_000', label: 'Super Admin', role: 'super_admin', email: 'superadmin@medapp.io', password: 'password123', phone: '+1 555-0100' },
  { id: 'usr_001', label: 'Admin', role: 'admin', email: 'admin@medapp.io', password: 'password123', phone: '+1 555-0101' },
  { id: 'usr_002', label: 'Dr. Sarah Chen', role: 'doctor', email: 'dr.sarah.chen@medapp.io', password: 'password123', phone: '+1 555-0102' },
  { id: 'usr_004', label: 'Emily Watson', role: 'staff', email: 'nurse.emily@medapp.io', password: 'password123', phone: '+1 555-0104' },
  { id: 'usr_006', label: 'John Doe', role: 'patient', email: 'john.doe@example.com', password: 'password123', phone: '+1 555-0106' },
]

let _mockSelectedUserId = 'usr_000'

export function setMockSelectedUserId(id: string): void {
  _mockSelectedUserId = id
}

export function getMockLoginResponse(): LoginResponse {
  return { requiresOtp: true, userId: _mockSelectedUserId }
}

export function getMockVerifyOtpResponse(): VerifyOtpResponse {
  const cred = MOCK_CREDENTIALS.find((c) => c.id === _mockSelectedUserId) ?? MOCK_CREDENTIALS[0]
  return {
    token: `mock_jwt_token_${cred.role}`,
    userId: cred.id,
    role: cred.role,
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export const mockLoginResponse: LoginResponse = {
  requiresOtp: true,
  userId: 'usr_admin_001',
}

export const mockPhoneLoginResponse: LoginResponse = {
  requiresOtp: true,
  userId: 'usr_admin_001',
}

export const mockVerifyOtpResponse: VerifyOtpResponse = {
  token: 'mock_jwt_token_abc123',
  userId: 'usr_admin_001',
  role: 'admin',
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const mockDashboardStats: DashboardStats = {
  totalPatients: 4_821,
  totalOrganizations: 38,
  totalVisits: 1_204,
  totalRevenue: 287_450,
  patientsGrowth: 12.4,
  orgsGrowth: 5.2,
  visitsGrowth: 8.7,
  revenueGrowth: 15.1,
}

export const mockAppointments7d: AppointmentDataPoint[] = Array.from({ length: 7 }, (_, i) => ({
  date: format(subDays(new Date(), 6 - i), 'yyyy-MM-dd'),
  count: Math.floor(Math.random() * 60) + 30,
}))

export const mockAppointments30d: AppointmentDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'yyyy-MM-dd'),
  count: Math.floor(Math.random() * 80) + 20,
}))

export const mockAppointments90d: AppointmentDataPoint[] = Array.from({ length: 90 }, (_, i) => ({
  date: format(subDays(new Date(), 89 - i), 'yyyy-MM-dd'),
  count: Math.floor(Math.random() * 100) + 10,
}))

export const mockPaymentStatus: PaymentStatusData[] = [
  { status: 'completed', count: 874, amount: 218_500 },
  { status: 'pending', count: 213, amount: 53_250 },
  { status: 'failed', count: 87, amount: 21_750 },
  { status: 'refunded', count: 30, amount: 7_500 },
]

// ─── Users ───────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  { id: 'usr_000', email: 'superadmin@medapp.io', phone: '+1 555-0100', role: 'super_admin', isActive: true, isVerified: true, createdAt: subDays(new Date(), 730).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_001', email: 'admin@medapp.io', phone: '+1 555-0101', role: 'admin', isActive: true, isVerified: true, createdAt: subDays(new Date(), 365).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_002', email: 'dr.sarah.chen@medapp.io', phone: '+1 555-0102', role: 'doctor', isActive: true, isVerified: true, createdAt: subDays(new Date(), 300).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_003', email: 'dr.james.miller@medapp.io', phone: '+1 555-0103', role: 'doctor', isActive: true, isVerified: true, createdAt: subDays(new Date(), 280).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_004', email: 'nurse.emily@medapp.io', phone: '+1 555-0104', role: 'staff', isActive: true, isVerified: true, createdAt: subDays(new Date(), 250).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_005', email: 'receptionist@medapp.io', phone: '+1 555-0105', role: 'staff', isActive: true, isVerified: false, createdAt: subDays(new Date(), 200).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_006', email: 'john.doe@example.com', phone: '+1 555-0106', role: 'patient', isActive: true, isVerified: true, createdAt: subDays(new Date(), 180).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_007', email: 'jane.smith@example.com', phone: '+1 555-0107', role: 'patient', isActive: true, isVerified: true, createdAt: subDays(new Date(), 160).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_008', email: 'robert.brown@example.com', phone: '+1 555-0108', role: 'patient', isActive: false, isVerified: true, createdAt: subDays(new Date(), 140).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_009', email: 'dr.angela@medapp.io', phone: '+1 555-0109', role: 'doctor', isActive: true, isVerified: true, createdAt: subDays(new Date(), 120).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_010', email: 'david.wilson@example.com', phone: '+1 555-0110', role: 'patient', isActive: true, isVerified: false, createdAt: subDays(new Date(), 100).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_011', email: 'maria.garcia@example.com', phone: '+1 555-0111', role: 'patient', isActive: true, isVerified: true, createdAt: subDays(new Date(), 90).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'usr_012', email: 'tech.support@medapp.io', phone: '+1 555-0112', role: 'staff', isActive: true, isVerified: true, createdAt: subDays(new Date(), 60).toISOString(), updatedAt: new Date().toISOString() },
]

export const mockUsersPaginated: PaginatedResponse<User> = {
  data: mockUsers,
  total: mockUsers.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Organizations ───────────────────────────────────────────────────────────

export const mockOrganizations: Organization[] = [
  { id: 'org_001', name: 'City General Hospital', description: 'A leading multi-specialty hospital serving the metro area.', address: '123 Medical Blvd, New York, NY 10001', phone: '+1 212-555-0201', email: 'info@citygeneralhospital.com', website: 'https://citygeneralhospital.com', services: { cardiology: true, neurology: true, orthopedics: true, pediatrics: true }, appointments: { online: true, walkin: true }, isActive: true, createdAt: subDays(new Date(), 500).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'org_002', name: 'Sunrise Medical Clinic', description: 'Family medicine and general practice clinic.', address: '456 Wellness Ave, Brooklyn, NY 11201', phone: '+1 718-555-0202', email: 'hello@sunrisemedical.com', isActive: true, services: { familyMedicine: true, vaccination: true }, appointments: { online: true }, createdAt: subDays(new Date(), 400).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'org_003', name: 'Metro Dental Center', description: 'Full-service dental care for all ages.', address: '789 Smile St, Queens, NY 11354', phone: '+1 347-555-0203', email: 'appointments@metrodental.com', isActive: true, services: { generalDentistry: true, orthodontics: true, oralSurgery: true }, appointments: { online: true, walkin: false }, createdAt: subDays(new Date(), 350).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'org_004', name: 'Heart & Vascular Institute', description: 'Specialized cardiovascular care and surgery.', address: '321 Cardio Way, Manhattan, NY 10022', phone: '+1 212-555-0204', email: 'contact@heartinstitute.com', website: 'https://heartinstitute.com', isActive: true, services: { cardiology: true, vascularSurgery: true, cardiacRehab: true }, appointments: { online: false, walkin: false, referralOnly: true }, createdAt: subDays(new Date(), 300).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'org_005', name: 'Pediatric Care Center', description: 'Dedicated children\'s healthcare from birth to 18.', address: '654 Kids Lane, Bronx, NY 10451', phone: '+1 718-555-0205', email: 'kids@pediatriccenter.com', isActive: true, services: { pediatrics: true, vaccination: true, developmentalPediatrics: true }, appointments: { online: true }, createdAt: subDays(new Date(), 250).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'org_006', name: 'Mind & Wellness Center', description: 'Mental health and psychiatric services.', address: '987 Calm Rd, Staten Island, NY 10301', phone: '+1 718-555-0206', email: 'wellness@mindcenter.com', isActive: false, services: { psychiatry: true, counseling: true, groupTherapy: true }, appointments: { online: true }, createdAt: subDays(new Date(), 200).toISOString(), updatedAt: new Date().toISOString() },
]

export const mockOrganizationsPaginated: PaginatedResponse<Organization> = {
  data: mockOrganizations,
  total: mockOrganizations.length,
  page: 1,
  limit: 12,
  totalPages: 1,
}

// ─── Schedules ───────────────────────────────────────────────────────────────

export const mockSchedules: Schedule[] = [
  { id: 'sch_001', organizationId: 'org_001', doctorId: 'usr_002', dayOfWeek: 1, startTime: '08:00', endTime: '16:00', slotDurationMinutes: 30, isActive: true, createdAt: subDays(new Date(), 100).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'sch_002', organizationId: 'org_001', doctorId: 'usr_002', dayOfWeek: 3, startTime: '08:00', endTime: '16:00', slotDurationMinutes: 30, isActive: true, createdAt: subDays(new Date(), 100).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'sch_003', organizationId: 'org_001', doctorId: 'usr_003', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', slotDurationMinutes: 20, isActive: true, createdAt: subDays(new Date(), 90).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'sch_004', organizationId: 'org_002', doctorId: 'usr_009', dayOfWeek: 4, startTime: '10:00', endTime: '18:00', slotDurationMinutes: 15, isActive: true, createdAt: subDays(new Date(), 80).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'sch_005', organizationId: 'org_003', doctorId: 'usr_003', dayOfWeek: 5, startTime: '08:00', endTime: '14:00', slotDurationMinutes: 45, isActive: false, createdAt: subDays(new Date(), 70).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'sch_006', organizationId: 'org_004', doctorId: 'usr_002', dayOfWeek: 6, startTime: '09:00', endTime: '13:00', slotDurationMinutes: 60, isActive: true, createdAt: subDays(new Date(), 60).toISOString(), updatedAt: new Date().toISOString() },
]

export const mockSchedulesPaginated: PaginatedResponse<Schedule> = {
  data: mockSchedules,
  total: mockSchedules.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Visits ──────────────────────────────────────────────────────────────────

export const mockVisits: Visit[] = [
  { id: 'vis_001', patientId: 'usr_006', doctorId: 'usr_002', organizationId: 'org_001', scheduleId: 'sch_001', status: 'completed', scheduledAt: subHours(new Date(), 48).toISOString(), startedAt: subHours(new Date(), 48).toISOString(), completedAt: subHours(new Date(), 47).toISOString(), createdAt: subDays(new Date(), 3).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'vis_002', patientId: 'usr_007', doctorId: 'usr_003', organizationId: 'org_001', status: 'scheduled', scheduledAt: subHours(new Date(), -2).toISOString(), createdAt: subDays(new Date(), 1).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'vis_003', patientId: 'usr_008', doctorId: 'usr_009', organizationId: 'org_002', status: 'cancelled', scheduledAt: subDays(new Date(), 1).toISOString(), createdAt: subDays(new Date(), 5).toISOString(), updatedAt: subDays(new Date(), 1).toISOString() },
  { id: 'vis_004', patientId: 'usr_010', doctorId: 'usr_002', organizationId: 'org_001', scheduleId: 'sch_002', status: 'in_progress', scheduledAt: subMinutes(new Date(), 30).toISOString(), startedAt: subMinutes(new Date(), 15).toISOString(), createdAt: subDays(new Date(), 1).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'vis_005', patientId: 'usr_011', doctorId: 'usr_003', organizationId: 'org_003', status: 'no_show', scheduledAt: subDays(new Date(), 2).toISOString(), createdAt: subDays(new Date(), 7).toISOString(), updatedAt: subDays(new Date(), 2).toISOString() },
  { id: 'vis_006', patientId: 'usr_006', doctorId: 'usr_009', organizationId: 'org_002', status: 'completed', scheduledAt: subDays(new Date(), 7).toISOString(), startedAt: subDays(new Date(), 7).toISOString(), completedAt: subDays(new Date(), 7).toISOString(), createdAt: subDays(new Date(), 10).toISOString(), updatedAt: subDays(new Date(), 7).toISOString() },
  { id: 'vis_007', patientId: 'usr_007', doctorId: 'usr_002', organizationId: 'org_004', status: 'scheduled', scheduledAt: subHours(new Date(), -24).toISOString(), createdAt: subDays(new Date(), 2).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'vis_008', patientId: 'usr_010', doctorId: 'usr_003', organizationId: 'org_001', status: 'completed', scheduledAt: subDays(new Date(), 14).toISOString(), startedAt: subDays(new Date(), 14).toISOString(), completedAt: subDays(new Date(), 14).toISOString(), createdAt: subDays(new Date(), 15).toISOString(), updatedAt: subDays(new Date(), 14).toISOString() },
]

export const mockVisitsPaginated: PaginatedResponse<Visit> = {
  data: mockVisits,
  total: mockVisits.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export const mockTransactions: Transaction[] = [
  { id: 'txn_001', visitId: 'vis_001', patientId: 'usr_006', organizationId: 'org_001', amount: 250, currency: 'USD', paymentStatus: 'completed', paymentMethod: 'credit_card', transactionRef: 'REF-001-ABC', createdAt: subDays(new Date(), 3).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_002', visitId: 'vis_006', patientId: 'usr_006', organizationId: 'org_002', amount: 120, currency: 'USD', paymentStatus: 'completed', paymentMethod: 'insurance', transactionRef: 'REF-002-DEF', createdAt: subDays(new Date(), 7).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_003', visitId: 'vis_008', patientId: 'usr_010', organizationId: 'org_001', amount: 450, currency: 'USD', paymentStatus: 'pending', paymentMethod: 'bank_transfer', createdAt: subDays(new Date(), 14).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_004', visitId: 'vis_003', patientId: 'usr_008', organizationId: 'org_002', amount: 75, currency: 'USD', paymentStatus: 'failed', paymentMethod: 'credit_card', createdAt: subDays(new Date(), 1).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_005', visitId: 'vis_005', patientId: 'usr_011', organizationId: 'org_003', amount: 180, currency: 'USD', paymentStatus: 'refunded', paymentMethod: 'credit_card', transactionRef: 'REF-005-GHI', createdAt: subDays(new Date(), 2).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_006', patientId: 'usr_007', organizationId: 'org_001', amount: 320, currency: 'USD', paymentStatus: 'completed', paymentMethod: 'debit_card', transactionRef: 'REF-006-JKL', createdAt: subDays(new Date(), 5).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'txn_007', patientId: 'usr_011', organizationId: 'org_004', amount: 890, currency: 'USD', paymentStatus: 'completed', paymentMethod: 'insurance', transactionRef: 'REF-007-MNO', createdAt: subDays(new Date(), 10).toISOString(), updatedAt: new Date().toISOString() },
]

export const mockTransactionsPaginated: PaginatedResponse<Transaction> = {
  data: mockTransactions,
  total: mockTransactions.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Notifications ─────────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  { id: 'ntf_001', userId: 'usr_001', title: 'New appointment booked', message: 'A new appointment has been scheduled for tomorrow at 9:00 AM.', type: 'appointment', isRead: false, createdAt: subMinutes(new Date(), 5).toISOString() },
  { id: 'ntf_002', userId: 'usr_001', title: 'Payment received', message: 'Transaction #REF-001-ABC has been successfully processed.', type: 'billing', isRead: false, createdAt: subMinutes(new Date(), 30).toISOString() },
  { id: 'ntf_003', userId: 'usr_001', title: 'Schedule reminder', message: 'Dr. Chen has 3 appointments tomorrow. Please review the schedule.', type: 'reminder', isRead: false, createdAt: subHours(new Date(), 2).toISOString() },
  { id: 'ntf_004', userId: 'usr_001', title: 'System maintenance', message: 'Scheduled maintenance window: Sunday 2:00–4:00 AM UTC.', type: 'system', isRead: true, createdAt: subHours(new Date(), 6).toISOString() },
  { id: 'ntf_005', userId: 'usr_001', title: 'Patient registration', message: 'New patient registration has been submitted for review.', type: 'appointment', isRead: true, createdAt: subHours(new Date(), 12).toISOString() },
  { id: 'ntf_006', userId: 'usr_001', title: 'Payment failed', message: 'Transaction #txn_004 failed. Please contact the patient.', type: 'billing', isRead: true, createdAt: subDays(new Date(), 1).toISOString() },
  { id: 'ntf_007', userId: 'usr_001', title: 'Appointment cancelled', message: 'Visit vis_003 has been cancelled by the patient.', type: 'appointment', isRead: true, createdAt: subDays(new Date(), 1).toISOString() },
  { id: 'ntf_008', userId: 'usr_001', title: 'Monthly report ready', message: 'The monthly analytics report for last month is now available.', type: 'system', isRead: true, createdAt: subDays(new Date(), 2).toISOString() },
]

export const mockNotificationsPaginated: PaginatedResponse<Notification> = {
  data: mockNotifications,
  total: mockNotifications.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: 'cat_001', name: 'General Medicine', description: 'General medical consultations and primary care services', isActive: true, createdAt: subDays(new Date(), 300).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_002', name: 'Cardiology', description: 'Heart and cardiovascular system diagnosis and treatment', isActive: true, createdAt: subDays(new Date(), 290).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_003', name: 'Neurology', description: 'Disorders of the nervous system, brain, and spine', isActive: true, createdAt: subDays(new Date(), 280).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_004', name: 'Pediatrics', description: 'Medical care for infants, children, and adolescents', isActive: true, createdAt: subDays(new Date(), 270).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_005', name: 'Orthopedics', description: 'Musculoskeletal system conditions, injuries, and surgery', isActive: true, createdAt: subDays(new Date(), 260).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_006', name: 'Dentistry', description: 'Oral health, teeth, and gum care services', isActive: true, createdAt: subDays(new Date(), 250).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_007', name: 'Psychiatry', description: 'Mental health assessment and treatment', isActive: true, createdAt: subDays(new Date(), 240).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_008', name: 'Dermatology', description: 'Skin, hair, and nail conditions and treatments', isActive: true, createdAt: subDays(new Date(), 230).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_009', name: 'Ophthalmology', description: 'Eye diseases, vision care, and surgical procedures', isActive: false, createdAt: subDays(new Date(), 220).toISOString(), updatedAt: subDays(new Date(), 10).toISOString() },
  { id: 'cat_010', name: 'Radiology', description: 'Medical imaging including X-ray, MRI, and CT scans', isActive: true, createdAt: subDays(new Date(), 210).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_011', name: 'Emergency Medicine', description: 'Acute and critical care for life-threatening conditions', isActive: true, createdAt: subDays(new Date(), 200).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'cat_012', name: 'Nutrition & Dietetics', description: 'Dietary planning, nutritional therapy, and wellness programs', isActive: false, createdAt: subDays(new Date(), 190).toISOString(), updatedAt: subDays(new Date(), 30).toISOString() },
]

export const mockCategoriesPaginated: PaginatedResponse<Category> = {
  data: mockCategories,
  total: mockCategories.length,
  page: 1,
  limit: 20,
  totalPages: 1,
}

// ─── Profiles ─────────────────────────────────────────────────────────────────

export const mockProfiles: Profile[] = [
  { id: 'prf_001', userId: 'usr_001', firstName: 'Ahmed', lastName: 'Ali', gender: 'male', city: 'Cairo', country: 'Egypt', createdAt: subDays(new Date(), 365).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prf_002', userId: 'usr_002', firstName: 'Sarah', lastName: 'Chen', dateOfBirth: '1985-04-12', gender: 'female', city: 'New York', country: 'US', createdAt: subDays(new Date(), 300).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prf_003', userId: 'usr_003', firstName: 'James', lastName: 'Miller', dateOfBirth: '1979-09-23', gender: 'male', city: 'Boston', country: 'US', createdAt: subDays(new Date(), 280).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prf_004', userId: 'usr_004', firstName: 'Emily', lastName: 'Watson', dateOfBirth: '1991-02-17', gender: 'female', city: 'Chicago', country: 'US', createdAt: subDays(new Date(), 250).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prf_005', userId: 'usr_006', firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-07-04', gender: 'male', city: 'Los Angeles', country: 'US', createdAt: subDays(new Date(), 180).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'prf_006', userId: 'usr_007', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1988-11-30', gender: 'female', city: 'Houston', country: 'US', createdAt: subDays(new Date(), 160).toISOString(), updatedAt: new Date().toISOString() },
]

// ─── Histories ────────────────────────────────────────────────────────────────

export const mockHistories: History[] = [
  { id: 'hist_001', userId: 'usr_006', organizationId: 'org_001', createdAt: subDays(new Date(), 60).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'hist_002', userId: 'usr_006', organizationId: 'org_002', createdAt: subDays(new Date(), 30).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'hist_003', userId: 'usr_007', organizationId: 'org_001', createdAt: subDays(new Date(), 45).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'hist_004', userId: 'usr_008', organizationId: 'org_002', createdAt: subDays(new Date(), 20).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'hist_005', userId: 'usr_010', organizationId: 'org_003', createdAt: subDays(new Date(), 15).toISOString(), updatedAt: new Date().toISOString() },
  { id: 'hist_006', userId: 'usr_011', organizationId: 'org_004', createdAt: subDays(new Date(), 10).toISOString(), updatedAt: new Date().toISOString() },
]

// ─── Logs ─────────────────────────────────────────────────────────────────────

export const mockLogs: Log[] = [
  { id: 'log_001', createdAt: subMinutes(new Date(), 5).toISOString() },
  { id: 'log_002', createdAt: subMinutes(new Date(), 15).toISOString() },
  { id: 'log_003', createdAt: subHours(new Date(), 1).toISOString() },
  { id: 'log_004', createdAt: subHours(new Date(), 3).toISOString() },
  { id: 'log_005', createdAt: subDays(new Date(), 1).toISOString() },
]

// ─── OTPs ─────────────────────────────────────────────────────────────────────

export const mockOtps: Otp[] = [
  { id: 'otp_001', userId: 'usr_006', otp: '123456', type: 'EMAIL', expiresAt: subMinutes(new Date(), -30).toISOString(), createdAt: new Date().toISOString() },
  { id: 'otp_002', userId: 'usr_007', otp: '654321', type: 'SMS', expiresAt: subMinutes(new Date(), -15).toISOString(), createdAt: new Date().toISOString() },
  { id: 'otp_003', userId: 'usr_010', otp: '987654', type: 'EMAIL', expiresAt: subMinutes(new Date(), 10).toISOString(), createdAt: subMinutes(new Date(), 5).toISOString() },
]
