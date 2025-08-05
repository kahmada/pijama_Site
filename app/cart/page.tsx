"use client"

import { useState } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus, ArrowLeft, Lock, Truck, Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const cartItems = [
  {
    id: 1,
    name: "Rosa Satin Pyjama-Set",
    price: 20,
    originalPrice: 24,
    image: "/v3.png",
    size: 38,
    color: "Rosa",
    quantity: 2,
    inStock: true
  },
  {
    id: 2,
    name: "Schwarzer Seiden-Bademantel",
    price: 25,
    originalPrice: 25,
    image: "/v4.png",
    size: 40,
    color: "Schwarz",
    quantity: 1,
    inStock: true
  },
  {
    id: 3,
    name: "Roter Spitzen-Body",
    price: 40,
    originalPrice: 40,
    image: "/v6.png",
    size: 36,
    color: "Rot",
    quantity: 1,
    inStock: false
  }
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode)
      setCouponCode("")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = appliedCoupon ? subtotal * 0.1 : 0 // 10% discount
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Weiter einkaufen
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Warenkorb ({items.length} Artikel)</h1>
              
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold mb-2">Dein Warenkorb ist leer</h3>
                  <p className="text-gray-600 mb-6">Füge schöne Artikel hinzu, um loszulegen!</p>
                  <Link href="/products">
                    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                      Einkaufen beginnen
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <Card key={item.id} className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={100}
                              height={120}
                              className="rounded-lg object-cover"
                            />
                            {!item.inStock && (
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                                Nicht vorrätig
                              </Badge>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>Größe: {item.size}</span>
                              <span>Farbe: {item.color}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg text-pink-600">${item.price}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-gray-400 line-through">${item.originalPrice}</span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                              className="w-8 h-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                              className="w-8 h-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Total Price */}
                          <div className="text-right">
                            <div className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="text-sm text-gray-500">${item.price} pro Stück</div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Bestellübersicht</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Zwischensumme ({items.length} Artikel)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Rabatt ({appliedCoupon})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Versand</span>
                    <span>{shipping === 0 ? 'Kostenlos' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamt</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {shipping === 0 ? 'Kostenloser Versand inbegriffen' : `Füge $${(50 - subtotal).toFixed(2)} mehr hinzu für kostenlosen Versand`}
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Gutscheincode"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                    >
                      Anwenden
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="text-sm text-green-600 mt-2">
                      Gutschein "{appliedCoupon}" angewendet! 10% Rabatt
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg py-4 text-lg"
                    disabled={items.length === 0}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Zur Kasse gehen
                  </Button>
                </Link>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Sichere Bezahlung durch Stripe
                </div>

                {/* Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Kostenloser Versand ab $50</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Sichere Zahlungsabwicklung</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <RefreshCw className="w-4 h-4" />
                    <span>30-Tage Rückgaberecht</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        {items.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Das könnte dir auch gefallen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Cremefarbenes Strick-Set", price: "40$", image: "./c2.png" },
                { name: "Rosa Slip-Kleid", price: "40$", image: "./c3.png" },
                { name: "Leoparden-Print Set", price: "32$", image: "./c4.png" },
                { name: "Blaues Satin-Set", price: "51$", image: "./c5.png" }
              ].map((product, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={250}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-pink-600">{product.price}</span>
                      <Button size="sm" variant="outline">
                        In den Warenkorb
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 