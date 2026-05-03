'use client'

import * as React from 'react'
import { Search, Filter, Mail, MoreHorizontal, Shield, User as UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddMemberDialog } from '@/components/team/add-member-dialog'
import { cn } from '@/lib/utils'

// Mock Data
const MOCK_TEAM = [
  { id: '1', name: 'Alex Morgan', email: 'alex@ethara.ai', role: 'Owner', tasks: 12, avatar: 'Felix', status: 'active' },
  { id: '2', name: 'Sarah Jenks', email: 'sarah@ethara.ai', role: 'Admin', tasks: 8, avatar: 'Sarah', status: 'active' },
  { id: '3', name: 'Mike Ross', email: 'mike@ethara.ai', role: 'Member', tasks: 24, avatar: 'Mike', status: 'offline' },
  { id: '4', name: 'Anna Lee', email: 'anna@ethara.ai', role: 'Member', tasks: 5, avatar: 'Anna', status: 'active' },
  { id: '5', name: 'John Doe', email: 'john@ethara.ai', role: 'Guest', tasks: 2, avatar: 'John', status: 'invited' },
]

const RoleBadge = ({ role }: { role: string }) => {
  switch (role.toLowerCase()) {
    case 'owner':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"><Shield className="h-3.5 w-3.5" /> {role}</span>
    case 'admin':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20"><Shield className="h-3.5 w-3.5" /> {role}</span>
    case 'member':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-secondary text-secondary-foreground border border-border"><UserIcon className="h-3.5 w-3.5" /> {role}</span>
    default:
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border text-muted-foreground">{role}</span>
  }
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [team] = React.useState(MOCK_TEAM)

  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Settings</h1>
          <p className="text-muted-foreground">Manage your team members and their account permissions here.</p>
        </div>
        <AddMemberDialog />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-[350px]">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by name, email, or role..." 
              className="pl-9 h-10 w-full bg-background transition-shadow focus-visible:ring-primary/20" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredTeam.length}</span> members
        </div>
      </div>

      {/* Table / Card Hybrid Layout */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/30 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-2">Active Tasks</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* List Body */}
        <div className="divide-y divide-border">
          {filteredTeam.map((member, idx) => (
            <div 
              key={member.id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors animate-in fade-in"
              style={{ animationFillMode: 'both', animationDelay: `${idx * 50}ms` }}
            >
              {/* Member Info */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="relative shrink-0">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}&backgroundColor=transparent`} 
                    alt={member.name}
                    className="h-10 w-10 rounded-full bg-muted border border-border"
                  />
                  <span className={cn(
                    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                    member.status === 'active' ? "bg-emerald-500" :
                    member.status === 'invited' ? "bg-amber-500" : "bg-slate-400"
                  )} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-sm text-foreground truncate">{member.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{member.email}</span>
                </div>
              </div>

              {/* Role */}
              <div className="col-span-1 md:col-span-3 flex items-center mt-3 md:mt-0">
                <div className="md:hidden text-xs font-medium text-muted-foreground w-20">Role</div>
                <RoleBadge role={member.role} />
              </div>

              {/* Tasks */}
              <div className="col-span-1 md:col-span-2 flex items-center mt-3 md:mt-0">
                <div className="md:hidden text-xs font-medium text-muted-foreground w-20">Tasks</div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-semibold">{member.tasks}</span>
                  <span className="text-muted-foreground text-xs">assigned</span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-1 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-0">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {filteredTeam.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
              <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No members found</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">
                We couldn't find anyone matching "{searchQuery}". Try a different search term or invite a new member.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
