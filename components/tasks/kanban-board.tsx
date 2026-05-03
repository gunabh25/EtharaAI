'use client'

import * as React from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TaskCard } from './task-card'
import { TaskModal } from './task-modal'

export type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignee: {
    name: string
    avatar: string
  }
}

const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Design user onboarding flow',
    description: 'Create wireframes and high-fidelity mockups for the new user onboarding experience.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-05-10',
    assignee: { name: 'Sarah Jenks', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=transparent' }
  },
  {
    id: 't-2',
    title: 'Update privacy policy',
    description: 'Review and update the privacy policy to comply with the new regulations.',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-05-15',
    assignee: { name: 'Alex Morgan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent' }
  },
  {
    id: 't-3',
    title: 'Implement drag and drop',
    description: 'Build a custom drag and drop kanban board interface.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2026-05-04',
    assignee: { name: 'Mike Ross', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=transparent' }
  },
  {
    id: 't-4',
    title: 'Fix navigation bug',
    description: 'The sidebar sometimes overlaps with the main content on mobile screens.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-05-01',
    assignee: { name: 'Anna Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna&backgroundColor=transparent' }
  }
]

export function KanbanBoard() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS)
  const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(null)
  const [activeDropZone, setActiveDropZone] = React.useState<Task['status'] | null>(null)
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = 'move'
    
    // Add opacity to dragged item after a tiny delay so the drag ghost remains opaque
    const target = e.target as HTMLElement
    setTimeout(() => {
      target.classList.add('opacity-50')
    }, 0)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.classList.remove('opacity-50')
    setDraggedTaskId(null)
    setActiveDropZone(null)
  }

  const handleDragOver = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault() // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move'
    if (activeDropZone !== status) {
      setActiveDropZone(status)
    }
  }

  const handleDragLeave = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault()
    if (activeDropZone === status) {
      setActiveDropZone(null)
    }
  }

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault()
    setActiveDropZone(null)
    
    if (!draggedTaskId) return

    setTasks(prev => prev.map(t => 
      t.id === draggedTaskId ? { ...t, status } : t
    ))
  }

  const columns: { id: Task['status']; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 h-full items-start overflow-x-auto overflow-y-hidden pb-4">
        {columns.map(col => {
          const columnTasks = tasks.filter(t => t.status === col.id)
          const isDropZone = activeDropZone === col.id

          return (
            <div 
              key={col.id}
              className={cn(
                "flex-shrink-0 w-full md:w-[350px] flex flex-col h-full max-h-full bg-secondary/30 rounded-2xl p-4 transition-all duration-200 border-2",
                isDropZone ? "border-primary/50 bg-secondary/50 shadow-inner" : "border-transparent"
              )}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{col.title}</h3>
                  <span className="bg-background text-muted-foreground text-xs px-2 py-0.5 rounded-full font-medium shadow-sm">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-[150px] pb-2 custom-scrollbar">
                {columnTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
                {isDropZone && (
                  <div className="h-28 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 transition-all duration-200 animate-in fade-in" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <TaskModal 
        task={selectedTask} 
        open={!!selectedTask} 
        onOpenChange={(open) => !open && setSelectedTask(null)} 
      />
    </>
  )
}
