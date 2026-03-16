import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Stethoscope, Lock, Mail, ArrowRight, Shield, Users, Activity, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLogin, usePhoneLogin } from '@/hooks/use-auth'
import { APP_NAME, MOCK_ENABLED } from '@/constants'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { cn } from '@/lib/utils'

const emailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const phoneSchema = z.object({
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Enter a valid phone number'),
})

type EmailFormData = z.infer<typeof emailSchema>
type PhoneFormData = z.infer<typeof phoneSchema>

const BRAND_FEATURES = [
  { icon: Shield, text: 'HIPAA-compliant data handling' },
  { icon: Users, text: 'Multi-site organization management' },
  { icon: Activity, text: 'Real-time visit & billing tracking' },
]

function BrandingPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[44%] flex-col justify-between relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, var(--sidebar) 0%, oklch(8.5% 0.028 268) 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl" style={{ background: 'var(--sidebar-primary)', opacity: 0.07 }} />
        <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--sidebar-primary)', opacity: 0.05 }} />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full blur-3xl" style={{ background: 'var(--sidebar-primary)', opacity: 0.06 }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center gap-3 p-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--sidebar-primary)' }}>
          <Stethoscope size={20} className="text-white" />
        </div>
        <span className="text-base font-semibold text-white tracking-tight">{APP_NAME}</span>
      </div>

      <div className="relative z-10 px-10 pb-2">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'oklch(100% 0 0 / 0.07)', border: '1px solid oklch(100% 0 0 / 0.1)' }}>
          <Stethoscope size={28} style={{ color: 'var(--sidebar-primary)' }} />
        </div>
        <h2 className="text-3xl font-bold leading-tight text-white mb-4">
          Healthcare<br />Administration<br />
          <span style={{ color: 'var(--sidebar-primary)' }}>Made Simple.</span>
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'oklch(100% 0 0 / 0.45)' }}>
          Manage patients, visits, billing and organizations from one unified clinical dashboard.
        </p>
        <div className="space-y-3">
          {BRAND_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: 'oklch(100% 0 0 / 0.07)' }}>
                <Icon size={13} style={{ color: 'var(--sidebar-primary)' }} />
              </div>
              <span className="text-sm" style={{ color: 'oklch(100% 0 0 / 0.6)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 p-10">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Patients', value: '4,821' },
            { label: 'Organizations', value: '38' },
            { label: 'Visits/mo', value: '1,200+' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-3.5" style={{ background: 'oklch(100% 0 0 / 0.06)', border: '1px solid oklch(100% 0 0 / 0.08)' }}>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'oklch(100% 0 0 / 0.45)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmailForm() {
  const loginMutation = useLogin()

  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: MOCK_ENABLED ? { email: 'admin@medapp.io', password: 'password123' } : undefined,
  })

  return (
    <form onSubmit={handleSubmit((d) => loginMutation.mutate(d))} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
        <div className="relative">
          <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" className="pl-9 h-10" {...register('email')} />
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" className="pl-9 h-10" {...register('password')} />
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full gap-2 h-10 mt-1" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Signing in…' : <><span>Sign in</span><ArrowRight size={15} /></>}
      </Button>
    </form>
  )
}

function PhoneForm() {
  const phoneLoginMutation = usePhoneLogin()

  const { register, handleSubmit, formState: { errors } } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: MOCK_ENABLED ? { phone: '+1 555 000 0001' } : undefined,
  })

  return (
    <form onSubmit={handleSubmit((d) => phoneLoginMutation.mutate(d))} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-sm font-medium">Phone number</Label>
        <div className="relative">
          <Phone size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input id="phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" className="pl-9 h-10" {...register('phone')} />
        </div>
        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      <p className="text-xs text-muted-foreground">
        We'll send a one-time code to this number. Standard message rates may apply.
      </p>

      <Button type="submit" size="lg" className="w-full gap-2 h-10" disabled={phoneLoginMutation.isPending}>
        {phoneLoginMutation.isPending ? 'Sending code…' : <><span>Send OTP</span><ArrowRight size={15} /></>}
      </Button>
    </form>
  )
}

type LoginMethod = 'email' | 'phone'

export default function LoginPage() {
  useDocumentTitle('Sign In')
  const [method, setMethod] = useState<LoginMethod>('email')

  return (
    <div className="flex min-h-screen bg-background">
      <BrandingPanel />

      {/* ── Right form panel ──────────────────────────────────────────── */}
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to access the dashboard
            </p>
            {MOCK_ENABLED && (
              <div className="mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5">
                <p className="text-xs font-medium text-warning">Mock mode — credentials are pre-filled</p>
              </div>
            )}
          </div>

          {/* Method tabs */}
          <div className="mb-6 flex rounded-lg border border-border bg-muted/40 p-1">
            {(['email', 'phone'] as LoginMethod[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-medium transition-all',
                  method === m
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'email' ? <Mail size={13} /> : <Phone size={13} />}
                {m === 'email' ? 'Email & Password' : 'Phone OTP'}
              </button>
            ))}
          </div>

          {method === 'email' ? <EmailForm /> : <PhoneForm />}

          {/* Footer hint */}
          <p className="mt-8 text-center text-xs text-muted-foreground/70">
            Secured with end-to-end encryption · HIPAA compliant
          </p>
        </div>
      </div>
    </div>
  )
}
