import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSchedules } from '@/hooks/use-schedules'
import type { Schedule } from '@/types/schedule'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function SchedulesPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [, startTransition] = useTransition()

  const { data, isLoading } = useSchedules({ page, limit: 20 })

  const columns: ColumnDef<Schedule>[] = [
    {
      accessorKey: 'dayOfWeek',
      header: 'Day',
      cell: ({ getValue }) => DAYS[getValue() as number] ?? 'Unknown',
    },
    { accessorKey: 'startTime', header: 'Start' },
    { accessorKey: 'endTime', header: 'End' },
    {
      accessorKey: 'slotDurationMinutes',
      header: 'Slot (min)',
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ getValue }) => (
        <Badge variant={getValue() ? 'default' : 'secondary'}>
          {getValue() ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" onClick={() => navigate(`/schedules/${row.original.id}`)}>
          <Eye size={14} className="mr-1" />
          View
        </Button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Schedules" description="Manage doctor schedules" />
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
