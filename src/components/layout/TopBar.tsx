import { Bell, LogOut, UserCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/auth-store'
import { useLogout } from '@/hooks/use-auth'
import { useNotifications } from '@/hooks/use-notifications'

export function TopBar() {
  const navigate = useNavigate()
  const role = useAuthStore((s) => s.role)
  const logoutMutation = useLogout()
  const { data: notificationsData } = useNotifications({ limit: 5, page: 1 })

  const unreadCount = notificationsData?.data.filter((n) => !n.isRead).length ?? 0

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground capitalize">{role ?? 'User'}</span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {role?.charAt(0).toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <UserCircle size={14} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logoutMutation.mutate()}
              className="text-destructive focus:text-destructive"
            >
              <LogOut size={14} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
