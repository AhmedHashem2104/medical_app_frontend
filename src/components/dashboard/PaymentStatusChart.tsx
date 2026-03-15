import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePaymentStatusBreakdown } from '@/hooks/use-dashboard'
import { Skeleton } from '@/components/ui/skeleton'

const STATUS_COLORS: Record<string, string> = {
  completed: '#22c55e',
  pending: '#eab308',
  failed: '#ef4444',
  refunded: '#6366f1',
}

export function PaymentStatusChart() {
  const { data, isLoading } = usePaymentStatusBreakdown()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-48 w-full" />
        ) : !data || data.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={70}
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? '#94a3b8'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px',
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-xs capitalize text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
