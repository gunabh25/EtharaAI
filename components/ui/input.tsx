import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-xl border bg-background px-3 py-2 text-sm shadow-soft-sm transition-all duration-150',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Default
          !error && !success && 'border-input focus-visible:ring-ring',
          // Error state
          error && 'border-destructive bg-destructive/5 focus-visible:ring-destructive',
          // Success state
          success && 'border-green-500 bg-green-500/5 focus-visible:ring-green-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
