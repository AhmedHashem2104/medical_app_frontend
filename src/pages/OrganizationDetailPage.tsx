import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@/hooks/use-organizations'

export default function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: org, isLoading } = useOrganization(id!)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Organization Details</h1>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ) : org ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{org.name}</CardTitle>
                <Badge variant={org.isActive ? 'default' : 'secondary'}>
                  {org.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {org.description && (
                <p className="text-muted-foreground">{org.description}</p>
              )}
              {org.email && (
                <div className="flex gap-2">
                  <span className="w-24 text-muted-foreground">Email:</span>
                  <span>{org.email}</span>
                </div>
              )}
              {org.phone && (
                <div className="flex gap-2">
                  <span className="w-24 text-muted-foreground">Phone:</span>
                  <span>{org.phone}</span>
                </div>
              )}
              {org.address && (
                <div className="flex gap-2">
                  <span className="w-24 text-muted-foreground">Address:</span>
                  <span>{org.address}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {org.services && Object.keys(org.services).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Services</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-muted-foreground overflow-auto rounded bg-muted p-3">
                  {JSON.stringify(org.services, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground">Organization not found.</p>
      )}
    </div>
  )
}
