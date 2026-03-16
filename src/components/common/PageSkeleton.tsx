export function PageSkeleton() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/20 skeleton-shimmer" />
        <div className="space-y-1.5 text-center">
          <div className="skeleton-shimmer h-3 w-24 rounded mx-auto" />
          <div className="skeleton-shimmer h-2.5 w-16 rounded mx-auto" />
        </div>
      </div>
    </div>
  )
}
