"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Bell, Search, Settings, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSidebarContext } from "./LayoutWrapper"

export function DashboardHeader({ title = "Dashboard" }) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <header className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold capitalize">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers, orders..." 
              className="pl-9 w-64 input-enhanced bg-muted/30 border-0 focus:bg-background" 
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-lg">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-background">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="p-4 border-b border-border/50">
                <h4 className="font-semibold">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have 3 unread messages</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                  <div className="font-medium">New order received</div>
                  <div className="text-sm text-muted-foreground">Order #ORD-2024-001 from Mumbai</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                  <div className="font-medium">Support ticket resolved</div>
                  <div className="text-sm text-muted-foreground">Ticket #TKT-001 has been closed</div>
                  <div className="text-xs text-muted-foreground">15 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 flex flex-col items-start gap-1">
                  <div className="font-medium">Campaign completed</div>
                  <div className="text-sm text-muted-foreground">Email campaign reached 5,000 customers</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="hover:bg-accent rounded-lg">
            <Settings className="h-4 w-4" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="hover:bg-accent rounded-lg">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
