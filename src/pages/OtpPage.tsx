import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Stethoscope, ShieldCheck, ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVerifyOtp, useResendOtp } from '@/hooks/use-auth'
import { APP_NAME } from '@/constants'
import { useDocumentTitle } from '@/hooks/use-document-title'

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return phone
  return phone.slice(0, -4).replace(/\d/g, '•') + digits.slice(-4)
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain || local.length <= 2) return email
  return local[0] + '•'.repeat(Math.min(local.length - 2, 4)) + local[local.length - 1] + '@' + domain
}

export default function OtpPage() {
  useDocumentTitle('Verify OTP')
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as { userId?: string; phone?: string; email?: string } | null
  const userId = state?.userId
  const contactHint = state?.phone
    ? maskPhone(state.phone)
    : state?.email
      ? maskEmail(state.email)
      : 'your registered contact'

  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(60)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const verifyMutation = useVerifyOtp()
  const resendMutation = useResendOtp()

  const startCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCountdown(60)
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current!)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (!userId) {
      navigate('/login', { replace: true })
      return
    }
    startCountdown()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    verifyMutation.mutate({ userId, otp })
  }

  const handleResend = () => {
    if (!userId) return
    resendMutation.mutate(userId)
    startCountdown()
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Left branding panel ─────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[44%] flex-col justify-between relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, var(--sidebar) 0%, oklch(8.5% 0.028 268) 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl"
            style={{ background: 'var(--sidebar-primary)', opacity: 0.07 }}
          />
          <div
            className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'var(--sidebar-primary)', opacity: 0.05 }}
          />
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="otp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#otp-grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 p-10">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--sidebar-primary)' }}
          >
            <Stethoscope size={20} className="text-white" />
          </div>
          <span className="text-base font-semibold text-white tracking-tight">{APP_NAME}</span>
        </div>

        {/* Center content */}
        <div className="relative z-10 px-10 pb-2">
          <div
            className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'oklch(100% 0 0 / 0.07)', border: '1px solid oklch(100% 0 0 / 0.1)' }}
          >
            <ShieldCheck size={28} style={{ color: 'var(--sidebar-primary)' }} />
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white mb-4">
            Two-Factor<br />Authentication
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'oklch(100% 0 0 / 0.45)' }}>
            An OTP was sent to your registered contact. This extra step keeps your account secure.
          </p>
        </div>

        {/* Security note */}
        <div className="relative z-10 p-10">
          <div
            className="rounded-xl p-4"
            style={{ background: 'oklch(100% 0 0 / 0.06)', border: '1px solid oklch(100% 0 0 / 0.08)' }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'oklch(100% 0 0 / 0.5)' }}>
              Never share your OTP with anyone. {APP_NAME} staff will never ask for your code.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right verification panel ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
              <Stethoscope size={18} className="text-primary" />
            </div>
            <span className="text-base font-semibold text-foreground">{APP_NAME}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck size={22} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Verify your identity</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Enter the 6-digit code sent to{' '}
              <span className="font-medium text-foreground">{contactHint}</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="h-14 text-center text-2xl tracking-[0.5em] font-mono"
              autoComplete="one-time-code"
              autoFocus
            />

            <Button
              type="submit"
              size="lg"
              className="w-full h-10"
              disabled={otp.length !== 6 || verifyMutation.isPending}
            >
              {verifyMutation.isPending ? 'Verifying…' : 'Verify code'}
            </Button>

            {/* Resend / countdown */}
            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Resend code in{' '}
                  <span className="font-semibold tabular-nums text-foreground">{countdown}s</span>
                </p>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-primary hover:text-primary"
                  onClick={handleResend}
                  disabled={resendMutation.isPending}
                >
                  <RotateCcw size={13} />
                  {resendMutation.isPending ? 'Sending…' : 'Resend code'}
                </Button>
              )}
            </div>
          </form>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft size={13} />
              Back to sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
