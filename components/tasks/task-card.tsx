import * as React from 'react'
import { Calendar, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn, formatDate } from '@/lib/utils'
import type { Task } from './types'

interface TaskCardProps {
  task: Task
  onDragStart: (e: React.DragEvent) => void
  onDragEnd: (e: React.DragEvent) => void
  onClick: () => void
}

export function TaskCard({ task, onDragStart, onDragEnd, onClick }: TaskCardProps) {
  return (
    <Card 
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="p-4 cursor-grab active:cursor-grabbing hover:shadow-soft-md hover:border-primary/30 transition-all group animate-in fade-in zoom-in-95 duration-200 bg-card"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
          task.priority === 'high' ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
          task.priority === 'medium' ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
          "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        )}>
          {task.priority === 'high' && <ArrowUp className="h-3 w-3" />}
          {task.priority === 'medium' && <ArrowRight className="h-3 w-3" />}
          {task.priority === 'low' && <ArrowDown className="h-3 w-3" />}
          {task.priority}
        </div>
      </div>

      <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{task.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(task.dueDate)}
        </div>
        
        <img
          src={task.assignee.avatar}
          alt={task.assignee.name}
          title={task.assignee.name}
          className="h-6 w-6 rounded-full bg-muted border border-background shadow-sm"
        />
      </div>
    </Card>
  )
}
