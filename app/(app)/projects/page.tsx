'use client'

import * as React from 'react'
import { Grid, List, Search, Filter, FolderPlus, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectCard } from '@/components/projects/project-card'
import { CreateProjectDialog } from '@/components/projects/create-project-dialog'
import { cn } from '@/lib/utils'

// Mock Data
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Overhaul the marketing website with the new brand guidelines and modern tech stack.',
    progress: 75,
    dueDate: '2026-06-15',
    status: 'active' as const,
    members: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=transparent',
    ]
  },
  {
    id: '2',
    title: 'Mobile App V2.0',
    description: 'Develop the highly anticipated version 2 of our iOS and Android applications.',
    progress: 32,
    dueDate: '2026-08-01',
    status: 'active' as const,
    members: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=transparent',
    ]
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Integrate the new payment gateway into the checkout pipeline.',
    progress: 100,
    dueDate: '2026-05-01',
    status: 'completed' as const,
    members: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=transparent',
    ]
  },
  {
    id: '4',
    title: 'Q3 Marketing Campaign',
    description: 'Plan and execute the advertising strategy for the upcoming holiday season.',
    progress: 12,
    dueDate: '2026-09-30',
    status: 'active' as const,
    members: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=transparent',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=transparent',
    ]
  }
]

export default function ProjectsPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [projects] = React.useState(MOCK_PROJECTS)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your team's ongoing projects.</p>
        </div>
        <CreateProjectDialog />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search projects..." 
              className="pl-9 h-10 w-full bg-background transition-shadow focus-visible:ring-primary/20" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center rounded-lg border bg-background p-1 w-full sm:w-auto shadow-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('grid')}
            className={cn("h-8 px-3", view === 'grid' && "bg-muted shadow-sm font-medium")}
          >
            <Grid className="mr-2 h-4 w-4" />
            Grid
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('list')}
            className={cn("h-8 px-3", view === 'list' && "bg-muted shadow-sm font-medium")}
          >
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {/* Projects Content */}
      {isLoading ? (
        <div className={cn(
          "grid gap-4 mt-6",
          view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn(
              "rounded-2xl border border-border bg-card p-5 animate-pulse",
              view === 'grid' ? "h-48 flex flex-col justify-between" : "h-24 flex items-center"
            )}>
              <div className="space-y-3 w-full">
                <div className="h-4 w-1/2 bg-muted rounded-md" />
                <div className="h-3 w-full bg-muted rounded-md" />
                {view === 'grid' && <div className="h-3 w-3/4 bg-muted rounded-md" />}
              </div>
              <div className={cn("flex justify-between w-full", view === 'grid' ? "mt-4" : "ml-4 max-w-[200px]")}>
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-card" />
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-card" />
                </div>
                <div className="h-4 w-1/4 bg-muted rounded-md self-end" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="relative overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-16 text-center mt-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner mb-6 backdrop-blur-xl border border-white/10">
            <Compass className="h-10 w-10 text-primary" />
          </div>
          
          <h3 className="relative z-10 text-xl font-bold tracking-tight">No projects found</h3>
          <p className="relative z-10 text-muted-foreground mt-2 mb-8 max-w-md">
            {searchQuery 
              ? `We couldn't find any projects matching "${searchQuery}". Try adjusting your search filters.`
              : "Get started by creating your first project. Organize your tasks, invite your team, and track your progress in one place."}
          </p>
          
          <div className="relative z-10">
            {!searchQuery && <CreateProjectDialog />}
          </div>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4 mt-6",
          view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationFillMode: 'both', animationDelay: `${idx * 100}ms` }}
            >
              <ProjectCard project={project} view={view} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
