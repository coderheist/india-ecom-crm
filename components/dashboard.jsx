"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { CustomerManagement } from "@/components/customer-management"
import { OrderManagement } from "@/components/order-management"
import { SupportTickets } from "@/components/support-tickets"
import { MarketingCampaigns } from "@/components/marketing-campaigns"
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
      case "users":
        return user?.role === "admin" ? <UserManagement /> : <DashboardOverview />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen w-full">
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset className="flex flex-col h-full w-full">
        <DashboardHeader />
        <div className="flex-1 overflow-auto px-4 md:px-8 pt-6 bg-background">
          {renderContent()}
        </div>
      </SidebarInset>
    </div>
  )
}
