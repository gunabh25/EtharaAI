'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings,
  Menu,
  ChevronLeft,
  Layers
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <div
      className={cn(
        "relative hidden flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 md:flex z-20 sticky top-0 h-screen",
        isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
      )}
    >
      <div className="flex h-16 items-center px-4 py-4 mb-4 justify-between">
        <Link href="/dashboard" className={cn("flex items-center gap-2 overflow-hidden transition-opacity hover:opacity-80", isCollapsed && "hidden")}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-md">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">EtharaAI</span>
        </Link>
        {isCollapsed && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-md">
            <Layers className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard')
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "shrink-0 transition-transform duration-200",
                  isCollapsed ? "h-5 w-5 mx-auto" : "mr-3 h-5 w-5",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"
                )}
                aria-hidden="true"
              />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("w-full h-10 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent", !isCollapsed && "justify-between px-2")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : (
            <>
              <span className="text-sm font-medium">Collapse</span>
              <ChevronLeft className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
