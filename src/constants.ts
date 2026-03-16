// ─────────────────────────────────────────────────────────────────────────────
// App-wide constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Toggle mock mode.
 * true  → all API calls return local mock data instantly (no network needed)
 * false → real HTTP requests are made to VITE_API_URL
 */
export const MOCK_ENABLED = true

/**
 * Simulated network delay in ms when MOCK_ENABLED = true.
 * Set to 0 to make mocks instant.
 */
export const MOCK_DELAY_MS = 400

export const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000'

export const APP_NAME = 'MedAdmin'

export const DEFAULT_PAGE_SIZE = 20

export const NOTIFICATION_POLL_INTERVAL_MS = 30_000
export const SCHEDULE_POLL_INTERVAL_MS = 60_000
export const DASHBOARD_POLL_INTERVAL_MS = 5 * 60_000
