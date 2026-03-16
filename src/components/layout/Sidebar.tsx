import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Activity,
  CreditCard,
  Bell,
  UserCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Tag,
} from 'lucide-react'
import { useUiStore } from '@/store/ui-store'
import { useNotifications } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/constants'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Management',
    items: [
      { to: '/users', icon: Users, label: 'Users' },
      { to: '/organizations', icon: Building2, label: 'Organizations' },
      { to: '/schedules', icon: Calendar, label: 'Schedules' },
      { to: '/categories', icon: Tag, label: 'Categories' },
    ],
  },
  {
    label: 'Clinical',
    items: [
      { to: '/visits', icon: Activity, label: 'Visits' },
      { to: '/transactions', icon: CreditCard, label: 'Transactions' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/notifications', icon: Bell, label: 'Notifications', badge: true },
      { to: '/profile', icon: UserCircle, label: 'Profile' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore()
  const location = useLocation()
  const { data: notificationsData } = useNotifications({ limit: 20, page: 1 })
  const unreadCount = notificationsData?.data.filter((n) => !n.isRead).length ?? 0

  return (
    <aside
      className={cn(
        'sidebar-transition fixed left-0 top-0 z-40 flex h-screen flex-col',
        'bg-sidebar border-r border-sidebar-border',
        sidebarOpen ? 'w-60' : 'w-[60px]'
      )}
    >
      {/* Logo area */}
      <div className={cn(
        'flex h-14 items-center border-b border-sidebar-border shrink-0',
        sidebarOpen ? 'px-4 gap-3' : 'justify-center px-0'
      )}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/20">
          <Stethoscope size={16} className="text-sidebar-primary" />
        </div>
        {sidebarOpen && (
          <span className="text-sm font-semibold text-white tracking-tight">{APP_NAME}</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {sidebarOpen && (
              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40 select-none">
                {group.label}
              </p>
            )}
            {!sidebarOpen && <div className="my-2 h-px bg-sidebar-border/60 mx-2" />}
            {group.items.map(({ to, icon: Icon, label, badge }) => {
              const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)
              const badgeCount = badge ? unreadCount : 0

              return (
                <NavLink
                  key={to}
                  to={to}
                  title={!sidebarOpen ? label : undefined}
                  className={cn(
                    'group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-sidebar-primary/15 text-white'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    !sidebarOpen && 'justify-center px-0'
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
                  )}

                  <Icon
                    size={17}
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground'
                    )}
                  />

                  {sidebarOpen && <span className="truncate">{label}</span>}

                  {/* Badge */}
                  {badgeCount > 0 && sidebarOpen && (
                    <span className="ml-auto flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-sidebar-primary px-1 text-[10px] font-bold text-white">
                      {badgeCount > 9 ? '9+' : badgeCount}
                    </span>
                  )}
                  {badgeCount > 0 && !sidebarOpen && (
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-sidebar-primary" />
                  )}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2 shrink-0">
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-sidebar-foreground/60',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
            !sidebarOpen && 'justify-center px-0'
          )}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft size={16} />
              <span className="text-xs">Collapse</span>
            </>
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </aside>
  )
}
