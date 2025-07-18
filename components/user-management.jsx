"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, UserCog, Shield, Eye, Mail, Phone } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: "USR-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@company.com",
      phone: "+91 98765 43210",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-18 10:30 AM",
      createdDate: "2023-06-15",
      permissions: ["all"],
    },
    {
      id: "USR-002",
      name: "Priya Sharma",
      email: "priya.sharma@company.com",
      phone: "+91 87654 32109",
      role: "marketing_manager",
      status: "active",
      lastLogin: "2024-01-18 09:15 AM",
      createdDate: "2023-08-22",
      permissions: ["marketing", "analytics", "customers"],
    },
    {
      id: "USR-003",
      name: "Amit Singh",
      email: "amit.singh@company.com",
      phone: "+91 76543 21098",
      role: "support_agent",
      status: "active",
      lastLogin: "2024-01-17 04:45 PM",
      createdDate: "2023-09-10",
      permissions: ["support", "customers", "orders"],
    },
    {
      id: "USR-004",
      name: "Sneha Patel",
      email: "sneha.patel@company.com",
      phone: "+91 65432 10987",
      role: "viewer",
      status: "active",
      lastLogin: "2024-01-16 02:20 PM",
      createdDate: "2023-11-05",
      permissions: ["dashboard", "reports"],
    },
    {
      id: "USR-005",
      name: "Vikram Reddy",
      email: "vikram.reddy@company.com",
      phone: "+91 54321 09876",
      role: "support_agent",
      status: "inactive",
      lastLogin: "2024-01-10 11:30 AM",
      createdDate: "2023-07-18",
      permissions: ["support", "customers"],
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "marketing_manager":
        return "bg-purple-100 text-purple-800"
      case "support_agent":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "marketing_manager":
        return <Mail className="h-4 w-4" />
      case "support_agent":
        return <Phone className="h-4 w-4" />
      case "viewer":
        return <Eye className="h-4 w-4" />
      default:
        return <UserCog className="h-4 w-4" />
    }
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    agents: users.filter((u) => u.role === "support_agent").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate role and permissions.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                  <SelectItem value="support_agent">Support Agent</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCog className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Agents</CardTitle>
            <Phone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.agents}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                <SelectItem value="support_agent">Support Agent</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-1 h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(user.role)}
                        {user.role.replace("_", " ")}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Details - {user.name}</DialogTitle>
                            <DialogDescription>Complete user information and permissions</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Full Name</label>
                                <p className="text-sm text-muted-foreground">{user.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">User ID</label>
                                <p className="text-sm text-muted-foreground">{user.id}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <p className="text-sm text-muted-foreground">{user.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Role</label>
                                <Badge className={getRoleColor(user.role)}>{user.role.replace("_", " ")}</Badge>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status</label>
                                <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Last Login</label>
                                <p className="text-sm text-muted-foreground">{user.lastLogin}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Created Date</label>
                                <p className="text-sm text-muted-foreground">{user.createdDate}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Permissions</label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {user.permissions.map((permission) => (
                                  <Badge key={permission} variant="outline">
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">Edit User</Button>
                              <Button variant="outline" size="sm">
                                Reset Password
                              </Button>
                              {user.status === "active" ? (
                                <Button variant="outline" size="sm">
                                  Deactivate
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm">
                                  Activate
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
