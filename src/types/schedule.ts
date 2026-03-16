export interface Schedule {
  id: string
  organizationId: string
  doctorId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  slotDurationMinutes: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateSchedulePayload {
  user_id: string
  organization_id: string
}

export interface UpdateSchedulePayload {
  user_id?: string
  organization_id?: string
}
