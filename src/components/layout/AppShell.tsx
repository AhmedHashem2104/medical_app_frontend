import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { useUiStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

export function AppShell() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div
        className={cn(
          'content-transition flex flex-1 flex-col overflow-hidden min-w-0',
          sidebarOpen ? 'ml-60' : 'ml-[60px]'
        )}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="page-enter p-5 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
