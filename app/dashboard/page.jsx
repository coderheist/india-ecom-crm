"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <Dashboard />
}