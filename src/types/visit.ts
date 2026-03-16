export const VISIT_STATUS = {
  scheduled: 'scheduled',
  inProgress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
  noShow: 'no_show',
} as const

export type VisitStatus = (typeof VISIT_STATUS)[keyof typeof VISIT_STATUS]

export interface Visit {
  id: string
  patientId: string
  doctorId: string
  organizationId: string
  scheduleId?: string
  status: VisitStatus
  scheduledAt: string
  startedAt?: string
  completedAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateVisitPayload {
  schedule_id: string
}

export interface UpdateVisitPayload {
  schedule_id?: string
}
