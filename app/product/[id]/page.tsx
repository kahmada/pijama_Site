"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Heart, Star, Truck, Shield, RefreshCw, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const product = {
  id: 1,
  name: "Pink Satin Pajama Set",
  price: "20$",
  originalPrice: "24$",
  rating: 4,
  reviews: 128,
  images: ["/v3.png", "/v4.png", "/v5.png", "/v6.png"],
  category: "Pajamas",
  isNew: true,
  discount: 15,
  description: "Experience ultimate comfort with our premium pink satin pajama set. Made from high-quality satin fabric, this elegant set features a relaxed fit and beautiful pink color that's perfect for both lounging and sleeping.",
  features: [
    "Premium satin fabric",
    "Relaxed fit design",
    "Machine washable",
    "Breathable material",
    "Elegant pink color"
  ],
  sizes: [36, 38, 40, 42],
  colors: [
    { name: "Pink", code: "#FFB6C1", available: true },
    { name: "Black", code: "#000000", available: true },
    { name: "White", code: "#FFFFFF", available: false },
    { name: "Rose", code: "#E5AFA8", available: true }
  ],
  inStock: true,
  sku: "VS-PJS-001"
}

const reviews = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely love this pajama set! The fabric is so soft and comfortable. Perfect fit and the color is beautiful."
  },
  {
    id: 2,
    user: "Emma L.",
    rating: 4,
    date: "2024-01-10",
    comment: "Great quality and very comfortable. The only reason I'm giving 4 stars is because it runs a bit small."
  },
  {
    id: 3,
    user: "Jessica K.",
    rating: 5,
    date: "2024-01-05",
    comment: "This is my second purchase of this set. The quality is amazing and it's so comfortable to sleep in."
  }
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description')

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    console.log('Added to cart:', { product, selectedSize, selectedColor, quantity })
  }

  const addToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    console.log('Wishlist updated')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-pink-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 space-y-2">
                {product.isNew && (
                  <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                    NEW
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4 space-y-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                  onClick={addToWishlist}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all hover-scale ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-pink-600">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
                )}
                {product.discount > 0 && (
                  <Badge className="bg-red-500 text-white">Save {product.discount}%</Badge>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    disabled={!color.available}
                    className={`w-12 h-12 rounded-full border-2 transition-all hover-scale ${
                      selectedColor === index ? 'border-pink-500' : 'border-gray-300'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`w-16 h-16 ${
                      selectedSize === size 
                        ? "bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg" 
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg py-4 text-lg"
                onClick={addToCart}
              >
                Add to Cart - {product.price}
              </Button>
              <Button 
                variant="outline" 
                className="w-full py-4 text-lg"
                onClick={addToWishlist}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RefreshCw className="w-4 h-4" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div>
                  <h4 className="font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{review.user}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Shipping Information</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free standard shipping on orders over $50</li>
                    <li>• Express shipping available for additional $10</li>
                    <li>• Orders typically ship within 1-2 business days</li>
                    <li>• Delivery takes 3-5 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Returns & Exchanges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 30-day return policy</li>
                    <li>• Free returns for unworn items</li>
                    <li>• Exchanges available for different sizes/colors</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 