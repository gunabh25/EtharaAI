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
import { useToast } from '@/components/ui/toast'

interface CreateProjectDialogProps {
  children?: React.ReactNode
  onProjectCreated?: () => void
}

export function CreateProjectDialog({ children, onProjectCreated }: CreateProjectDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')
    const description = formData.get('description')
    const dueDate = formData.get('dueDate')

    try {
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-backend-production.up.railway.app'
      const res = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate ? new Date(dueDate as string) : undefined,
          status: 'active',
          progress: 0
        })
      })

      if (res.ok) {
        toast({
          title: "Project created",
          description: "Your new project has been successfully added.",
          type: "success"
        })
        setOpen(false)
        onProjectCreated?.()
      } else {
        throw new Error("Failed to create project")
      }
    } catch (err) {
      toast({
        title: "Creation failed",
        description: "There was an error creating your project. Please try again.",
        type: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Add a new project to start organizing tasks with your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5 py-4">
          <FloatingInput
            id="title"
            name="title"
            label="Project Title"
            required
            autoFocus
            disabled={isLoading}
          />
          <FloatingInput
            id="description"
            name="description"
            label="Description (Optional)"
            disabled={isLoading}
          />
          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="dueDate"
              name="dueDate"
              label="Due Date"
              type="date"
              className="[&::-webkit-calendar-picker-indicator]:opacity-50"
              disabled={isLoading}
            />
            <FloatingInput
              id="priority"
              name="priority"
              label="Priority"
              defaultValue="High"
              disabled={isLoading}
            />
          </div>
          <DialogFooter className="pt-4 gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/20">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
