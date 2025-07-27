"use client"

import { useAuth } from "@/components/auth-provider"
import {
  BarChart3,
  Users,
  ShoppingCart,
  MessageSquare,
  Mail,
  LogOut,
  Home,
} from "lucide-react"

export function AppSidebar({ activeView, setActiveView }) {
  const { user, logout } = useAuth();

  const getMenuClass = (itemView) => {
    return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
      ${activeView === itemView 
        ? 'bg-accent text-accent-foreground font-medium' 
        : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
      }`
  };

  const menuItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Overview',
      view: 'dashboard'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Customers',
      view: 'customers'
    },
    {
      icon: <ShoppingCart className="h-4 w-4" />,
      label: 'Orders',
      view: 'orders'
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Campaigns',
      view: 'campaigns'
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: 'Tickets',
      view: 'tickets'
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'Analytics',
      view: 'analytics'
    }
  ];

  return (
    <aside className="flex h-[100dvh] w-64 flex-col border-r bg-background px-2 py-2 md:px-4 overflow-y-auto">
      <div className="flex h-14 items-center border-b px-2">
        <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
      </div>
      
      <nav className="grid gap-1 pt-2">
        {menuItems.map(item => (
          <button 
            key={item.view}
            onClick={() => setActiveView(item.view)} 
            className={getMenuClass(item.view)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      
      {user && (
        <div className="mt-auto border-t pt-2">
          <button 
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
