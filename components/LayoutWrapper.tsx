"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard";
import { useState } from "react";

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password";

  // Handle initial view based on pathname
  useEffect(() => {
    if (!isLoading && user) {
      const path = pathname.split('/')[1] || 'dashboard';
      setActiveView(path);
    }
  }, [pathname, user, isLoading]);

  const sidebarValue = React.useMemo<SidebarContextType>(() => ({
    isSidebarOpen,
    toggleSidebar
  }), [isSidebarOpen]);
  
  // Render the appropriate layout
  const renderContent = () => {
    // If still loading auth state, show nothing to prevent flash
    if (isLoading) {
      return null;
    }

    // Special case for login and landing pages
    if (isAuthPage) {
      return (
        <div className="min-h-screen flex flex-col bg-background">
          {children}
        </div>
      );
    }

    // For authenticated dashboard pages
    if (user) {
      return (
        <SidebarContext.Provider value={sidebarValue}>
          <div className="flex min-h-screen bg-background">
            <div className={`fixed lg:static lg:block ${isSidebarOpen ? 'block' : 'hidden'} z-30`}>
              <AppSidebar activeView={activeView} setActiveView={setActiveView} />
            </div>
            <div className={`fixed inset-0 bg-black/50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} 
              onClick={() => setSidebarOpen(false)} 
              aria-hidden="true" 
            />
            <div className="flex-1 flex flex-col min-w-0">
              {!isLoading && <Dashboard activeView={activeView} onMenuClick={() => setSidebarOpen(true)} />}
            </div>
          </div>
        </SidebarContext.Provider>
      );
    }

    // For non-authenticated pages (landing, etc.)
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {children}
      </div>
    );
  };

  return renderContent();
}
