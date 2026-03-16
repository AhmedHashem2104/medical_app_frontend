export const PAYMENT_STATUS = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
  refunded: 'refunded',
} as const

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS]

export interface Transaction {
  id: string
  visitId?: string
  patientId: string
  organizationId: string
  amount: number
  currency: string
  paymentStatus: PaymentStatus
  paymentMethod?: string
  transactionRef?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTransactionPayload {
  amount: string
  user_id: string
  organization_id: string
  payment_status?: PaymentStatus
}

export interface UpdateTransactionPayload {
  amount?: string
  user_id?: string
  organization_id?: string
  payment_status?: PaymentStatus
}
