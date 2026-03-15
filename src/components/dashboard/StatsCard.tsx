import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  delta?: number
  icon: LucideIcon
  isLoading?: boolean
  prefix?: string
}

export function StatsCard({ title, value, delta, icon: Icon, isLoading, prefix }: StatsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </CardContent>
      </Card>
    )
  }

  const isPositive = (delta ?? 0) >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon size={18} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {delta !== undefined && (
          <Badge
            variant="secondary"
            className={cn(
              'mt-1 text-xs',
              isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
            )}
          >
            {isPositive ? '+' : ''}{delta}% from last month
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
