import { useState, useTransition } from 'react'
import { format } from 'date-fns'
import { Bell, CheckCheck } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { useNotifications, useMarkAllNotificationsRead, useMarkNotificationRead } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'

export default function NotificationsPage() {
  const [page, setPage] = useState(1)
  const [, startTransition] = useTransition()

  const { data, isLoading } = useNotifications({ page, limit: 20 })
  const markAllRead = useMarkAllNotificationsRead()
  const markRead = useMarkNotificationRead()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with system notifications"
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
          >
            <CheckCheck size={14} className="mr-2" />
            Mark all read
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : !data?.data.length ? (
        <EmptyState
          icon={<Bell size={40} />}
          title="No notifications"
          description="You're all caught up!"
        />
      ) : (
        <div className="space-y-3">
          {data.data.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                'cursor-pointer transition-colors hover:border-primary/50',
                !notification.isRead && 'border-primary/30 bg-primary/5'
              )}
              onClick={() => {
                if (!notification.isRead) markRead.mutate(notification.id)
              }}
            >
              <CardContent className="flex items-start gap-3 pt-4 pb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm font-medium', notification.isRead ? 'text-muted-foreground' : 'text-foreground')}>
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(notification.createdAt), 'MMM d, yyyy · h:mm a')}
                  </p>
                </div>
                <Badge variant="secondary" className="capitalize text-xs shrink-0">
                  {notification.type}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => startTransition(() => setPage(page - 1))}>
            Previous
          </Button>
          <span className="flex items-center text-sm text-muted-foreground">
            {page} / {data.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => startTransition(() => setPage(page + 1))}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
