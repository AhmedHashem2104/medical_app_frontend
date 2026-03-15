import { useState, useTransition } from 'react'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { useTransactions } from '@/hooks/use-transactions'
import type { Transaction, PaymentStatus } from '@/types/transaction'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  completed: 'bg-green-50 text-green-700',
  failed: 'bg-red-50 text-red-700',
  refunded: 'bg-purple-50 text-purple-700',
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs">{String(getValue()).slice(0, 8)}...</span>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.currency} {row.original.amount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as PaymentStatus
      return (
        <Badge variant="secondary" className={cn('text-xs capitalize', STATUS_STYLES[status])}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Method',
    cell: ({ getValue }) => getValue() ?? <span className="text-muted-foreground">—</span>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ getValue }) => format(new Date(String(getValue())), 'MMM d, yyyy'),
  },
]

export default function TransactionsPage() {
  const [page, setPage] = useState(1)
  const [, startTransition] = useTransition()

  const { data, isLoading } = useTransactions({ page, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' })

  return (
    <div>
      <PageHeader title="Transactions" description="View payment transactions" />
      <DataTable
        data={data?.data ?? []}
        columns={columns}
        totalCount={data?.total}
        page={page}
        pageSize={20}
        onPageChange={(p) => startTransition(() => setPage(p))}
        isLoading={isLoading}
      />
    </div>
  )
}
