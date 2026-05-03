import * as React from 'react'
import { Filter, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KanbanBoard } from '@/components/tasks/kanban-board'

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-7xl h-[calc(100vh-6rem)] flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks Board</h1>
          <p className="text-muted-foreground">Manage your sprint tasks using the Kanban board.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Filter tasks..." 
              className="pl-9 h-9 w-full bg-background" 
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button className="ml-2 h-9">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  )
}
