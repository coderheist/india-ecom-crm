"use client";

import { useAuth } from "@/components/auth-provider";
import { Sidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // If user is NOT logged in → let the page control its own layout
  if (!user) {
    return children;
  }

  // If user IS logged in → dashboard layout with sidebar
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-white">
        <Sidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
