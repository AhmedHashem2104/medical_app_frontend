import { Sun, Moon, Monitor, PanelLeft, Info } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useUiStore } from '@/store/ui-store'
import type { Theme } from '@/store/ui-store'
import { cn } from '@/lib/utils'
import { APP_NAME, MOCK_ENABLED } from '@/constants'
import { useDocumentTitle } from '@/hooks/use-document-title'

const THEME_OPTIONS: { value: Theme; label: string; description: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { value: 'light', label: 'Light', description: 'Always use light theme', Icon: Sun },
  { value: 'dark',  label: 'Dark',  description: 'Always use dark theme',  Icon: Moon },
  { value: 'system', label: 'System', description: 'Follow OS preference',  Icon: Monitor },
]

export default function SettingsPage() {
  useDocumentTitle('Settings')

  const { theme, setTheme, sidebarOpen, setSidebarOpen } = useUiStore()

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" description="Manage your application preferences" />

      {/* ── Appearance ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sun size={15} className="text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
          </div>
          <CardDescription>Choose how {APP_NAME} looks to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map(({ value, label, description, Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  'group flex flex-col items-center gap-3 rounded-xl border-2 px-3 py-4 text-center transition-all',
                  theme === value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40 hover:bg-muted/50'
                )}
              >
                <div className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                  theme === value ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                )}>
                  <Icon size={17} />
                </div>
                <div>
                  <p className={cn('text-xs font-semibold', theme === value ? 'text-primary' : 'text-foreground')}>
                    {label}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{description}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PanelLeft size={15} className="text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Navigation</CardTitle>
          </div>
          <CardDescription>Control sidebar and layout behavior.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <Label className="text-sm font-medium cursor-pointer" htmlFor="sidebar-toggle">
                Expanded sidebar
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Keep the sidebar open and show labels
              </p>
            </div>
            <Switch
              id="sidebar-toggle"
              checked={sidebarOpen}
              onCheckedChange={(checked) => setSidebarOpen(checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info size={15} className="text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">About</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Application</span>
            <span className="font-medium">{APP_NAME}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Version</span>
            <span className="font-mono text-xs">0.1.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">API mode</span>
            <Badge variant={MOCK_ENABLED ? 'outline' : 'default'} className="text-[10px]">
              {MOCK_ENABLED ? 'Mock' : 'Live'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Compliance</span>
            <span className="text-xs text-muted-foreground">HIPAA-aware</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
