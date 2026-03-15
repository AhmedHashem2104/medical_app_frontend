import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/use-users'
import { format } from 'date-fns'

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: user, isLoading } = useUser(id!)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">User Details</h1>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </CardContent>
        </Card>
      ) : user ? (
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="w-32 text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex gap-2">
                <span className="w-32 text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{user.phone}</span>
              </div>
            )}
            <div className="flex gap-2">
              <span className="w-32 text-muted-foreground">Role:</span>
              <Badge variant="secondary" className="capitalize">{user.role}</Badge>
            </div>
            <div className="flex gap-2">
              <span className="w-32 text-muted-foreground">Status:</span>
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex gap-2">
              <span className="w-32 text-muted-foreground">Verified:</span>
              <Badge variant={user.isVerified ? 'default' : 'secondary'}>
                {user.isVerified ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex gap-2">
              <span className="w-32 text-muted-foreground">Joined:</span>
              <span className="text-foreground">{format(new Date(user.createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground">User not found.</p>
      )}
    </div>
  )
}
