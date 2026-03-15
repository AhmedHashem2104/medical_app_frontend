import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppointmentsOverTime } from '@/hooks/use-dashboard'
import { Skeleton } from '@/components/ui/skeleton'
import { format, parseISO } from 'date-fns'

type Period = '7d' | '30d' | '90d'

export function AppointmentsChart() {
  const [period, setPeriod] = useState<Period>('30d')
  const { data, isLoading } = useAppointmentsOverTime(period)

  const chartData = data?.map((d) => ({
    date: format(parseISO(d.date), 'MMM d'),
    count: d.count,
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Appointments Over Time</CardTitle>
        <div className="flex gap-1">
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
              className="h-7 px-2 text-xs"
            >
              {p}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(271 100% 61%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(271 100% 61%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Appointments"
                stroke="hsl(271 100% 61%)"
                fill="url(#appointmentGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
