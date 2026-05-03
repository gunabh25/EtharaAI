import * as React from 'react'
import { MoreVertical, Calendar, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

export interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    progress: number
    dueDate: string
    status: 'active' | 'completed' | 'on-hold'
    members: string[]
  }
  view: 'grid' | 'list'
}

export function ProjectCard({ project, view }: ProjectCardProps) {
  const isList = view === 'list'

  if (isList) {
    return (
      <Card className="group flex flex-col sm:flex-row items-center gap-4 p-4 transition-all hover:shadow-soft-md hover:border-primary/20">
        <div className="flex flex-1 flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">{project.title}</h3>
            {project.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          </div>
          <p className="text-sm text-muted-foreground truncate">{project.description}</p>
        </div>
        
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 md:gap-12 shrink-0">
          <div className="flex -space-x-2 shrink-0">
            {project.members.map((avatar, i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted overflow-hidden shrink-0">
                <img src={avatar} alt="Member" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="hidden md:flex w-32 flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 w-24">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(project.dueDate)}
          </div>

          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    )
  }

  // Grid View
  return (
    <Card className="group flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-soft-md hover:border-primary/20">
      <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
            {project.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-end mt-4">
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2">
            {project.members.map((avatar, i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-card bg-muted overflow-hidden shrink-0 transition-transform hover:scale-110 hover:z-10">
                <img src={avatar} alt="Member" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(project.dueDate)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
