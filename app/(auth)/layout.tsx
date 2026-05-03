import * as React from 'react'
import Link from 'next/link'
import { Layers } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Panel - Branding */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-950 p-12 lg:flex">
        {/* Background Gradients & Glassmorphism */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-950 to-zinc-950" />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-violet-600/30 blur-[100px]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">EtharaAI</span>
          </Link>
        </div>

        <div className="relative z-10 mb-12">
          <div className="glass-dark rounded-3xl p-8 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Streamline your workflow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                with intelligent automation
              </span>
            </h1>
            <p className="text-lg text-zinc-400">
              Join thousands of teams already using EtharaAI to manage projects, automate tasks, and collaborate seamlessly.
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=transparent`} alt="User" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-zinc-400">
                <span className="text-white font-bold">10k+</span> users worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile Header */}
          <div className="mb-8 flex lg:hidden">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">EtharaAI</span>
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
