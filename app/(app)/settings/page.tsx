'use client'

import * as React from 'react'
import { User, Bell, Shield, Moon, Monitor, Sun, Save, DownloadCloud } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { FloatingInput } from '@/components/ui/floating-input'
import { useToast } from '@/components/ui/toast'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { toast } = useToast()
  
  // Theme State
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')
  
  // Settings State
  const [notifications, setNotifications] = React.useState(true)
  const [marketingEmails, setMarketingEmails] = React.useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false)
  
  // Form State
  const [isSaving, setIsSaving] = React.useState(false)

  // Confirm State
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  React.useEffect(() => {
    // Basic mock implementation of theme switcher for the UI
    const root = document.documentElement
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
        type: "success"
      })
    }, 1000)
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

  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Settings Navigation */}
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

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-3 space-y-8">
          
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and avatar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="relative group cursor-pointer shrink-0">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent" 
                      alt="Avatar" 
                      className="h-20 w-20 rounded-full bg-secondary border-2 border-border transition-transform group-hover:scale-105"
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
                  <FloatingInput id="firstName" label="First Name" defaultValue="Alex" required />
                  <FloatingInput id="lastName" label="Last Name" defaultValue="Morgan" required />
                </div>
                
                <FloatingInput id="email" label="Email Address" type="email" defaultValue="alex@ethara.ai" required />
                
                <FloatingInput id="jobTitle" label="Job Title" defaultValue="Lead Engineer" />

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card>
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

          {/* Export Data */}
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your personal data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Export Workspace Data</label>
                  <p className="text-xs text-muted-foreground">Download a copy of all data associated with your account.</p>
                </div>
                <Button variant="outline">
                  <DownloadCloud className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30 bg-destructive/5 shadow-none">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription className="text-destructive/80">Permanently delete your account and all associated data.</CardDescription>
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
