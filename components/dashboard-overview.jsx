// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Users, ShoppingCart, DollarSign, TrendingUp, MessageSquare, Mail, Package, AlertCircle } from "lucide-react"
// import { useAuth } from "@/components/auth-provider"

// export function DashboardOverview() {
//   const { user } = useAuth()

//   const stats = [
//     {
//       title: "Total Customers",
//       value: "12,847",
//       change: "+12.5%",
//       icon: Users,
//       color: "text-blue-600",
//     },
//     {
//       title: "Monthly Orders",
//       value: "3,421",
//       change: "+8.2%",
//       icon: ShoppingCart,
//       color: "text-green-600",
//     },
//     {
//       title: "Revenue",
//       value: "₹8,45,230",
//       change: "+15.3%",
//       icon: DollarSign,
//       color: "text-orange-600",
//     },
//     {
//       title: "Growth Rate",
//       value: "23.4%",
//       change: "+2.1%",
//       icon: TrendingUp,
//       color: "text-purple-600",
//     },
//   ]

//   const recentActivities = [
//     {
//       type: "order",
//       message: "New order #ORD-2024-001 from Mumbai",
//       time: "2 minutes ago",
//       status: "new",
//     },
//     {
//       type: "support",
//       message: "Support ticket resolved for customer in Delhi",
//       time: "15 minutes ago",
//       status: "resolved",
//     },
//     {
//       type: "marketing",
//       message: "Email campaign sent to 5,000 customers",
//       time: "1 hour ago",
//       status: "sent",
//     },
//     {
//       type: "customer",
//       message: "New customer registration from Bangalore",
//       time: "2 hours ago",
//       status: "new",
//     },
//   ]

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case "order":
//         return <ShoppingCart className="h-4 w-4" />
//       case "support":
//         return <MessageSquare className="h-4 w-4" />
//       case "marketing":
//         return <Mail className="h-4 w-4" />
//       case "customer":
//         return <Users className="h-4 w-4" />
//       default:
//         return <Package className="h-4 w-4" />
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "bg-blue-100 text-blue-800"
//       case "resolved":
//         return "bg-green-100 text-green-800"
//       case "sent":
//         return "bg-purple-100 text-purple-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-3 space-y-3">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}!</h2>
//         <p className="text-muted-foreground">Here's what's happening with your e-commerce business today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//         {stats.map((stat) => (
//           <Card key={stat.title}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//               <stat.icon className={`h-4 w-4 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">
//                 <span className="text-green-600">{stat.change}</span> from last month
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-3 md:grid-cols-2">
//         {/* Recent Activities */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activities</CardTitle>
//             <CardDescription>Latest updates from your CRM system</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="flex items-center space-x-4">
//                   <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900">{activity.message}</p>
//                     <p className="text-sm text-gray-500">{activity.time}</p>
//                   </div>
//                   <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Performance Metrics */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Performance Metrics</CardTitle>
//             <CardDescription>Key performance indicators for this month</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">Customer Satisfaction</span>
//                 <span className="text-sm text-muted-foreground">92%</span>
//               </div>
//               <Progress value={92} className="h-2" />
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">Order Fulfillment</span>
//                 <span className="text-sm text-muted-foreground">87%</span>
//               </div>
//               <Progress value={87} className="h-2" />
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">Marketing ROI</span>
//                 <span className="text-sm text-muted-foreground">156%</span>
//               </div>
//               <Progress value={100} className="h-2" />
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">Support Response Time</span>
//                 <span className="text-sm text-muted-foreground">2.3 hrs</span>
//               </div>
//               <Progress value={78} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       {user?.role === "admin" && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <AlertCircle className="h-5 w-5 text-orange-500" />
//               System Alerts
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
//                 <div>
//                   <p className="font-medium">Low inventory alert</p>
//                   <p className="text-sm text-gray-600">15 products are running low on stock</p>
//                 </div>
//                 <Badge variant="outline">Action Required</Badge>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                 <div>
//                   <p className="font-medium">Database backup completed</p>
//                   <p className="text-sm text-gray-600">Last backup: Today at 3:00 AM</p>
//                 </div>
//                 <Badge variant="outline" className="bg-green-100 text-green-800">
//                   Completed
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, ShoppingCart, DollarSign, TrendingUp, MessageSquare, Mail, Package, AlertCircle, ArrowDown, ArrowUp } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// --- Data & Mappings (Cleaner data handling) ---

