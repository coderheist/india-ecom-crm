"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, ShoppingCart, DollarSign, TrendingUp, MessageSquare, Mail, Package, AlertCircle, ArrowDown, ArrowUp, Activity, Target, Clock, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Enhanced data with more realistic metrics
const statsData = [
  { 
    title: "Total Revenue", 
    value: "₹12,45,230", 
    change: "+12.5%", 
    icon: DollarSign,
    description: "vs last month",
    trend: "up"
  },
  { 
    title: "Active Customers", 
    value: "3,421", 
    change: "+8.2%", 
    icon: Users,
    description: "vs last month",
    trend: "up"
  },
  { 
    title: "Monthly Orders", 
    value: "1,847", 
    change: "-3.1%", 
    icon: ShoppingCart,
    description: "vs last month",
    trend: "down"
  },
  { 
    title: "Growth Rate", 
    value: "23.4%", 
    change: "+2.1%", 
    icon: TrendingUp,
    description: "quarterly growth",
    trend: "up"
  },
]

const recentActivitiesData = [
  { 
    type: "order", 
    message: "New order #ORD-2024-001 from Mumbai", 
    time: "2 minutes ago", 
    status: "new",
    priority: "high"
  },
  { 
    type: "support", 
    message: "Support ticket resolved for premium customer", 
    time: "15 minutes ago", 
    status: "resolved",
    priority: "medium"
  },
  { 
    type: "marketing", 
    message: "Email campaign sent to 5,000 customers", 
    time: "1 hour ago", 
    status: "sent",
    priority: "low"
  },
  { 
    type: "customer", 
    message: "VIP customer registration from Bangalore", 
    time: "2 hours ago", 
    status: "new",
    priority: "high"
  },
  { 
    type: "order", 
    message: "Bulk order completed - ₹45,000", 
    time: "3 hours ago", 
    status: "completed",
    priority: "medium"
  },
]

const performanceMetricsData = [
  { label: "Customer Satisfaction", value: 94, target: 95, unit: "%" },
  { label: "Order Fulfillment", value: 87, target: 90, unit: "%" },
  { label: "Marketing ROI", value: 156, target: 150, unit: "%" },
  { label: "Support Response Time", value: 78, target: 85, unit: "%", formatValue: "2.3 hrs" },
]

const quickStatsData = [
  { label: "Today's Sales", value: "₹45,230", icon: Target, color: "text-green-600" },
  { label: "Pending Orders", value: "23", icon: Clock, color: "text-yellow-600" },
  { label: "Active Campaigns", value: "8", icon: Activity, color: "text-blue-600" },
  { label: "Resolved Tickets", value: "156", icon: CheckCircle2, color: "text-purple-600" },
]

// Enhanced components
const StatCard = ({ title, value, change, icon: Icon, description, trend }) => {
  const isPositive = trend === "up"
  return (
    <Card className="metric-card group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
          <Icon className={`h-4 w-4 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="metric-value">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className={`flex items-center gap-1 text-xs font-medium metric-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ActivityItem = ({ activity }) => {
  const iconMap = {
    order: <ShoppingCart className="h-5 w-5 text-blue-500" />,
    support: <MessageSquare className="h-5 w-5 text-green-500" />,
    marketing: <Mail className="h-5 w-5 text-purple-500" />,
    customer: <Users className="h-5 w-5 text-orange-500" />,
  };

  const statusBadgeMap = {
    new: "status-indicator info",
    resolved: "status-indicator success",
    sent: "status-indicator neutral",
    completed: "status-indicator success",
  };

  const priorityColors = {
    high: "border-l-red-500",
    medium: "border-l-yellow-500",
    low: "border-l-green-500",
  };
  
  return (
    <div className={`flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border-l-2 ${priorityColors[activity.priority]}`}>
      <div className="mt-1 p-2 rounded-lg bg-muted/50">{iconMap[activity.type] || <Package className="h-5 w-5" />}</div>
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-medium leading-5">{activity.message}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{activity.time}</p>
          <Badge className={statusBadgeMap[activity.status]}>{activity.status}</Badge>
        </div>
      </div>
    </div>
  )
}

const MetricItem = ({ label, value, target, unit = "%", formatValue }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{formatValue || value}{unit}</span>
        <span className="text-xs text-muted-foreground">/ {target}{unit}</span>
      </div>
    </div>
    <div className="space-y-1">
      <Progress value={value > 100 ? 100 : value} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Current</span>
        <span>Target: {target}{unit}</span>
      </div>
    </div>
  </div>
)

const QuickStatItem = ({ label, value, icon: Icon, color }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
    <div className={`p-2 rounded-lg bg-background shadow-sm`}>
      <Icon className={`h-4 w-4 ${color}`} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
)

export function DashboardOverview() {
  const { user } = useAuth()
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="container-enhanced section-padding animate-fade-in">
      {/* Header Section */}
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-lg text-muted-foreground">
          Here's your business overview for {currentDate}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStatsData.map((stat) => (
          <QuickStatItem key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid mb-8">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 card-enhanced">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Activities</CardTitle>
                <CardDescription>Latest updates from your CRM system</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivitiesData.length > 0 ? (
              recentActivitiesData.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No recent activities to show.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="card-enhanced">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetricsData.map(metric => (
              <MetricItem key={metric.label} {...metric} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="card-enhanced mt-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-xl">System Health</CardTitle>
          </div>
          <CardDescription>Current system status and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">Database</p>
                <p className="text-sm text-green-700 dark:text-green-300">Operational</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">API Services</p>
                <p className="text-sm text-green-700 dark:text-green-300">All systems go</p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-100">Backup</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Scheduled: 3:00 AM</p>
              </div>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}