import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { useOrganizations } from '@/hooks/use-organizations'

export default function OrganizationsPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [, startTransition] = useTransition()

  const { data, isLoading } = useOrganizations({ page, limit: 12, search: search || undefined })

  return (
    <div className="space-y-6">
      <PageHeader title="Organizations" description="Manage medical organizations" />

      <Input
        placeholder="Search organizations..."
        value={search}
        onChange={(e) => startTransition(() => setSearch(e.target.value))}
        className="max-w-sm"
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36" />
          ))}
        </div>
      ) : !data?.data.length ? (
        <EmptyState
          icon={<Building2 size={40} />}
          title="No organizations found"
          description="No organizations match your search criteria."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((org) => (
            <Card key={org.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate(`/organizations/${org.id}`)}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{org.name}</CardTitle>
                  <Badge variant={org.isActive ? 'default' : 'secondary'}>
                    {org.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                {org.email && <p>{org.email}</p>}
                {org.address && <p>{org.address}</p>}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 p-0 h-auto text-primary"
                  onClick={(e) => { e.stopPropagation(); navigate(`/organizations/${org.id}`) }}
                >
                  <ExternalLink size={12} className="mr-1" />
                  View details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => startTransition(() => setPage(page - 1))}>
            Previous
          </Button>
          <span className="flex items-center text-sm text-muted-foreground">
            {page} / {data.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => startTransition(() => setPage(page + 1))}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
