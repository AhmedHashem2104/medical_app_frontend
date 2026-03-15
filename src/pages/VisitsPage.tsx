import { useState, useTransition } from 'react'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { useVisits } from '@/hooks/use-visits'
import type { Visit, VisitStatus } from '@/types/visit'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<VisitStatus, string> = {
  scheduled: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-yellow-50 text-yellow-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-gray-50 text-gray-700',
  no_show: 'bg-red-50 text-red-700',
}

const columns: ColumnDef<Visit>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs">{String(getValue()).slice(0, 8)}...</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as VisitStatus
      return (
        <Badge variant="secondary" className={cn('text-xs capitalize', STATUS_STYLES[status])}>
          {status.replace('_', ' ')}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'scheduledAt',
    header: 'Scheduled',
    cell: ({ getValue }) => format(new Date(String(getValue())), 'MMM d, yyyy HH:mm'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ getValue }) => format(new Date(String(getValue())), 'MMM d, yyyy'),
  },
]

export default function VisitsPage() {
  const [page, setPage] = useState(1)
  const [, startTransition] = useTransition()

  const { data, isLoading } = useVisits({ page, limit: 20, sortBy: 'scheduledAt', sortOrder: 'desc' })

  return (
    <div>
      <PageHeader title="Visits" description="View and manage patient visits" />
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
