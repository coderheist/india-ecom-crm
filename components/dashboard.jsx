"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardOverview } from "@/components/dashboard-overview"
import { CustomerManagement } from "@/components/customer-management"
import { OrderManagement } from "@/components/order-management"
import { SupportTickets } from "@/components/support-tickets"
import { MarketingCampaigns } from "@/components/marketing-campaigns"
import { Analytics } from "@/components/analytics"
import { UserManagement } from "@/components/user-management"
import { useAuth } from "@/components/auth-provider"

export function Dashboard({ onMenuClick, activeView }) {
  const { user } = useAuth()

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "customers":
        return <CustomerManagement />
      case "orders":
        return <OrderManagement />
      case "tickets":
        return <SupportTickets />
      case "campaigns":
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
    <div className="flex-1 h-screen bg-background flex flex-col">
      <DashboardHeader title={activeView} onMenuClick={onMenuClick} />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
