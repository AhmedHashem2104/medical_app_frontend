import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppointmentsOverTime } from '@/hooks/use-dashboard'
import { cn } from '@/lib/utils'

type Period = '7d' | '30d' | '90d'

const PERIOD_LABELS: Record<Period, string> = { '7d': '7d', '30d': '30d', '90d': '90d' }

export function AppointmentsChart() {
  const [period, setPeriod] = useState<Period>('30d')
  const { data, isLoading } = useAppointmentsOverTime(period)

  const chartData = data?.map((d) => ({
    date: format(parseISO(d.date), period === '7d' ? 'EEE' : 'MMM d'),
    count: d.count,
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
        <div>
          <CardTitle className="text-sm font-semibold">Appointments Over Time</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Daily appointment volume</p>
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                period === p
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-52 w-full rounded-lg" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="apptGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                interval={period === '90d' ? 13 : period === '30d' ? 3 : 0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 16px rgb(0 0 0 / 0.12)',
                  padding: '8px 12px',
                }}
                labelStyle={{ color: 'var(--color-foreground)', fontWeight: 600, marginBottom: 2 }}
                itemStyle={{ color: 'var(--color-primary)' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Appointments"
                stroke="var(--color-primary)"
                fill="url(#apptGradient)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-primary)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
