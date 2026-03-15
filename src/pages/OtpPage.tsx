import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useVerifyOtp, useResendOtp } from '@/hooks/use-auth'

export default function OtpPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const userId = (location.state as { userId?: string } | null)?.userId

  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const verifyMutation = useVerifyOtp()
  const resendMutation = useResendOtp()

  useEffect(() => {
    if (!userId) {
      navigate('/login', { replace: true })
      return
    }

    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [userId, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    verifyMutation.mutate({ userId, otp })
  }

  const handleResend = () => {
    if (!userId) return
    resendMutation.mutate(userId)
    setCountdown(60)
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your registered contact</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="text-center text-2xl tracking-widest"
              autoComplete="one-time-code"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6 || verifyMutation.isPending}
            >
              {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
            </Button>
            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground">Resend in {countdown}s</p>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={resendMutation.isPending}
                >
                  Resend OTP
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
