'use client'

import * as React from 'react'
import { MoreVertical, Calendar, CheckCircle2, Pencil, Trash2, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'
import Cookies from 'js-cookie'
import { useToast } from '@/components/ui/toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FloatingInput } from '@/components/ui/floating-input'

export interface ProjectCardProps {
  project: {
    id: string
    _id?: string
    title: string
    description: string
    progress: number
    dueDate: string
    status: 'active' | 'completed' | 'on-hold'
    members: string[]
  }
  view: 'grid' | 'list'
  onUpdate?: () => void
}

export function ProjectCard({ project, view, onUpdate }: ProjectCardProps) {
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [editForm, setEditForm] = React.useState({
    title: project.title,
    description: project.description,
    progress: project.progress
  })

  const isList = view === 'list'

  const handleUpdate = async () => {
    setIsSaving(true)
    try {
      const token = Cookies.get('auth_token')
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-production-6f63.up.railway.app'
      const res = await fetch(`${apiUrl}/api/projects/${project.id || project._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      })

      const data = await res.json()

      if (res.ok) {
        setIsEditDialogOpen(false)
        toast({
          title: "Project updated",
          description: "Your changes have been saved successfully.",
          type: "success"
        })
        onUpdate?.()
      } else {
        throw new Error(data.message || `Error ${res.status}: Failed to update`)
      }
    } catch (e: any) {
      toast({
        title: "Update failed",
        description: e.message || "Could not save changes. Please try again.",
        type: "error"
      })
      console.error("Failed to update project", e)
    } finally {
      setIsSaving(false)
    }
  }

  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2 shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-soft-lg">
        <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" /> Edit Details
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const editDialog = (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update the project information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <FloatingInput 
            label="Project Title" 
            value={editForm.title} 
            onChange={e => setEditForm({...editForm, title: e.target.value})}
          />
          <FloatingInput 
            label="Description" 
            value={editForm.description} 
            onChange={e => setEditForm({...editForm, description: e.target.value})}
          />
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Progress ({editForm.progress}%)</label>
            <input 
              type="range" 
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" 
              value={editForm.progress}
              onChange={e => setEditForm({...editForm, progress: parseInt(e.target.value)})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={isSaving} className="shadow-lg shadow-primary/20">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  if (isList) {
    return (
      <>
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
            {menu}
          </div>
        </Card>
        {editDialog}
      </>
    )
  }

  return (
    <>
      <Card className="group flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-soft-md hover:border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-5 pb-0 flex flex-row items-start justify-between">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
              {project.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          {menu}
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
      {editDialog}
    </>
  )
}
