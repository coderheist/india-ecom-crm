"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  ShoppingCart,
  MessageSquare,
  Mail,
  LogOut,
  Store,
  Home,
  UserCog,
  ChevronUp,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react"

export { Sidebar } from "@/components/ui/sidebar";

export function AppSidebar({ activeView, setActiveView }) {
  setActiveView = setActiveView || (() => {});
  const { user, logout } = useAuth()

  const getMenuItems = () => {
    return [
      {
        title: "Overview",
        url: "overview",
        icon: Home,
        badge: null,
      },
      {
        title: "Customers",
        url: "customers",
        icon: Users,
        badge: "1.2k",
      },
      {
        title: "Orders",
        url: "orders",
        icon: ShoppingCart,
        badge: "23",
      },
      {
        title: "Support",
        url: "support",
        icon: MessageSquare,
        badge: "5",
      },
      {
        title: "Marketing",
        url: "marketing",
        icon: Mail,
        badge: null,
      },
      {
        title: "Analytics",
        url: "analytics",
        icon: BarChart3,
        badge: null,
      },
      {
        title: "Users",
        url: "users",
        icon: UserCog,
        badge: null,
      },
    ]
  }

  const secondaryItems = [
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "help",
      icon: HelpCircle,
    },
  ]

  return (
    <Sidebar collapsible="icon" className="sidebar-enhanced border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Store className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-lg">CRM Heist</span>
                  <span className="truncate text-xs text-muted-foreground">Business Portal</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeView === item.url} 
                    onClick={() => setActiveView(item.url)} 
                    className="sidebar-nav-item group relative"
                  >
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200">
                      <item.icon className="size-5 transition-colors" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs px-2 py-0.5 bg-muted text-muted-foreground">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="sidebar-nav-item">
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200">
                      <item.icon className="size-5" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-9 w-9 rounded-lg border-2 border-border/50">
                      <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs text-muted-foreground capitalize">
                        {user?.role || "Admin"}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto size-4 transition-transform duration-200" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg border border-border/50"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                  <Bell className="h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <div className="border-t border-border/50 my-1"></div>
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 p-3 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-500/10">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}