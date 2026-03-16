import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVisits } from '@/hooks/use-visits'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { VisitStatus } from '@/types/visit'

const STATUS_META: Record<VisitStatus, { label: string; dot: string; text: string; bg: string }> = {
  scheduled:   { label: 'Scheduled',   dot: 'bg-sky-500',     text: 'text-sky-700 dark:text-sky-300',     bg: 'bg-sky-500/10' },
  in_progress: { label: 'In Progress', dot: 'bg-amber-500',   text: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-500/10' },
  completed:   { label: 'Completed',   dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-500/10' },
  cancelled:   { label: 'Cancelled',   dot: 'bg-slate-400',   text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-500/10' },
  no_show:     { label: 'No Show',     dot: 'bg-red-500',     text: 'text-red-700 dark:text-red-300',     bg: 'bg-red-500/10' },
}

export function RecentActivityTable() {
  const { data, isLoading } = useVisits({ page: 1, limit: 8, sortBy: 'createdAt', sortOrder: 'desc' })

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="text-sm font-semibold">Recent Visits</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Latest patient visit activity</p>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        {isLoading ? (
          <div className="px-4 pt-3 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data?.data.map((visit) => {
              const meta = STATUS_META[visit.status]
              return (
                <div key={visit.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors">
                  {/* Dot indicator */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <span className={cn('h-2.5 w-2.5 rounded-full', meta.dot)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground font-mono truncate">#{visit.id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(visit.scheduledAt), 'MMM d · h:mm a')}</p>
                  </div>
                  <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0', meta.bg, meta.text)}>
                    {meta.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
