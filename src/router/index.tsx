/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './protected-route'
import { AppShell } from '@/components/layout/AppShell'
import { PageSkeleton } from '@/components/common/PageSkeleton'

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const OtpPage = lazy(() => import('@/pages/OtpPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const UsersPage = lazy(() => import('@/pages/UsersPage'))
const UserDetailPage = lazy(() => import('@/pages/UserDetailPage'))
const OrganizationsPage = lazy(() => import('@/pages/OrganizationsPage'))
const OrganizationDetailPage = lazy(() => import('@/pages/OrganizationDetailPage'))
const SchedulesPage = lazy(() => import('@/pages/SchedulesPage'))
const ScheduleDetailPage = lazy(() => import('@/pages/ScheduleDetailPage'))
const VisitsPage = lazy(() => import('@/pages/VisitsPage'))
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'))
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
  },
  {
    path: '/verify-otp',
    element: withSuspense(<OtpPage />),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: withSuspense(<DashboardPage />) },
          { path: 'users', element: withSuspense(<UsersPage />) },
          { path: 'users/:id', element: withSuspense(<UserDetailPage />) },
          { path: 'organizations', element: withSuspense(<OrganizationsPage />) },
          { path: 'organizations/:id', element: withSuspense(<OrganizationDetailPage />) },
          { path: 'schedules', element: withSuspense(<SchedulesPage />) },
          { path: 'schedules/:id', element: withSuspense(<ScheduleDetailPage />) },
          { path: 'visits', element: withSuspense(<VisitsPage />) },
          { path: 'transactions', element: withSuspense(<TransactionsPage />) },
          { path: 'notifications', element: withSuspense(<NotificationsPage />) },
          { path: 'profile', element: withSuspense(<ProfilePage />) },
        ],
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />),
  },
])
