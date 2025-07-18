"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, ShoppingCart, DollarSign, TrendingUp, MessageSquare, Mail, Package, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function DashboardOverview() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Customers",
      value: "12,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Monthly Orders",
      value: "3,421",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: "₹8,45,230",
      change: "+15.3%",
      icon: DollarSign,
      color: "text-orange-600",
    },
    {
      title: "Growth Rate",
      value: "23.4%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentActivities = [
    {
      type: "order",
      message: "New order #ORD-2024-001 from Mumbai",
      time: "2 minutes ago",
      status: "new",
    },
    {
      type: "support",
      message: "Support ticket resolved for customer in Delhi",
      time: "15 minutes ago",
      status: "resolved",
    },
    {
      type: "marketing",
      message: "Email campaign sent to 5,000 customers",
      time: "1 hour ago",
      status: "sent",
    },
    {
      type: "customer",
      message: "New customer registration from Bangalore",
      time: "2 hours ago",
      status: "new",
    },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />
      case "support":
        return <MessageSquare className="h-4 w-4" />
      case "marketing":
        return <Mail className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-3">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}!</h2>
        <p className="text-muted-foreground">Here's what's happening with your e-commerce business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your CRM system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Order Fulfillment</span>
                <span className="text-sm text-muted-foreground">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Marketing ROI</span>
                <span className="text-sm text-muted-foreground">156%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Support Response Time</span>
                <span className="text-sm text-muted-foreground">2.3 hrs</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {user?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Low inventory alert</p>
                  <p className="text-sm text-gray-600">15 products are running low on stock</p>
                </div>
                <Badge variant="outline">Action Required</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Database backup completed</p>
                  <p className="text-sm text-gray-600">Last backup: Today at 3:00 AM</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}