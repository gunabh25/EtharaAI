'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
    
    // Check system preference if no class is present
    if (!document.documentElement.classList.contains('dark') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('dark')
      setTheme('dark')
    } else {
      root.classList.remove('dark')
      setTheme('light')
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="relative text-muted-foreground hover:text-foreground overflow-hidden"
    >
      <div className={`transition-transform duration-500 ${theme === 'dark' ? '-translate-y-10' : 'translate-y-0'}`}>
        <Moon className="h-5 w-5" />
      </div>
      <div className={`absolute transition-transform duration-500 ${theme === 'dark' ? 'translate-y-0' : 'translate-y-10'}`}>
        <Sun className="h-5 w-5" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
