"use client"

import { useState } from "react"
import { ArrowLeft, Lock, CreditCard, Truck, Shield, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const orderItems = [
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
]

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 0, time: '3-5 business days' },
  { id: 'express', name: 'Express Shipping', price: 10, time: '1-2 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 25, time: 'Next business day' }
]

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: CreditCard },
  { id: 'apple', name: 'Apple Pay', icon: CreditCard }
]

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [showPassword, setShowPassword] = useState(false)
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = shippingMethods.find(m => m.id === shippingMethod)?.price || 0
  const total = subtotal + shipping

  const handleShippingSubmit = () => {
    // Validate shipping info
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || 
        !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
      alert('Please fill in all required fields')
      return
    }
    setStep('payment')
  }

  const handlePaymentSubmit = () => {
    // Validate payment info
    if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiry || !paymentInfo.cvv) {
      alert('Please fill in all payment fields')
      return
    }
    setStep('review')
  }

  const handlePlaceOrder = () => {
    // Process order
    console.log('Order placed:', { shippingInfo, paymentInfo, orderItems, total })
    // Redirect to success page
    window.location.href = '/checkout/success'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { id: 'shipping', label: 'Shipping', icon: Truck },
                  { id: 'payment', label: 'Payment', icon: CreditCard },
                  { id: 'review', label: 'Review', icon: CheckCircle }
                ].map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step === s.id ? 'bg-pink-500 border-pink-500 text-white' : 
                      ['shipping', 'payment', 'review'].indexOf(step) > index ? 'bg-green-500 border-green-500 text-white' :
                      'border-gray-300 text-gray-400'
                    }`}>
                      {['shipping', 'payment', 'review'].indexOf(step) > index ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <s.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      step === s.id ? 'text-pink-600' : 'text-gray-500'
                    }`}>
                      {s.label}
                    </span>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        ['shipping', 'payment', 'review'].indexOf(step) > index ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Shipping Information */}
              {step === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        placeholder="Last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <Input
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <Input
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <Input
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                      <Input
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        placeholder="ZIP code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingMethods.map((method) => (
                        <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="text-pink-500"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{method.name}</span>
                              <span className="font-bold">{method.price === 0 ? 'Free' : `$${method.price}`}</span>
                            </div>
                            <div className="text-sm text-gray-500">{method.time}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg py-4 text-lg"
                    onClick={handleShippingSubmit}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {/* Payment Information */}
              {step === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-pink-500"
                          />
                          <method.icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{method.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number *</label>
                        <Input
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                        <Input
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          placeholder="Name on card"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                          <Input
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV *</label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                              placeholder="123"
                              maxLength={4}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={billingSameAsShipping}
                        onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                        className="text-pink-500"
                      />
                      <span className="text-sm">Billing address same as shipping address</span>
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep('shipping')}
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg py-4 text-lg"
                      onClick={handlePaymentSubmit}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Order Review */}
              {step === 'review' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Order Review</h2>
                  
                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
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
                  </div>

                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</div>
                      <div className="text-gray-600">{shippingInfo.address}</div>
                      <div className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</div>
                      <div className="text-gray-600">{shippingInfo.country}</div>
                      <div className="text-gray-600">{shippingInfo.email}</div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium">{paymentInfo.cardName}</div>
                      <div className="text-gray-600">**** **** **** {paymentInfo.cardNumber.slice(-4)}</div>
                      <div className="text-gray-600">Expires: {paymentInfo.expiry}</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep('payment')}
                    >
                      Back to Payment
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg py-4 text-lg"
                      onClick={handlePlaceOrder}
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Secure checkout powered by Stripe
                </div>

                {/* Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>SSL encrypted payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 