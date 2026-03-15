import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useSchedule } from '@/hooks/use-schedules'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function ScheduleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: schedule, isLoading } = useSchedule(id!)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Schedule Details</h1>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-6 w-48" />
          </CardContent>
        </Card>
      ) : schedule ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{DAYS[schedule.dayOfWeek]}</CardTitle>
              <Badge variant={schedule.isActive ? 'default' : 'secondary'}>
                {schedule.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex gap-2">
              <span className="w-40 text-muted-foreground">Start Time:</span>
              <span>{schedule.startTime}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-40 text-muted-foreground">End Time:</span>
              <span>{schedule.endTime}</span>
            </div>
            <div className="flex gap-2">
              <span className="w-40 text-muted-foreground">Slot Duration:</span>
              <span>{schedule.slotDurationMinutes} minutes</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground">Schedule not found.</p>
      )}
    </div>
  )
}
