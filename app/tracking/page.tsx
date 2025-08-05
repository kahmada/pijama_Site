"use client"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, MapPin, Calendar, Clock, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const trackingData = {
  orderNumber: "VS-2024-001234",
  trackingNumber: "1Z999AA1234567890",
  status: "in_transit",
  estimatedDelivery: "January 20-22, 2024",
  carrier: "FedEx",
  items: [
    {
      id: 1,
      name: "Pink Satin Pajama Set",
      quantity: 2,
      image: "/v3.png"
    },
    {
      id: 2,
      name: "Black Silk Robe",
      quantity: 1,
      image: "/v4.png"
    }
  ],
  timeline: [
    {
      id: 1,
      status: "Order Confirmed",
      description: "Your order has been received and confirmed",
      date: "January 15, 2024",
      time: "10:30 AM",
      location: "Beuty's Secret Warehouse",
      completed: true
    },
    {
      id: 2,
      status: "Processing",
      description: "Your order is being prepared for shipment",
      date: "January 16, 2024",
      time: "2:15 PM",
      location: "Beuty's Secret Warehouse",
      completed: true
    },
    {
      id: 3,
      status: "Shipped",
      description: "Your order has been shipped",
      date: "January 17, 2024",
      time: "9:45 AM",
      location: "Beuty's Secret Warehouse",
      completed: true
    },
    {
      id: 4,
      status: "In Transit",
      description: "Your package is on its way",
      date: "January 18, 2024",
      time: "11:20 AM",
      location: "FedEx Distribution Center",
      completed: true
    },
    {
      id: 5,
      status: "Out for Delivery",
      description: "Your package is out for delivery",
      date: "January 20, 2024",
      time: "8:30 AM",
      location: "Local FedEx Facility",
      completed: false
    },
    {
      id: 6,
      status: "Delivered",
      description: "Your package has been delivered",
      date: "January 20, 2024",
      time: "2:00 PM",
      location: "Your Address",
      completed: false
    }
  ],
  shippingAddress: {
    name: "Sarah Johnson",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  }
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderNumber, setOrderNumber] = useState("")
  const [searchType, setSearchType] = useState<'tracking' | 'order'>('tracking')

  const handleSearch = () => {
    // In a real app, this would make an API call to get tracking info
    console.log('Searching for:', { trackingNumber, orderNumber, searchType })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in_transit': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4 animate-fade-in-up">Track Your Order</h1>
            <p className="text-gray-600 text-lg animate-fade-in-up">Stay updated on your delivery status</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8 hover-lift">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Type Toggle */}
              <div className="flex space-x-2">
                <Button
                  variant={searchType === 'tracking' ? 'default' : 'outline'}
                  onClick={() => setSearchType('tracking')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Tracking Number
                </Button>
                <Button
                  variant={searchType === 'order' ? 'default' : 'outline'}
                  onClick={() => setSearchType('order')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Order Number
                </Button>
              </div>

              {/* Search Input */}
              <div className="flex-1">
                <div className="flex space-x-2">
                  <Input
                    placeholder={searchType === 'tracking' ? "Enter tracking number" : "Enter order number"}
                    value={searchType === 'tracking' ? trackingNumber : orderNumber}
                    onChange={(e) => searchType === 'tracking' ? setTrackingNumber(e.target.value) : setOrderNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Track
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Order Status</h2>
                  <Badge className="bg-blue-500 text-white">
                    In Transit
                  </Badge>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {trackingData.timeline.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        {index < trackingData.timeline.length - 1 && (
                          <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${
                            item.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{item.status}</h3>
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.date}</div>
                            <div className="text-sm text-gray-500">{item.time}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
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
            {/* Order Summary */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold">{trackingData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-semibold">{trackingData.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carrier:</span>
                    <span className="font-semibold">{trackingData.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold text-green-600">{trackingData.estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {trackingData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
                <div className="space-y-2">
                  <div className="font-medium">{trackingData.shippingAddress.name}</div>
                  <div className="text-gray-600">{trackingData.shippingAddress.address}</div>
                  <div className="text-gray-600">
                    {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state} {trackingData.shippingAddress.zipCode}
                  </div>
                  <div className="text-gray-600">{trackingData.shippingAddress.country}</div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>+1 (800) 411-5116</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>support@vBeutyssecret.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>24/7 Support</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Other Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/orders">
                <Button variant="outline" className="w-full sm:w-auto">
                  View All Orders
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="outline" className="w-full sm:w-auto">
                  My Account
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 