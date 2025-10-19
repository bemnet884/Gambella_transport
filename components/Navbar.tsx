// components/layout/Navbar.tsx
'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Search,
  User,
  Settings
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left side - Sidebar trigger and search */}
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger />
          <div className="hidden md:flex items-center justify-center gap-1 py-1 px-3 rounded-xl max-w-md flex-1 border-1 bg-transparent ">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right side - User menu and actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}