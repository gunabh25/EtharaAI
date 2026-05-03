import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'EtharaAI — Modern SaaS Platform',
    template: '%s | EtharaAI',
  },
  description:
    'EtharaAI is a modern SaaS platform for teams to manage projects, tasks, and collaboration — all in one place.',
  keywords: ['saas', 'project management', 'tasks', 'team', 'productivity'],
  authors: [{ name: 'EtharaAI Team' }],
  openGraph: {
    title: 'EtharaAI — Modern SaaS Platform',
    description: 'Manage your projects, tasks, and team in one beautiful platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
