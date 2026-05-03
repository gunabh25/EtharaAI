'use client'

import * as React from 'react'
import { Grid, List, Search, Filter, FolderPlus } from 'lucide-react'
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

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track your team's ongoing projects.</p>
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
              className="pl-9 h-9 w-full bg-background" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center rounded-lg border bg-background p-1 w-full sm:w-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('grid')}
            className={cn("h-7 px-3", view === 'grid' && "bg-muted shadow-sm")}
          >
            <Grid className="mr-2 h-4 w-4" />
            Grid
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('list')}
            className={cn("h-7 px-3", view === 'list' && "bg-muted shadow-sm")}
          >
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {/* Projects Content */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <FolderPlus className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
            {searchQuery 
              ? `We couldn't find any projects matching "${searchQuery}". Try adjusting your search.`
              : "Get started by creating your first project to organize tasks with your team."}
          </p>
          {!searchQuery && <CreateProjectDialog />}
        </div>
      ) : (
        <div className={cn(
          "grid gap-4",
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