const statsData = [
  { title: "Total Customers", value: "12,847", change: "+12.5%", icon: Users },
  { title: "Monthly Orders", value: "3,421", change: "-3.1%", icon: ShoppingCart }, // <-- Example of a negative change
  { title: "Revenue", value: "₹8,45,230", change: "+15.3%", icon: DollarSign },
  { title: "Growth Rate", value: "23.4%", change: "+2.1%", icon: TrendingUp },
]

const recentActivitiesData = [
  { type: "order", message: "New order #ORD-2024-001 from Mumbai", time: "2 minutes ago", status: "new" },
  { type: "support", message: "Support ticket resolved for customer in Delhi", time: "15 minutes ago", status: "resolved" },
  { type: "marketing", message: "Email campaign sent to 5,000 customers", time: "1 hour ago", status: "sent" },
  { type: "customer", message: "New customer registration from Bangalore", time: "2 hours ago", status: "new" },
]

const performanceMetricsData = [
    { label: "Customer Satisfaction", value: 92 },
    { label: "Order Fulfillment", value: 87 },
    { label: "Marketing ROI", value: 156 },
    { label: "Support Response Time", value: 78, unit: "hrs", formatValue: "2.3" },
]

// --- Sub-Components for a Cleaner Architecture ---

const StatCard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change.startsWith('+')
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className={`mr-1 flex items-center font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change.substring(1)}
          </span>
          from last month
        </p>
      </CardContent>
    </Card>
  )
}

const ActivityItem = ({ activity }) => {
    const iconMap = {
        order: <ShoppingCart className="h-5 w-5 text-gray-500" />,
        support: <MessageSquare className="h-5 w-5 text-gray-500" />,
        marketing: <Mail className="h-5 w-5 text-gray-500" />,
        customer: <Users className="h-5 w-5 text-gray-500" />,
    };

    const statusBadgeMap = {
        new: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        resolved: "bg-green-100 text-green-800 hover:bg-green-200",
        sent: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    };
    
    return (
        <div className="flex items-start space-x-4">
            <div className="mt-1">{iconMap[activity.type] || <Package className="h-5 w-5" />}</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge className={`capitalize ${statusBadgeMap[activity.status]}`}>{activity.status}</Badge>
        </div>
    )
}

const MetricItem = ({ label, value, unit = "%", formatValue }) => (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-800">{label}</span>
        <span className="text-sm font-semibold text-gray-600">{formatValue || value}{unit}</span>
      </div>
      <Progress value={value > 100 ? 100 : value} className="h-2" />
    </div>
)


// --- Main Dashboard Component ---

export function DashboardOverview() {
  const { user } = useAuth()

  return (
    <div className="p-0 m-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name?.split(" ")[0]}!</h2>
        <p className="text-muted-foreground">Here's your e-commerce business overview for today, {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from your CRM system.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {recentActivitiesData.length > 0 ? (
                recentActivitiesData.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))
              ) : (
                <p className="text-sm text-center text-muted-foreground py-8">No recent activities to show.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators for this month.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetricsData.map(metric => <MetricItem key={metric.label} {...metric} />)}
          </CardContent>
        </Card>
      </div>

      {/* Admin-only System Alerts */}
      {user?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" /> System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
             {/* This section can be built out with more components as needed */}
             <p className="text-sm text-muted-foreground">System alerts and notifications will appear here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}