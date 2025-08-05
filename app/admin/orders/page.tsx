"use client"

import { useState } from "react"
import { 
  ArrowLeft,
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const orders = [
  {
    id: "VS-2024-001234",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567"
    },
    items: [
      { name: "Pink Satin Pajama Set", quantity: 2, price: 20.00 },
      { name: "Black Silk Robe", quantity: 1, price: 25.00 }
    ],
    total: 65.00,
    status: "shipped",
    orderDate: "2024-01-15",
    shippingDate: "2024-01-17",
    estimatedDelivery: "2024-01-20",
    trackingNumber: "1Z999AA1234567890",
    shippingAddress: {
      name: "Sarah Johnson",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid"
  },
  {
    id: "VS-2024-001235",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 234-5678"
    },
    items: [
      { name: "Red Lace Bodysuit", quantity: 1, price: 40.00 },
      { name: "Cream Knit Set", quantity: 1, price: 49.99 }
    ],
    total: 89.99,
    status: "processing",
    orderDate: "2024-01-15",
    shippingDate: null,
    estimatedDelivery: "2024-01-22",
    trackingNumber: null,
    shippingAddress: {
      name: "Emma Wilson",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "United States"
    },
    paymentMethod: "PayPal",
    paymentStatus: "paid"
  },
  {
    id: "VS-2024-001236",
    customer: {
      name: "Jessica Brown",
      email: "jessica.brown@email.com",
      phone: "+1 (555) 345-6789"
    },
    items: [
      { name: "Green Striped Set", quantity: 1, price: 45.50 }
    ],
    total: 45.50,
    status: "delivered",
    orderDate: "2024-01-14",
    shippingDate: "2024-01-16",
    estimatedDelivery: "2024-01-19",
    trackingNumber: "1Z999AA1234567891",
    shippingAddress: {
      name: "Jessica Brown",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid"
  },
  {
    id: "VS-2024-001237",
    customer: {
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 456-7890"
    },
    items: [
      { name: "Pink Floral Pajama", quantity: 2, price: 31.00 },
      { name: "Leopard Print Set", quantity: 1, price: 32.00 },
      { name: "Blue Satin Set", quantity: 1, price: 25.00 }
    ],
    total: 120.00,
    status: "pending",
    orderDate: "2024-01-14",
    shippingDate: null,
    estimatedDelivery: "2024-01-23",
    trackingNumber: null,
    shippingAddress: {
      name: "Maria Garcia",
      address: "321 Elm Street",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "pending"
  }
]

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500'
      case 'shipped': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500'
      case 'pending': return 'bg-orange-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    // In a real app, this would make an API call
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600">Manage and track all customer orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                <Truck className="w-4 h-4 mr-2" />
                Bulk Ship
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <Card className="mb-6 hover-lift">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search orders by ID or customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{order.items.length} items</p>
                            <p className="text-sm text-gray-600">{order.orderDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="font-bold">${order.total}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {selectedOrder ? (
              <>
                {/* Order Summary */}
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Order Details</h3>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusText(selectedOrder.status)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-medium">{selectedOrder.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium">{selectedOrder.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-bold text-lg text-pink-600">${selectedOrder.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <Badge className={selectedOrder.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {selectedOrder.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Information */}
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">{selectedOrder.customer.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{selectedOrder.customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{selectedOrder.customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
                    <div className="space-y-2">
                      <div className="font-medium">{selectedOrder.shippingAddress.name}</div>
                      <div className="text-gray-600">{selectedOrder.shippingAddress.address}</div>
                      <div className="text-gray-600">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </div>
                      <div className="text-gray-600">{selectedOrder.shippingAddress.country}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                        disabled={selectedOrder.status === 'processing'}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Mark as Processing
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                        disabled={selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered'}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Mark as Shipped
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                        disabled={selectedOrder.status === 'delivered'}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Delivered
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full text-red-600 hover:text-red-700"
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Select an order to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 