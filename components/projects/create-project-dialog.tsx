'use client'

import * as React from 'react'
import { Plus, Loader2 } from 'lucide-react'
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

export function CreateProjectDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

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
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Add a new project to start organizing tasks with your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5 py-4">
          <FloatingInput
            id="title"
            label="Project Title"
            required
            autoFocus
            disabled={isLoading}
          />
          <FloatingInput
            id="description"
            label="Description (Optional)"
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="dueDate"
              label="Due Date"
              type="date"
              className="[&::-webkit-calendar-picker-indicator]:opacity-50"
              disabled={isLoading}
            />
            {/* Simple input for priority placeholder */}
            <FloatingInput
              id="priority"
              label="Priority"
              defaultValue="High"
              disabled={isLoading}
            />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
