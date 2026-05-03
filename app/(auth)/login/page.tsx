'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingInput } from '@/components/ui/floating-input'
import { PasswordInput } from '@/components/ui/password-input'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; general?: string }>({})

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
    if (!password) {
      newErrors.password = 'Password is required'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Use local dev port or environment variable
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        // Store token in cookie for middleware
        Cookies.set('auth_token', data.token, { expires: 30 }) // 30 days
        Cookies.set('user_role', data.role, { expires: 30 })
        
        router.push('/dashboard')
        router.refresh()
      } else {
        setErrors({ general: data.message || 'Invalid credentials' })
      }
    } catch (err) {
      setErrors({ general: 'Failed to connect to the server. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      {errors.general && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in shake-1">
          {errors.general}
        </div>
      )}

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

        <Button type="submit" className="w-full h-12 text-base mt-2 shadow-lg shadow-primary/20" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
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
