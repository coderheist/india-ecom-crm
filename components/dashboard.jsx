"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { CustomerManagement } from "@/components/customer-management"
import { OrderManagement } from "@/components/order-management"
import { SupportTickets } from "@/components/support-tickets"
import { MarketingCampaigns } from "@/components/marketing-campaigns"
import { Analytics } from "@/components/analytics"
import { UserManagement } from "@/components/user-management"
import { useAuth } from "@/components/auth-provider"

export function Dashboard() {
  const [activeView, setActiveView] = useState("overview")
  const { user } = useAuth()

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <DashboardOverview />
      case "customers":
        return <CustomerManagement />
      case "orders":
        return <OrderManagement />
      case "support":
        return <SupportTickets />
      case "marketing":
        return <MarketingCampaigns />
      case "analytics":
        return <Analytics />
      case "users":
        return user?.role === "admin" ? <UserManagement /> : <DashboardOverview />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <div className="flex-1 p-0 m-0 overflow-auto">{renderContent()}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
