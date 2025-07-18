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
import { Search, Plus, MapPin, Calendar, ShoppingBag, Phone, Mail, Loader2 } from "lucide-react"

export function CustomerManagement() {
  const [customers, setCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRegion, setFilterRegion] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
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
      const response = await fetch("/api/customers-sqlite")
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
      setCustomers([]) // Set empty array on error
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
      const response = await fetch("/api/customers-sqlite", {
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
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Safety check to ensure customers is always an array
  const safeCustomers = Array.isArray(customers) ? customers : []
  console.log("Safe customers:", safeCustomers)

  const filteredCustomers = safeCustomers.filter((customer) => {
    const matchesSearch =
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer._id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = filterRegion === "all" || customer.region === filterRegion
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus

    return matchesSearch && matchesRegion && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSegmentColor = (segment) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-100 text-purple-800"
      case "Regular":
        return "bg-blue-100 text-blue-800"
      case "New":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
          <p className="text-muted-foreground">Manage and track your customer relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new customer profile in your CRM system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
              <Select
                value={newCustomer.region}
                onValueChange={(value) => setNewCustomer({ ...newCustomer, region: value })}
              >
                <SelectTrigger>
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
              <Button className="w-full" onClick={handleCreateCustomer} disabled={isCreating}>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeCustomers.length}</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeCustomers.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeCustomers.filter((c) => c.segment === "New").length}</div>
            <p className="text-xs text-muted-foreground">Recently joined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeCustomers.filter((c) => c.segment === "VIP").length}</div>
            <p className="text-xs text-muted-foreground">High-value customers</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No customers found. Create your first customer to get started!</p>
            </div>
          ) : (
            <Table>
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
                  <TableRow key={customer._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
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
                          <Mail className="mr-1 h-3 w-3" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="mr-1 h-3 w-3" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
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
                        <ShoppingBag className="mr-1 h-3 w-3" />
                        {customer.totalOrders || 0}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">₹{customer.totalSpent || 0}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {customer.joinDate ? new Date(customer.joinDate).toLocaleDateString() : "N/A"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
