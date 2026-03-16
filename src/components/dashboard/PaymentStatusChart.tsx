import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { usePaymentStatusBreakdown } from '@/hooks/use-dashboard'

const STATUS_META: Record<string, { color: string; label: string }> = {
  completed: { color: '#22c55e', label: 'Completed' },
  pending:   { color: '#f59e0b', label: 'Pending' },
  failed:    { color: '#ef4444', label: 'Failed' },
  refunded:  { color: '#8b5cf6', label: 'Refunded' },
}

export function PaymentStatusChart() {
  const { data, isLoading } = usePaymentStatusBreakdown()
  const total = data?.reduce((s, d) => s + d.count, 0) ?? 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="text-sm font-semibold">Payment Breakdown</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">{total.toLocaleString()} transactions</p>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-40 w-40 rounded-full" />
            <div className="space-y-2 w-full">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-3 w-full rounded" />)}
            </div>
          </div>
        ) : !data || data.length === 0 ? (
          <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={72}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={STATUS_META[entry.status]?.color ?? '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 16px rgb(0 0 0 / 0.12)',
                    padding: '8px 12px',
                  }}
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()} (${total ? Math.round((Number(value) / total) * 100) : 0}%)`,
                    STATUS_META[String(name)]?.label ?? String(name),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data.map((entry) => {
                const meta = STATUS_META[entry.status]
                const pct = total ? Math.round((entry.count / total) * 100) : 0
                return (
                  <div key={entry.status} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta?.color ?? '#94a3b8' }} />
                    <span className="text-xs text-muted-foreground truncate capitalize">{entry.status}</span>
                    <span className="ml-auto text-xs font-medium text-foreground shrink-0">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
