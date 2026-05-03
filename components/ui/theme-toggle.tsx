'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground overflow-hidden">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
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
      <div className={`transition-transform duration-500 ${resolvedTheme === 'dark' ? '-translate-y-10' : 'translate-y-0'}`}>
        <Moon className="h-5 w-5" />
      </div>
      <div className={`absolute transition-transform duration-500 ${resolvedTheme === 'dark' ? 'translate-y-0' : 'translate-y-10'}`}>
        <Sun className="h-5 w-5" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
