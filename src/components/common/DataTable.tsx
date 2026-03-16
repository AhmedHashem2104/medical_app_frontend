import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  totalCount?: number
  page?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  onSearchChange?: (search: string) => void
  searchPlaceholder?: string
  isLoading?: boolean
}

export function DataTable<TData>({
  data,
  columns,
  totalCount,
  page = 1,
  pageSize = 20,
  onPageChange,
  onSearchChange,
  searchPlaceholder = 'Search…',
  isLoading,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    manualPagination: true,
    pageCount: totalCount ? Math.ceil(totalCount / pageSize) : undefined,
  })

  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 1

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      {onSearchChange && (
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              'flex h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm',
              'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50',
              'transition-shadow'
            )}
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/40 hover:bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'text-xs font-semibold text-muted-foreground py-2.5',
                      header.column.getCanSort() && 'cursor-pointer select-none hover:text-foreground'
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-muted-foreground/60">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp size={13} />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown size={13} />
                          ) : (
                            <ChevronsUpDown size={13} />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <TableRow key={i} className="border-b border-border/60">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="py-3">
                      <div className="skeleton-shimmer h-4 w-full rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-sm text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {onPageChange && (
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-xs text-muted-foreground">
            Page <span className="font-medium text-foreground">{page}</span> of <span className="font-medium text-foreground">{totalPages}</span>
            {totalCount !== undefined && (
              <span className="text-muted-foreground/70"> · {totalCount.toLocaleString()} records</span>
            )}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft size={14} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
