'use client'

import * as React from 'react'
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  AlertCircle,
  MoreHorizontal,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Mock Data
const stats = [
  { name: 'Total Tasks', value: '124', icon: ListTodo, change: '+12%', trend: 'up' },
  { name: 'Completed', value: '86', icon: CheckCircle2, change: '+24%', trend: 'up' },
  { name: 'In Progress', value: '32', icon: Clock, change: '-4%', trend: 'down' },
  { name: 'Overdue', value: '6', icon: AlertCircle, change: '+2', trend: 'down', alert: true },
]

const recentActivity = [
  { id: 1, user: 'Sarah Jenks', action: 'completed task', target: 'Update design system', time: '2 hours ago', avatar: 'Sarah' },
  { id: 2, user: 'Mike Ross', action: 'commented on', target: 'API Integration', time: '4 hours ago', avatar: 'Mike' },
  { id: 3, user: 'You', action: 'created a new project', target: 'Q3 Marketing', time: 'Yesterday', avatar: 'Felix' },
  { id: 4, user: 'Anna Lee', action: 'assigned you to', target: 'Client Presentation', time: 'Yesterday', avatar: 'Anna' },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Download Report</Button>
          <Button>Create Task</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card 
            key={stat.name} 
            className={cn(
              "overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-md",
              stat.alert && "border-destructive/50 shadow-destructive/10"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.alert ? "text-destructive" : "text-muted-foreground")} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <p className="text-xs flex items-center gap-1 text-muted-foreground">
                    <span className={cn(
                      "flex items-center font-medium",
                      stat.trend === 'up' ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {stat.trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingUp className="mr-1 h-3 w-3 rotate-180" />}
                      {stat.change}
                    </span>
                    from last month
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Chart Area */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Task Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Your team's task completion over the last 7 days.</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-[300px] w-full items-end gap-2 px-2">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <div key={i} className="w-full bg-muted animate-pulse rounded-t-md" style={{ height: `${h}%` }} />
                ))}
              </div>
            ) : (
              <div className="h-[300px] w-full">
                {/* CSS Custom Bar Chart */}
                <div className="flex h-full items-end gap-3 px-2 pt-6">
                  {[
                    { day: 'Mon', tasks: 12 },
                    { day: 'Tue', tasks: 18 },
                    { day: 'Wed', tasks: 15 },
                    { day: 'Thu', tasks: 24 },
                    { day: 'Fri', tasks: 20 },
                    { day: 'Sat', tasks: 8 },
                    { day: 'Sun', tasks: 10 },
                  ].map((data, i) => {
                    const height = (data.tasks / 24) * 100;
                    return (
                      <div key={data.day} className="group relative flex w-full flex-col items-center justify-end h-full">
                        {/* Tooltip */}
                        <div className="absolute -top-10 scale-0 rounded-lg bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                          {data.tasks} tasks
                        </div>
                        {/* Bar */}
                        <div 
                          className="w-full rounded-t-lg bg-primary/20 transition-all duration-500 group-hover:bg-primary"
                          style={{ height: `${height}%` }}
                        >
                          <div 
                            className="w-full rounded-t-lg bg-primary/80 transition-all duration-1000 delay-100"
                            style={{ height: '0%', animation: `growUp 1s ease-out forwards ${i * 0.1}s` }}
                          />
                        </div>
                        <span className="mt-3 text-xs text-muted-foreground font-medium">{data.day}</span>
                      </div>
                    )
                  })}
                </div>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes growUp {
                    from { height: 0%; }
                    to { height: 100%; }
                  }
                `}} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto pr-2">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex gap-4">
                    <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />
                    <div className="space-y-2 w-full">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {recentActivity.map((activity, i) => (
                  <div key={activity.id} className="relative flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        className="h-8 w-8 z-10 shrink-0 rounded-full bg-background ring-4 ring-background shadow-sm"
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.avatar}&backgroundColor=transparent`}
                        alt=""
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                          <span className="text-muted-foreground font-normal mx-1">{activity.action}</span>
                          <span className="font-semibold text-foreground">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <div className="p-4 pt-0 mt-auto">
            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
              View All Activity <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
