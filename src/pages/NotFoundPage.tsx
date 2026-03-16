import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/use-document-title'

export default function NotFoundPage() {
  useDocumentTitle('Page Not Found')
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl font-semibold text-foreground">Page not found</p>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button className="mt-6" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  )
}
