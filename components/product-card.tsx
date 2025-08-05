"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Eye, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: string
    rating: number
    image: string
    category: string
    isNew?: boolean
    discount?: number
    originalPrice?: string
  }
  onAddToCart?: () => void
  onAddToWishlist?: () => void
  onQuickView?: () => void
  className?: string
}

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = ""
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.()
  }

  const handleAddToCart = () => {
    onAddToCart?.()
  }

  const handleQuickView = () => {
    onQuickView?.()
  }

  return (
    <Card 
      className={`overflow-hidden hover-lift border-0 shadow-lg group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                NEU
              </Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge className="bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-4 right-4 space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <Button
              size="sm"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale shadow-lg"
              onClick={handleWishlist}
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isWishlisted ? 'text-red-500 fill-red-500' : 'text-pink-500'
                }`} 
              />
            </Button>
            <Button
              size="sm"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 text-pink-500" />
            </Button>
            <Button
              size="sm"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale shadow-lg"
              onClick={handleQuickView}
            >
              <Eye className="w-4 h-4 text-pink-500" />
            </Button>
            <Button
              size="sm"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale shadow-lg"
            >
              <Share2 className="w-4 h-4 text-pink-500" />
            </Button>
          </div>

          {/* Quick Add Button */}
          <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-scale shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Schnell hinzufügen
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="mb-2">
            <h4 className="font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h4>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-pink-600">{product.price}</span>
            {product.originalPrice && product.discount && (
              <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
            )}
          </div>

          {/* Color Options (if available) */}
          <div className="mt-3 flex space-x-2">
            {['#FFB6C1', '#FFC0CB', '#E5AFA8', '#F8BBD9'].map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-200 hover:border-pink-400 cursor-pointer hover-scale"
                style={{ backgroundColor: color }}
                title={`Farboption ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 