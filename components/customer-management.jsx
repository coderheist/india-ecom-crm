"use client"
import { useState, useEffect } from "react"
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
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, MapPin, Calendar, ShoppingBag, Phone, Mail, Loader2, Users, TrendingUp, Star, Filter } from "lucide-react"

export function CustomerManagement() {
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSegment, setFilterSegment] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      console.log("Fetching customers...")
      const response = await fetch("/api/customers")
      const data = await response.json()
      console.log("API response:", data)

      if (data.success && Array.isArray(data.customers)) {
        console.log("Setting customers:", data.customers)
        setCustomers(data.customers)
      } else {
        console.log("No customers found or invalid data format, setting empty array")
        setCustomers([])
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
      setCustomers([])
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      })

      const data = await response.json()

      if (data.success) {
        setCustomers([...safeCustomers, data.customer])
        setNewCustomer({ name: "", email: "", phone: "", region: "" })
        setIsDialogOpen(false)
        toast({
          title: "Success",
          description: "Customer created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create customer",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating customer:", error)
      toast({
        title: "Error",
        description: "Failed to create customer",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading customers...</p>
        </div>
      </div>
    )
  }

  const safeCustomers = Array.isArray(customers) ? customers : []
  console.log("Safe customers:", safeCustomers)

  const filteredCustomers = safeCustomers.filter((customer) => {
    const matchesSearch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer._id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = filterRegion === "all" || customer.region === filterRegion
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus
    const matchesSegment = filterSegment === "all" || customer.segment === filterSegment

    return matchesSearch && matchesRegion && matchesStatus && matchesSegment
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "status-indicator success"
      case "inactive":
        return "status-indicator error"
      default:
        return "status-indicator neutral"
    }
  }

  const getSegmentColor = (segment) => {
    switch (segment) {
      case "VIP":
        return "status-indicator error"
      case "Regular":
        return "status-indicator info"
      case "New":
        return "status-indicator warning"
      default:
        return "status-indicator neutral"
    }
  }

  const customerStats = {
    total: safeCustomers.length,
    active: safeCustomers.filter((c) => c.status === "active").length,
    new: safeCustomers.filter((c) => c.segment === "New").length,
    vip: safeCustomers.filter((c) => c.segment === "VIP").length,
  }

  return (
    <div className="container-enhanced section-padding content-spacing animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground">Manage and track your customer relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new customer profile in your CRM system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="form-group">
                <Input
                  placeholder="Full Name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="input-enhanced"
                />
              </div>
              <div className="form-group">
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="input-enhanced"
                />
              </div>
              <div className="form-group">
                <Input
                  placeholder="Phone Number"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="input-enhanced"
                />
              </div>
              <div className="form-group">
                <Select
                  value={newCustomer.region}
                  onValueChange={(value) => setNewCustomer({ ...newCustomer, region: value })}
                >
                  <SelectTrigger className="input-enhanced">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full btn-primary" onClick={handleCreateCustomer} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Customer"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="metric-value">{customerStats.total}</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="metric-value">{customerStats.active}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Customers</CardTitle>
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-500/10">
              <Plus className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="metric-value">{customerStats.new}</div>
            <p className="text-xs text-muted-foreground">Recently joined</p>
          </CardContent>
        </Card>
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">VIP Customers</CardTitle>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
              <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="metric-value">{customerStats.vip}</div>
            <p className="text-xs text-muted-foreground">High-value customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-enhanced">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Search & Filter</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-enhanced"
              />
            </div>
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-full lg:w-48 input-enhanced">
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-48 input-enhanced">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSegment} onValueChange={setFilterSegment}>
              <SelectTrigger className="w-full lg:w-48 input-enhanced">
                <SelectValue placeholder="Filter by Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="New">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {safeCustomers.length === 0 
                  ? "Create your first customer to get started!" 
                  : "Try adjusting your search or filter criteria."}
              </p>
              {safeCustomers.length === 0 && (
                <Button onClick={() => setIsDialogOpen(true)} className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Customer
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="table-enhanced">
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer._id || customer.email} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {customer.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer._id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                            {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="mr-2 h-3 w-3" />
                              {customer.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-3 w-3 text-muted-foreground" />
                          {customer.region || "Not specified"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSegmentColor(customer.segment)}>{customer.segment}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ShoppingBag className="mr-2 h-3 w-3 text-muted-foreground" />
                          {customer.totalOrders || 0}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{(customer.totalSpent || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-3 w-3 text-muted-foreground" />
                          {customer.joinDate ? new Date(customer.joinDate).toLocaleDateString() : "N/A"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}