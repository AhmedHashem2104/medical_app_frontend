/**
 * Utility that wraps mock data with a simulated delay.
 * Import this instead of using setTimeout directly.
 */
import { MOCK_DELAY_MS } from '@/constants'

export function mockDelay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), MOCK_DELAY_MS))
}
