import * as React from 'react'
import { Calendar, MessageSquare, Clock, ArrowUp, ArrowRight, ArrowDown, Paperclip, MoreHorizontal, User } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'
import type { Task } from './types'

interface TaskModalProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskModal({ task, open, onOpenChange }: TaskModalProps) {
  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background">
        {/* Header Ribbon */}
        <div className="bg-secondary/50 px-6 py-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1",
              task.priority === 'high' ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
              task.priority === 'medium' ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
              "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            )}>
              {task.priority === 'high' && <ArrowUp className="h-3.5 w-3.5" />}
              {task.priority === 'medium' && <ArrowRight className="h-3.5 w-3.5" />}
              {task.priority === 'low' && <ArrowDown className="h-3.5 w-3.5" />}
              {task.priority} Priority
            </span>
            <span className="px-2.5 py-1 rounded-md bg-background border text-xs font-medium text-muted-foreground capitalize">
              {task.status.replace('-', ' ')}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Main Content */}
          <div className="col-span-2 p-6 max-h-[70vh] overflow-y-auto">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl leading-tight">{task.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {task.description}
                  <br/><br/>
                  This is a simulated longer description for the modal view to demonstrate the layout. You can add rich text rendering here in the future to support bold, italics, and lists.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Comments (2)
                </h4>
                <div className="space-y-4">
                  {/* Mock Comments */}
                  <div className="flex gap-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent" className="h-8 w-8 rounded-full bg-muted" alt="" />
                    <div className="bg-secondary/40 rounded-2xl rounded-tl-sm p-3 text-sm flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">Alex Morgan</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-muted-foreground">I'll start working on this right after lunch. The initial designs are looking good.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img src={task.assignee.avatar} className="h-8 w-8 rounded-full bg-muted" alt="" />
                    <div className="bg-secondary/40 rounded-2xl rounded-tl-sm p-3 text-sm flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-foreground">{task.assignee.name}</span>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      <p className="text-muted-foreground">Awesome! Let me know if you need any assets from the design team.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">You</div>
                  <div className="flex-1 relative">
                    <input type="text" placeholder="Write a comment..." className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground">
                      <Paperclip className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="p-6 bg-secondary/10 space-y-8 max-h-[70vh] overflow-y-auto">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Details</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Assignee</p>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={task.assignee.avatar} className="h-5 w-5 rounded-full bg-muted" alt="" />
                      <span className="text-sm font-medium">{task.assignee.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="text-sm font-medium mt-1">{formatDate(task.dueDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Activity Log</h4>
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[9px] before:w-px before:bg-border">
                <div className="relative flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-background border-2 border-primary z-10 flex shrink-0" />
                  <div className="-mt-0.5">
                    <p className="text-xs text-muted-foreground leading-tight"><span className="font-medium text-foreground">Task moved</span> to To Do</p>
                    <p className="text-[10px] text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="relative flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-background border-2 border-border z-10 flex shrink-0" />
                  <div className="-mt-0.5">
                    <p className="text-xs text-muted-foreground leading-tight"><span className="font-medium text-foreground">Alex Morgan</span> created task</p>
                    <p className="text-[10px] text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
