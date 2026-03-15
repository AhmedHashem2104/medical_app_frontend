import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useVisits } from '@/hooks/use-visits'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { VisitStatus } from '@/types/visit'

const STATUS_STYLES: Record<VisitStatus, string> = {
  scheduled: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-yellow-50 text-yellow-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-gray-50 text-gray-700',
  no_show: 'bg-red-50 text-red-700',
}

export function RecentActivityTable() {
  const { data, isLoading } = useVisits({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Visits</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Visit ID</th>
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Scheduled</th>
                  <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((visit) => (
                  <tr key={visit.id} className="border-b border-border/50 last:border-0">
                    <td className="py-2 font-mono text-xs text-foreground">
                      {visit.id.slice(0, 8)}...
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {format(new Date(visit.scheduledAt), 'MMM d, h:mm a')}
                    </td>
                    <td className="py-2">
                      <Badge
                        variant="secondary"
                        className={cn('text-xs capitalize', STATUS_STYLES[visit.status])}
                      >
                        {visit.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
