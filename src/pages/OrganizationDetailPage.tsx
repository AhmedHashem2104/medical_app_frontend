import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Mail, Phone, MapPin, Globe, CheckCircle2, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization } from '@/hooks/use-organizations'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { cn } from '@/lib/utils'

/** Convert a camelCase key like "cardiacRehab" → "Cardiac Rehab" */
function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function ServicesList({ services }: { services: Record<string, unknown> }) {
  const active = Object.entries(services).filter(([, v]) => Boolean(v))
  const inactive = Object.entries(services).filter(([, v]) => !Boolean(v))

  if (active.length === 0 && inactive.length === 0) return null

  return (
    <div className="space-y-3">
      {active.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {active.map(([key]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success"
            >
              <CheckCircle2 size={11} />
              {humanize(key)}
            </span>
          ))}
        </div>
      )}
      {inactive.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {inactive.map(([key]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground line-through"
            >
              {humanize(key)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function AppointmentModes({ modes }: { modes: Record<string, unknown> }) {
  const labels: Record<string, string> = {
    online: 'Online Booking',
    walkin: 'Walk-in',
    referralOnly: 'Referral Only',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(modes).map(([key, val]) => (
        <span
          key={key}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
            val
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground opacity-50'
          )}
        >
          <Calendar size={10} />
          {labels[key] ?? humanize(key)}
        </span>
      ))}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, href }: {
  icon: React.FC<{ size?: number; className?: string }>
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <Icon size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
      <span className="w-20 shrink-0 text-xs text-muted-foreground">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
          {value}
        </a>
      ) : (
        <span className="text-sm text-foreground break-all">{value}</span>
      )}
    </div>
  )
}

export default function OrganizationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: org, isLoading } = useOrganization(id!)

  useDocumentTitle(org ? org.name : 'Organization')

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!org) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-1" /> Back
        </Button>
        <p className="text-muted-foreground">Organization not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-1" /> Back
        </Button>
      </div>

      {/* Hero card */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building2 size={22} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{org.name}</h1>
                <Badge variant={org.isActive ? 'default' : 'secondary'}>
                  {org.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              {org.description && (
                <p className="mt-1 text-sm text-muted-foreground">{org.description}</p>
              )}
              <p className="mt-1.5 text-[11px] text-muted-foreground/60">
                Added {format(new Date(org.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Contact info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {org.email && <InfoRow icon={Mail} label="Email" value={org.email} href={`mailto:${org.email}`} />}
            {org.phone && <InfoRow icon={Phone} label="Phone" value={org.phone} href={`tel:${org.phone}`} />}
            {org.address && <InfoRow icon={MapPin} label="Address" value={org.address} />}
            {org.website && <InfoRow icon={Globe} label="Website" value={org.website} href={org.website} />}
            {!org.email && !org.phone && !org.address && !org.website && (
              <p className="text-sm text-muted-foreground py-2">No contact info available.</p>
            )}
          </CardContent>
        </Card>

        {/* Services */}
        {org.services && Object.keys(org.services).length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <ServicesList services={org.services} />
            </CardContent>
          </Card>
        )}

        {/* Appointment modes */}
        {org.appointments && Object.keys(org.appointments).length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Appointment Modes</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentModes modes={org.appointments} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
