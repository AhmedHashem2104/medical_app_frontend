import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const COLOR_VARIANTS = {
  purple: {
    icon: 'stat-icon-purple',
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
  },
  blue: {
    icon: 'stat-icon-blue',
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
  green: {
    icon: 'stat-icon-green',
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  amber: {
    icon: 'stat-icon-amber',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
} as const

type ColorVariant = keyof typeof COLOR_VARIANTS

interface StatsCardProps {
  title: string
  value: string | number
  delta?: number
  icon: LucideIcon
  isLoading?: boolean
  prefix?: string
  color?: ColorVariant
}

export function StatsCard({ title, value, delta, icon: Icon, isLoading, prefix, color = 'purple' }: StatsCardProps) {
  const colors = COLOR_VARIANTS[color]

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="skeleton-shimmer h-3.5 w-24 rounded" />
              <div className="skeleton-shimmer h-7 w-16 rounded" />
              <div className="skeleton-shimmer h-3 w-20 rounded" />
            </div>
            <div className="skeleton-shimmer h-10 w-10 rounded-xl shrink-0" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = (delta ?? 0) >= 0

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
            <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {delta !== undefined && (
              <div className={cn('mt-1.5 flex items-center gap-1 text-xs font-medium', isPositive ? 'text-emerald-600' : 'text-red-500')}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isPositive ? '+' : ''}{delta}% vs last month</span>
              </div>
            )}
          </div>

          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm', colors.icon)}>
            <Icon size={18} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
