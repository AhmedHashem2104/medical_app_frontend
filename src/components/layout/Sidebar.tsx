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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useUiStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Users' },
  { to: '/organizations', icon: Building2, label: 'Organizations' },
  { to: '/schedules', icon: Calendar, label: 'Schedules' },
  { to: '/visits', icon: Activity, label: 'Visits' },
  { to: '/transactions', icon: CreditCard, label: 'Transactions' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/profile', icon: UserCircle, label: 'Profile' },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore()
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {sidebarOpen && (
          <span className="text-lg font-semibold text-sidebar-primary">MedAdmin</span>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto rounded-md p-1.5 hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`)
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive
                  ? 'bg-sidebar-primary/10 text-sidebar-primary border-r-2 border-sidebar-primary'
                  : 'text-sidebar-foreground'
              )}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
