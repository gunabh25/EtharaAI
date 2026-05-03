'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/80 px-4 backdrop-blur-lg md:hidden">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard')
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 transition-all duration-200",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn(
              "flex h-8 w-12 items-center justify-center rounded-2xl transition-all",
              isActive ? "bg-primary/10" : "bg-transparent"
            )}>
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
