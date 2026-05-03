'use client'

import * as React from 'react'
import { Calendar, MessageSquare, ArrowUp, ArrowRight, ArrowDown, Paperclip, MoreHorizontal, User, Send, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'
import type { Task, Comment } from './types'

interface TaskModalProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskModal({ task: initialTask, open, onOpenChange }: TaskModalProps) {
  const [commentText, setCommentText] = React.useState('')
  const [localComments, setLocalComments] = React.useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Sync local comments when task changes
  React.useEffect(() => {
    if (initialTask) {
      setLocalComments(initialTask.comments || [])
    }
  }, [initialTask])

  if (!initialTask) return null

  const handleSubmitComment = async () => {
    if (!commentText.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`http://localhost:5001/api/tasks/${initialTask.id || initialTask._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentText,
          userName: 'Alex Morgan', // Mocking current user name for now
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent'
        })
      })

      if (res.ok) {
        const updatedComments = await res.json()
        setLocalComments(updatedComments)
        setCommentText('')
      }
    } catch (e) {
      console.error("Failed to post comment", e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitComment()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background rounded-3xl border-none shadow-2xl">
        {/* Header Ribbon */}
        <div className="bg-secondary/30 px-6 py-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1",
              initialTask.priority === 'high' ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
              initialTask.priority === 'medium' ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
              "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            )}>
              {initialTask.priority === 'high' && <ArrowUp className="h-3.5 w-3.5" />}
              {initialTask.priority === 'medium' && <ArrowRight className="h-3.5 w-3.5" />}
              {initialTask.priority === 'low' && <ArrowDown className="h-3.5 w-3.5" />}
              {initialTask.priority} Priority
            </span>
            <span className="px-2.5 py-1 rounded-md bg-background border text-xs font-medium text-muted-foreground capitalize">
              {initialTask.status.replace('-', ' ')}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Main Content */}
          <div className="col-span-2 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl font-bold leading-tight tracking-tight">{initialTask.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-foreground/80">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {initialTask.description || "No description provided for this task."}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Comments ({localComments.length})
                  </h4>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {localComments.length === 0 ? (
                    <div className="text-center py-8 bg-secondary/20 rounded-2xl border border-dashed border-border">
                      <p className="text-xs text-muted-foreground">No comments yet. Start the conversation!</p>
                    </div>
                  ) : localComments.map((cmt, idx) => (
                    <div key={idx} className="flex gap-3 group animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                      <img src={cmt.userAvatar} className="h-8 w-8 rounded-full bg-muted border border-border shadow-sm" alt="" />
                      <div className="bg-secondary/40 group-hover:bg-secondary/60 transition-colors rounded-2xl rounded-tl-sm p-3 text-sm flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-foreground">{cmt.userName}</span>
                          <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(cmt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{cmt.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] border border-primary/20 shadow-inner">YOU</div>
                  <div className="flex-1 relative group">
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      className="w-full text-sm bg-background border border-input rounded-xl px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-soft-sm group-hover:border-primary/30" 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isSubmitting}
                    />
                    <div className="absolute right-1 top-1 flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={handleSubmitComment}
                        variant="default" 
                        size="icon" 
                        className={cn(
                          "h-8 w-8 rounded-lg transition-all",
                          commentText.trim() && !isSubmitting 
                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100" 
                            : "bg-muted text-muted-foreground scale-90 opacity-50"
                        )}
                        disabled={!commentText.trim() || isSubmitting}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="p-6 bg-secondary/10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Task Details</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg border border-border shadow-sm">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Assignee</p>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={initialTask.assignee.avatar} className="h-5 w-5 rounded-full bg-muted shadow-sm" alt="" />
                      <span className="text-sm font-semibold">{initialTask.assignee.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg border border-border shadow-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Due Date</p>
                    <p className="text-sm font-semibold mt-1">{formatDate(initialTask.dueDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">History</h4>
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-[9px] before:w-px before:bg-border/60">
                <div className="relative flex gap-3 group">
                  <div className="h-5 w-5 rounded-full bg-background border-2 border-primary z-10 flex shrink-0 shadow-sm" />
                  <div className="-mt-0.5">
                    <p className="text-xs text-muted-foreground leading-tight"><span className="font-bold text-foreground">Task status</span> changed to {initialTask.status}</p>
                    <p className="text-[10px] font-medium text-muted-foreground/60 mt-1 uppercase">Just now</p>
                  </div>
                </div>
                <div className="relative flex gap-3 group">
                  <div className="h-5 w-5 rounded-full bg-background border-2 border-border z-10 flex shrink-0 shadow-sm" />
                  <div className="-mt-0.5">
                    <p className="text-xs text-muted-foreground leading-tight"><span className="font-bold text-foreground">Alex Morgan</span> created this task</p>
                    <p className="text-[10px] font-medium text-muted-foreground/60 mt-1 uppercase">Yesterday</p>
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
