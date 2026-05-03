'use client'

import * as React from 'react'
import { Bell, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-3 h-full w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-10 pr-0 text-foreground focus:ring-0 sm:text-sm rounded-none shadow-none"
            placeholder="Search projects, tasks, or team members..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </Button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button className="-m-1.5 flex items-center p-1.5 focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-muted object-cover shadow-sm ring-1 ring-border"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent"
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-foreground" aria-hidden="true">
                  Alex Morgan
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
