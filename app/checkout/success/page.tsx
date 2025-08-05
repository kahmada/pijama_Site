"use client"

import { CheckCircle, Package, Truck, Mail, Download, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const orderDetails = {
  orderNumber: "VS-2024-001234",
  orderDate: "January 15, 2024",
  estimatedDelivery: "January 20-22, 2024",
  total: 65.00,
  items: [
    {
      id: 1,
      name: "Pink Satin Pajama Set",
      price: 20,
      quantity: 2,
      size: 38,
      color: "Pink"
    },
    {
      id: 2,
      name: "Black Silk Robe",
      price: 25,
      quantity: 1,
      size: 40,
      color: "Black"
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

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-gray-600 mb-2 animate-fade-in-up">
            Your order has been successfully placed
          </p>
          <p className="text-gray-500 animate-fade-in-up">
            Order #{orderDetails.orderNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold">{orderDetails.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{orderDetails.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold text-green-600">{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg text-pink-600">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="space-y-2">
                  <div className="font-medium">{orderDetails.shippingAddress.name}</div>
                  <div className="text-gray-600">{orderDetails.shippingAddress.address}</div>
                  <div className="text-gray-600">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                  </div>
                  <div className="text-gray-600">{orderDetails.shippingAddress.country}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps & Actions */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Order Confirmed</div>
                      <div className="text-sm text-gray-500">Your order has been received</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Processing</div>
                      <div className="text-sm text-gray-500">We're preparing your order</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-400">Shipped</div>
                      <div className="text-sm text-gray-400">Estimated: {orderDetails.estimatedDelivery}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Confirmation Email</div>
                      <div className="text-sm text-gray-600">Check your email for order details</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Truck className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Tracking Updates</div>
                      <div className="text-sm text-gray-600">We'll notify you when your order ships</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Delivery</div>
                      <div className="text-sm text-gray-600">Your order will arrive in 3-5 business days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Order
                  </Button>
                  <Link href="/products" className="block">
                    <Button className="w-full justify-start bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    If you have any questions about your order, our customer service team is here to help.
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Email:</span>
                      <span className="font-medium">support@Beutyssecret.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phone:</span>
                      <span className="font-medium">+1 (800) 411-5116</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Hours:</span>
                      <span className="font-medium">24/7 Support</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Love Your Purchase?</h3>
            <p className="text-gray-600 mb-6">
              Share your experience with others and help them discover their perfect style!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Write a Review
              </Button>
              <Button variant="outline">
                Share on Social Media
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 