'use client'

import * as React from 'react'
import { UserPlus, Loader2, Mail, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingInput } from '@/components/ui/floating-input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function AddMemberDialog() {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [role, setRole] = React.useState('Member')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Send an invitation email to add a new member to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 py-4">
          
          <FloatingInput
            id="email"
            type="email"
            label="Email address"
            required
            autoFocus
            disabled={isLoading}
          />
          
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Role & Permissions
            </label>
            <div className="grid grid-cols-1 gap-3">
              <label 
                className={`relative flex cursor-pointer rounded-xl border p-4 transition-all hover:bg-accent/50 ${role === 'Admin' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border'}`}
              >
                <input 
                  type="radio" 
                  name="role" 
                  value="Admin" 
                  checked={role === 'Admin'}
                  onChange={() => setRole('Admin')}
                  className="sr-only"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${role === 'Admin' ? 'bg-primary/10' : 'bg-secondary'}`}>
                      <ShieldAlert className={`h-5 w-5 ${role === 'Admin' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Administrator</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Full access to settings and billing.</span>
                    </div>
                  </div>
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${role === 'Admin' ? 'border-primary' : 'border-muted-foreground'}`}>
                    {role === 'Admin' && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                </div>
              </label>

              <label 
                className={`relative flex cursor-pointer rounded-xl border p-4 transition-all hover:bg-accent/50 ${role === 'Member' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border'}`}
              >
                <input 
                  type="radio" 
                  name="role" 
                  value="Member" 
                  checked={role === 'Member'}
                  onChange={() => setRole('Member')}
                  className="sr-only"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${role === 'Member' ? 'bg-primary/10' : 'bg-secondary'}`}>
                      <Mail className={`h-5 w-5 ${role === 'Member' ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Standard Member</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Can view and create tasks/projects.</span>
                    </div>
                  </div>
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${role === 'Member' ? 'border-primary' : 'border-muted-foreground'}`}>
                    {role === 'Member' && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
