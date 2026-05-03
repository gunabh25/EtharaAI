'use client'

import * as React from 'react'
import { User, Bell, Shield, Moon, Monitor, Sun, Save, DownloadCloud, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { FloatingInput } from '@/components/ui/floating-input'
import { useToast } from '@/components/ui/toast'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Cookies from 'js-cookie'

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  
  // User Profile State
  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    avatar: ''
  })
  
  // UI States
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSaving, setIsSaving] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)
  const [marketingEmails, setMarketingEmails] = React.useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false)

  // Fetch user data
  React.useEffect(() => {
    async function fetchProfile() {
      try {
        const token = Cookies.get('auth_token')
        const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-production-6f63.up.railway.app'
        const res = await fetch(`${apiUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setUser({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            jobTitle: data.jobTitle || '',
            avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.firstName}`
          })
        }
      } catch (e) {
        console.error("Failed to fetch profile", e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const token = Cookies.get('auth_token')
      const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const apiUrl = isLocal ? 'http://localhost:5005' : 'https://etharaai-production-6f63.up.railway.app'
      const res = await fetch(`${apiUrl}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })

      if (res.ok) {
        const updatedUser = await res.json()
        // Update cookies if token is refreshed
        if (updatedUser.token) {
          Cookies.set('auth_token', updatedUser.token)
        }
        toast({
          title: "Profile updated",
          description: "Your changes have been saved to the database.",
          type: "success"
        })
      } else {
        throw new Error("Failed to update")
      }
    } catch (e) {
      toast({
        title: "Update failed",
        description: "Could not save changes to the server.",
        type: "error"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        toast({
          title: "Action failed",
          description: "Cannot delete the demo account. Contact support for assistance.",
          type: "error"
        })
        resolve()
      }, 1000)
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 space-y-1">
          <Button variant="secondary" className="w-full justify-start shadow-none">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-muted/50 transition-colors">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-muted/50 transition-colors">
            <Shield className="mr-2 h-4 w-4" /> Security
          </Button>
        </div>

        <div className="col-span-1 md:col-span-3 space-y-8">
          <Card className="border-none shadow-soft-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and avatar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="relative group cursor-pointer shrink-0">
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="h-20 w-20 rounded-full bg-secondary border-2 border-border transition-transform group-hover:scale-105 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium text-white">Edit</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-medium">Avatar image</h4>
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                      Upload a new avatar or completely remove it. PNG, JPG, or SVG. Max 2MB.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button type="button" variant="outline" size="sm">Upload new</Button>
                      <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors">Remove</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput 
                    id="firstName" 
                    label="First Name" 
                    value={user.firstName} 
                    onChange={e => setUser({...user, firstName: e.target.value})}
                    required 
                  />
                  <FloatingInput 
                    id="lastName" 
                    label="Last Name" 
                    value={user.lastName} 
                    onChange={e => setUser({...user, lastName: e.target.value})}
                    required 
                  />
                </div>
                
                <FloatingInput 
                  id="email" 
                  label="Email Address" 
                  type="email" 
                  value={user.email} 
                  onChange={e => setUser({...user, email: e.target.value})}
                  required 
                />
                
                <FloatingInput 
                  id="jobTitle" 
                  label="Job Title" 
                  value={user.jobTitle} 
                  onChange={e => setUser({...user, jobTitle: e.target.value})}
                />

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSaving} className="shadow-lg shadow-primary/20 h-11 px-8">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app experience and interface.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium">Appearance</label>
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    onClick={() => setTheme('light')}
                    className={cn("flex flex-col h-auto py-4 gap-3 transition-all", theme !== 'light' && "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground")}
                  >
                    <Sun className="h-6 w-6" /> Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    onClick={() => setTheme('dark')}
                    className={cn("flex flex-col h-auto py-4 gap-3 transition-all", theme !== 'dark' && "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground")}
                  >
                    <Moon className="h-6 w-6" /> Dark
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    onClick={() => setTheme('system')}
                    className={cn("flex flex-col h-auto py-4 gap-3 transition-all", theme !== 'system' && "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground")}
                  >
                    <Monitor className="h-6 w-6" /> System
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Push Notifications</label>
                    <p className="text-xs text-muted-foreground max-w-[250px] sm:max-w-none">Receive push notifications for mentions and updates.</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Marketing Emails</label>
                    <p className="text-xs text-muted-foreground max-w-[250px] sm:max-w-none">Receive emails about new products, features, and more.</p>
                  </div>
                  <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Two-Factor Authentication (2FA)</label>
                    <p className="text-xs text-muted-foreground max-w-[250px] sm:max-w-none">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-soft-lg bg-card/50 backdrop-blur-sm border-destructive/10">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog 
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Account"
        description="Are you absolutely sure you want to delete your account? This action cannot be undone and will permanently delete your data."
        confirmText="Yes, delete my account"
        destructive={true}
        onConfirm={handleDeleteAccount}
      />
    </div>
  )
}
