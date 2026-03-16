export interface Log {
  id: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateLogPayload {
  [key: string]: unknown
}

export interface UpdateLogPayload {
  [key: string]: unknown
}
