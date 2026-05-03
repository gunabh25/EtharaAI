'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingInput } from '@/components/ui/floating-input'
import { PasswordInput } from '@/components/ui/password-input'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Basic validation
    let hasError = false
    const newErrors: { email?: string; password?: string } = {}

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
      hasError = true
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <FloatingInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />
        
        <div className="space-y-2">
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            error={errors.password}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : null}
          Sign In
          {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span>Don't have an account?</span>
        <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Create an account
        </Link>
      </div>
    </div>
  )
}
