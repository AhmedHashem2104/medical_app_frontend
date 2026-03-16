import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth-store'
import { Badge } from '@/components/ui/badge'
import { useDocumentTitle } from '@/hooks/use-document-title'

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  useDocumentTitle('Profile')
  const { userId, role } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = (_data: ProfileFormData) => {
    toast.info('Profile update is not yet available.')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your account profile" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Account Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="w-20 text-muted-foreground">User ID:</span>
              <span className="font-mono text-xs">{userId?.slice(0, 8)}...</span>
            </div>
            <div className="flex gap-2">
              <span className="w-20 text-muted-foreground">Role:</span>
              <Badge variant="secondary" className="capitalize">{role}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input {...register('firstName')} placeholder="First name" />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input {...register('lastName')} placeholder="Last name" />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input {...register('phone')} placeholder="+1 234 567 8900" type="tel" />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
