import { useState, useTransition } from 'react'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { useVisits } from '@/hooks/use-visits'
import type { Visit, VisitStatus } from '@/types/visit'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<VisitStatus, string> = {
  scheduled: 'bg-sky-500/10 text-sky-700 dark:text-sky-300',
  in_progress: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  completed: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  cancelled: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  no_show: 'bg-red-500/10 text-red-700 dark:text-red-300',
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
  useDocumentTitle('Visits')
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
