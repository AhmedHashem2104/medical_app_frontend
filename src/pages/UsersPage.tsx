import { useState, useTransition, useDeferredValue } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/hooks/use-users'
import type { User } from '@/types/user'

const columns: ColumnDef<User>[] = [
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => (
      <Badge variant="secondary" className="capitalize">
        {String(getValue())}
      </Badge>
    ),
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
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ getValue }) => format(new Date(String(getValue())), 'MMM d, yyyy'),
  },
]

export default function UsersPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const { data, isLoading } = useUsers({
    page,
    limit: 20,
    search: deferredSearch || undefined,
  })

  const columnsWithActions: ColumnDef<User>[] = [
    ...columns,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/users/${row.original.id}`)}
        >
          <Eye size={14} className="mr-1" />
          View
        </Button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Users" description="Manage system users" />
      <DataTable
        data={data?.data ?? []}
        columns={columnsWithActions}
        totalCount={data?.total}
        page={page}
        pageSize={20}
        onPageChange={(p) => startTransition(() => setPage(p))}
        onSearchChange={(s) => startTransition(() => setSearch(s))}
        searchPlaceholder="Search by email..."
        isLoading={isLoading}
      />
    </div>
  )
}
