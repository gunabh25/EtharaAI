'use client'

import * as React from 'react'
import { Grid, List, Search, Filter, Compass, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProjectCard } from '@/components/projects/project-card'
import { CreateProjectDialog } from '@/components/projects/create-project-dialog'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [projects, setProjects] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchProjects = async () => {
    try {
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-backend-production.up.railway.app'
      const res = await fetch(`${apiUrl}/api/projects`)
      if (res.ok) {
        const data = await res.json()
        const mappedData = data.map((p: any) => ({
          ...p,
          id: p._id,
          members: p.members?.map((m: any) => m.avatar) || []
        }))
        setProjects(mappedData)
      }
    } catch (e) {
      console.error("Failed to fetch projects", e)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your team's ongoing projects.</p>
        </div>
        <CreateProjectDialog onProjectCreated={fetchProjects} />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search projects..." 
              className="pl-9 h-10 w-full bg-background/50 transition-shadow focus-visible:ring-primary/20" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center rounded-lg border bg-background/50 backdrop-blur-sm p-1 w-full sm:w-auto shadow-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('grid')}
            className={cn("h-8 px-3 transition-all", view === 'grid' && "bg-muted shadow-sm font-medium text-primary")}
          >
            <Grid className="mr-2 h-4 w-4" />
            Grid
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setView('list')}
            className={cn("h-8 px-3 transition-all", view === 'list' && "bg-muted shadow-sm font-medium text-primary")}
          >
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className={cn(
          "grid gap-4 mt-6",
          view === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse h-48" />
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
              ? `We couldn't find any projects matching "${searchQuery}".`
              : "Get started by creating your first project."}
          </p>
          <div className="relative z-10">
            {!searchQuery && <CreateProjectDialog onProjectCreated={fetchProjects} />}
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
              <ProjectCard project={project} view={view} onUpdate={fetchProjects} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
