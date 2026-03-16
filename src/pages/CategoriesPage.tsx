import { useState, useTransition, useDeferredValue } from 'react'
import { format } from 'date-fns'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/use-categories'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import type { Category } from '@/types/category'
import { useDocumentTitle } from '@/hooks/use-document-title'

// ─── Category Form Dialog ─────────────────────────────────────────────────────

interface CategoryFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Category
}

function CategoryFormDialog({ open, onOpenChange, initial }: CategoryFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory(initial?.id ?? '')

  const isPending = createMutation.isPending || updateMutation.isPending

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name: name.trim(), description: description.trim() || undefined }
    if (initial) {
      updateMutation.mutate(payload, { onSuccess: () => onOpenChange(false) })
    } else {
      createMutation.mutate(payload, { onSuccess: () => onOpenChange(false) })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initial ? 'Edit Category' : 'New Category'}</DialogTitle>
          <DialogDescription>
            {initial ? 'Update the category details.' : 'Add a new medical service category.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              placeholder="e.g. Cardiology"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cat-desc">Description <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="cat-desc"
              placeholder="Short description of the category"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isPending || !name.trim()}>
              {isPending ? 'Saving…' : initial ? 'Save changes' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoriesPage() {
  useDocumentTitle('Categories')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search)

  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Category | undefined>()
  const [deleteTarget, setDeleteTarget] = useState<Category | undefined>()

  const { data, isLoading } = useCategories({ page, limit: 20, search: deferredSearch || undefined })
  const deleteMutation = useDeleteCategory()

  const openCreate = () => {
    setEditTarget(undefined)
    setFormOpen(true)
  }

  const openEdit = (cat: Category) => {
    setEditTarget(cat)
    setFormOpen(true)
  }

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Tag size={13} className="text-primary" />
          </div>
          <span className="font-medium text-sm">{String(getValue())}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground text-sm truncate max-w-xs block">
          {String(getValue() ?? '—')}
        </span>
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
      header: 'Created',
      cell: ({ getValue }) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(String(getValue())), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => openEdit(row.original)}
            aria-label="Edit"
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteTarget(row.original)}
            aria-label="Delete"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage medical service categories"
        action={
          <Button size="sm" onClick={openCreate}>
            <Plus size={14} className="mr-1.5" />
            New Category
          </Button>
        }
      />

      <DataTable
        data={data?.data ?? []}
        columns={columns}
        totalCount={data?.total}
        page={page}
        pageSize={20}
        onPageChange={(p) => startTransition(() => setPage(p))}
        onSearchChange={(s) => startTransition(() => setSearch(s))}
        searchPlaceholder="Search categories…"
        isLoading={isLoading}
      />

      {/* Create / Edit dialog */}
      {formOpen && (
        <CategoryFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open)
            if (!open) setEditTarget(undefined)
          }}
          initial={editTarget}
        />
      )}

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(undefined) }}
        title={`Delete "${deleteTarget?.name}"?`}
        description="This action cannot be undone. The category will be permanently removed."
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(undefined) })
        }}
      />
    </div>
  )
}
