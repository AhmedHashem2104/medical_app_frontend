import { Users, Building2, Activity, DollarSign, Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AppointmentsChart } from '@/components/dashboard/AppointmentsChart'
import { PaymentStatusChart } from '@/components/dashboard/PaymentStatusChart'
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable'
import { useDashboardStats } from '@/hooks/use-dashboard'
import { useNotifications } from '@/hooks/use-notifications'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const NOTIF_TYPE_DOT: Record<string, string> = {
  appointment: 'bg-sky-500',
  billing: 'bg-emerald-500',
  reminder: 'bg-amber-500',
  system: 'bg-slate-400',
}

function NotificationsPanel() {
  const { data, isLoading } = useNotifications({ page: 1, limit: 5 })

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {data?.data.filter((n) => !n.isRead).length ?? 0} unread
        </p>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        {isLoading ? (
          <div className="px-4 pt-3 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-2.5">
                <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : !data?.data.length ? (
          <p className="px-4 pt-4 text-sm text-muted-foreground">No notifications</p>
        ) : (
          <div className="divide-y divide-border">
            {data.data.map((n) => (
              <div key={n.id} className={cn('flex items-start gap-3 px-4 py-2.5 transition-colors', !n.isRead && 'bg-primary/[0.03]')}>
                <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', NOTIF_TYPE_DOT[n.type] ?? 'bg-slate-400')} />
                <div className="min-w-0 flex-1">
                  <p className={cn('text-xs truncate', n.isRead ? 'text-muted-foreground' : 'font-medium text-foreground')}>
                    {n.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  useDocumentTitle('Dashboard')
  const { data: stats, isLoading } = useDashboardStats()

  return (
    <div className="space-y-5">
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening today"
      />

      {/* Stats row */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Patients" value={stats?.totalPatients ?? 0} delta={stats?.patientsGrowth} icon={Users} isLoading={isLoading} color="purple" />
        <StatsCard title="Organizations" value={stats?.totalOrganizations ?? 0} delta={stats?.orgsGrowth} icon={Building2} isLoading={isLoading} color="blue" />
        <StatsCard title="Total Visits" value={stats?.totalVisits ?? 0} delta={stats?.visitsGrowth} icon={Activity} isLoading={isLoading} color="green" />
        <StatsCard title="Revenue" value={stats?.totalRevenue ?? 0} delta={stats?.revenueGrowth} icon={DollarSign} isLoading={isLoading} prefix="$" color="amber" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AppointmentsChart />
        </div>
        <PaymentStatusChart />
      </div>

      {/* Activity row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityTable />
        </div>
        <NotificationsPanel />
      </div>
    </div>
  )
}
