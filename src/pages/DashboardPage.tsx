import { Users, Building2, Activity, DollarSign } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { AppointmentsChart } from '@/components/dashboard/AppointmentsChart'
import { PaymentStatusChart } from '@/components/dashboard/PaymentStatusChart'
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable'
import { useDashboardStats } from '@/hooks/use-dashboard'
import { useNotifications } from '@/hooks/use-notifications'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

function NotificationsPanel() {
  const { data, isLoading } = useNotifications({ page: 1, limit: 5 })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : data?.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notifications</p>
        ) : (
          <div className="space-y-3">
            {data?.data.map((n) => (
              <div key={n.id} className="flex items-start gap-2 text-sm">
                <div className="flex-1">
                  <p className={`font-medium ${n.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(n.createdAt), 'MMM d, h:mm a')}
                  </p>
                </div>
                {!n.isRead && <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats()

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your medical admin system" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={stats?.totalPatients ?? 0}
          delta={stats?.patientsGrowth}
          icon={Users}
          isLoading={isLoading}
        />
        <StatsCard
          title="Organizations"
          value={stats?.totalOrganizations ?? 0}
          delta={stats?.orgsGrowth}
          icon={Building2}
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Visits"
          value={stats?.totalVisits ?? 0}
          delta={stats?.visitsGrowth}
          icon={Activity}
          isLoading={isLoading}
        />
        <StatsCard
          title="Revenue"
          value={stats?.totalRevenue ?? 0}
          delta={stats?.revenueGrowth}
          icon={DollarSign}
          isLoading={isLoading}
          prefix="$"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AppointmentsChart />
        </div>
        <div>
          <PaymentStatusChart />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityTable />
        </div>
        <div>
          <NotificationsPanel />
        </div>
      </div>
    </div>
  )
}
