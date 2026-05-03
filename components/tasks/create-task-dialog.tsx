'use client'

import * as React from 'react'
import { Plus, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FloatingInput } from '@/components/ui/floating-input'
import { useToast } from '@/components/ui/toast'
import { motion, AnimatePresence } from 'framer-motion'

export function CreateTaskDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const taskData = {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority') || 'medium',
      status: 'todo',
      dueDate: formData.get('dueDate') || new Date().toISOString().split('T')[0],
    }

    try {
      const res = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })

      if (res.ok) {
        toast({
          title: "Task created",
          description: "Your new task has been added successfully.",
          type: "success"
        })
        setOpen(false)
        // Refresh the page to show new data
        window.location.reload()
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to connect to the server.",
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
          <Button size="sm" className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Create Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl bg-transparent">
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.4
              }}
              className="bg-gradient-to-br from-primary/10 via-background to-background p-6 rounded-3xl"
            >
              <DialogHeader className="mb-6">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-inner">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-xl font-bold tracking-tight">Create New Task</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatingInput 
                  id="title" 
                  name="title" 
                  label="Task Title" 
                  placeholder="e.g., Update brand assets" 
                  required 
                />
                
                <FloatingInput 
                  id="description" 
                  name="description" 
                  label="Description" 
                  placeholder="What needs to be done?" 
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Priority</label>
                    <select 
                      name="priority"
                      className="w-full h-11 rounded-2xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Due Date</label>
                    <input 
                      type="date"
                      name="dueDate"
                      className="w-full h-11 rounded-2xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <DialogFooter className="pt-6 border-t border-border/50">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={isLoading} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/20 px-8 rounded-xl">
                    {isLoading ? "Creating..." : "Create Task"}
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
