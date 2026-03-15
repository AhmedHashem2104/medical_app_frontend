import { Skeleton } from '@/components/ui/skeleton'

export function PageSkeleton() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-4 w-full max-w-3xl px-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <div className="grid grid-cols-4 gap-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  )
}
