export interface History {
  id: string
  userId: string
  organizationId: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateHistoryPayload {
  userId: string
  organizationId: string
}

export interface UpdateHistoryPayload {
  userId?: string
  organizationId?: string
}
