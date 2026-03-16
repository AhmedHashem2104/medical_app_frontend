import { Bell, LogOut, UserCircle, Settings, Sun, Moon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/auth-store'
import { useUiStore } from '@/store/ui-store'
import { useLogout } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'
import { MOCK_ENABLED } from '@/constants'
import { cn } from '@/lib/utils'

// Map route paths → readable page titles
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Users',
  '/organizations': 'Organizations',
  '/schedules': 'Schedules',
  '/categories': 'Categories',
  '/visits': 'Visits',
  '/transactions': 'Transactions',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
}

function getPageTitle(pathname: string): string {
  const exact = PAGE_TITLES[pathname]
  if (exact) return exact
  const base = '/' + pathname.split('/')[1]
  return PAGE_TITLES[base] ?? 'Page'
}

export function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, userId } = useAuthStore()
  const logoutMutation = useLogout()
  const { theme, toggleTheme } = useUiStore()
  const { data: notificationsData } = useNotifications({ limit: 20, page: 1 })

  const unreadCount = notificationsData?.data.filter((n) => !n.isRead).length ?? 0
  const pageTitle = getPageTitle(location.pathname)

  const initials = role ? role.charAt(0).toUpperCase() : 'U'
  const userLabel = userId ? `${role ?? 'user'}` : 'User'

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5 gap-4">
      {/* Left: Page title */}
      <div className="flex items-center gap-2 min-w-0">
        <h2 className="text-sm font-semibold text-foreground truncate">{pageTitle}</h2>
        {MOCK_ENABLED && (
          <span className="inline-flex items-center rounded-full border border-warning/40 bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning shrink-0">
            MOCK
          </span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        {/* Notifications bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/notifications')}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              className={cn(
                'absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full bg-primary text-white',
                'text-[9px] font-bold leading-none',
                unreadCount > 9 ? 'h-4 w-4' : 'h-3.5 w-3.5'
              )}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/15 text-primary text-[11px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-xs font-medium text-foreground capitalize">{userLabel}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground capitalize">
                Signed in as {userLabel}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserCircle size={13} className="mr-2 opacity-70" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings size={13} className="mr-2 opacity-70" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => logoutMutation.mutate()}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut size={13} className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
