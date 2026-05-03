'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingInput } from '@/components/ui/floating-input'
import { PasswordInput } from '@/components/ui/password-input'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string }>({})

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Basic validation
    let hasError = false
    const newErrors: { name?: string; email?: string; password?: string } = {}

    if (!name || name.length < 2) {
      newErrors.name = 'Please enter your full name'
      hasError = true
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
      hasError = true
    }
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
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
        <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join EtharaAI to start managing your workflow.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <FloatingInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          error={errors.name}
          autoComplete="name"
          disabled={isLoading}
        />
        
        <FloatingInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />
        
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          error={errors.password}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : null}
          Create account
          {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  )
}
