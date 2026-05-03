'use client'

import * as React from 'react'
import { 
  CheckSquare, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  RefreshCcw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog'
import { cn } from '@/lib/utils'

// Icon mapping helper
const IconMap = {
  CheckSquare,
  CheckCircle,
  Clock,
  AlertCircle
}

export default function DashboardPage() {
  const [data, setData] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-backend-production.up.railway.app'
      const res = await fetch(`${apiUrl}/api/dashboard`)
      if (res.ok) {
        const result = await res.json()
        setData(result)
      } else {
        setError("Failed to fetch dashboard data")
      }
    } catch (e) {
      console.error("Dashboard fetch failed", e)
      setError("Cannot connect to backend server. Make sure node server.js is running.")
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
            <div className="h-4 w-64 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-card border border-border animate-pulse rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-7">
          <div className="col-span-4 h-[400px] bg-card border border-border animate-pulse rounded-2xl" />
          <div className="col-span-3 h-[400px] bg-card border border-border animate-pulse rounded-2xl" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="h-20 w-20 rounded-3xl bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Unable to load dashboard</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {error || "Something went wrong while connecting to your real-time database."}
        </p>
        <div className="flex items-center gap-3 pt-4">
          <Button onClick={fetchDashboardData} variant="outline" size="lg" className="rounded-xl">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <CreateTaskDialog>
            <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Create First Task
            </Button>
          </CreateTaskDialog>
        </div>
        <div className="mt-8 p-4 rounded-2xl bg-secondary/50 border border-border text-xs text-muted-foreground max-w-sm">
          <p className="font-semibold mb-1 uppercase tracking-wider">Troubleshooting Tip:</p>
          Ensure you have started your MongoDB backend by running <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">node server.js</code> in the <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">backend</code> directory.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <CreateTaskDialog />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat: any, idx: number) => {
          const Icon = IconMap[stat.icon as keyof typeof IconMap] || CheckSquare
          return (
            <Card key={idx} className="group hover:border-primary/30 transition-all hover:shadow-soft-md overflow-hidden relative">
              <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                stat.alert ? "bg-destructive" : "bg-primary"
              )} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </CardTitle>
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  stat.alert ? "bg-destructive/10" : "bg-primary/10"
                )}>
                  <Icon className={cn("h-4 w-4", stat.alert ? "text-destructive" : "text-primary")} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={cn(
                  "text-xs mt-1 font-medium",
                  stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {stat.change} <span className="text-muted-foreground font-normal">from last month</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Activity Chart */}
        <Card className="col-span-full lg:col-span-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Task Activity</CardTitle>
              <CardDescription>Your team's task completion over the last 7 days.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-2 pb-6">
            <div className="flex h-[240px] items-end justify-between gap-2 px-4 pt-4">
              {data.chartData.map((day: any, i: number) => {
                const maxCount = Math.max(...data.chartData.map((d: any) => d.count))
                const height = maxCount === 0 ? 0 : (day.count / maxCount) * 100
                return (
                  <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                    <div 
                      className="w-full rounded-t-lg bg-primary/20 group-hover:bg-primary transition-all duration-500 ease-out min-h-[4px]" 
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${i * 100}ms`
                      }} 
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                        {day.count} tasks
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase">{day.day}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-full lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.activity.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-secondary/30 rounded-2xl border border-dashed border-border">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No recent activity</p>
                  <p className="text-xs text-muted-foreground mt-1">Actions in your workspace will appear here.</p>
                </div>
              ) : data.activity.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className="h-9 w-9 rounded-full bg-muted border border-border shadow-sm group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-sm leading-none">
                      <span className="font-semibold text-foreground">{item.user.name}</span>
                      <span className="text-muted-foreground"> {item.action} </span>
                      <span className="font-medium text-primary hover:underline cursor-pointer truncate block sm:inline">{item.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 group text-muted-foreground hover:text-foreground">
              View All Activity <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
