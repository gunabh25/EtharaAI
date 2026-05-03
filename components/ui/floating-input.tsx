import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              'peer flex h-14 w-full rounded-xl border bg-background px-4 pb-2 pt-5 text-sm shadow-soft-sm transition-all duration-200 outline-none',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5'
                : 'border-input hover:border-primary/50',
              className
            )}
            ref={ref}
            placeholder=" " // Important for peer-placeholder-shown to work
            {...props}
          />
          <label
            className={cn(
              'absolute left-4 top-4 z-10 origin-[0] -translate-y-2 scale-75 transform cursor-text text-sm text-muted-foreground transition-all duration-200',
              'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2 peer-focus:scale-75',
              'pointer-events-none',
              error ? 'text-destructive' : 'peer-focus:text-primary'
            )}
          >
            {label}
          </label>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = 'FloatingInput'

export { FloatingInput }
