"use client"

import { useState, useEffect } from "react"
import { Filter, Grid, List, Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"

const products = [
  { id: 1, name: "Rosa Satin Pyjama-Set", price: "20$", rating: 4, image: "/v3.png", category: "Pyjamas", isNew: true, discount: 15, originalPrice: "24$" },
  { id: 2, name: "Schwarzer Seiden-Bademantel", price: "25$", rating: 5, image: "/v4.png", category: "Bademäntel", isNew: false, discount: 0 },
  { id: 3, name: "Kariertes Pyjama-Set", price: "17$", rating: 4, image: "/v5.png", category: "Pyjamas", isNew: false, discount: 20, originalPrice: "21$" },
  { id: 4, name: "Roter Spitzen-Body", price: "40$", rating: 5, image: "/v6.png", category: "Dessous", isNew: true, discount: 0 },
  { id: 5, name: "Grünes Gestreiftes Set", price: "19$", rating: 3, image: "/v7.png", category: "Pyjamas", isNew: false, discount: 10, originalPrice: "21$" },
  { id: 6, name: "Rosa Blumen-Pyjama", price: "31$", rating: 4, image: "/v8.png", category: "Pyjamas", isNew: false, discount: 0 },
  { id: 7, name: "Rotes Samt-Set", price: "13$", rating: 4, image: "/v9.png", category: "Pyjamas", isNew: true, discount: 25, originalPrice: "17$" },
  { id: 8, name: "Beiges Seiden-Set", price: "47$", rating: 5, image: "/v10.png", category: "Bademäntel", isNew: false, discount: 0 },
  { id: 9, name: "Braunes Satin-Set", price: "40$", rating: 5, image: "./c1.png", category: "Pyjamas", isNew: true, discount: 0 },
  { id: 10, name: "Cremefarbenes Strick-Set", price: "40$", rating: 4, image: "./c2.png", category: "Pyjamas", isNew: false, discount: 15, originalPrice: "47$" },
  { id: 11, name: "Rosa Slip-Kleid", price: "40$", rating: 4, image: "./c3.png", category: "Dessous", isNew: true, discount: 0 },
  { id: 12, name: "Leoparden-Print Set", price: "32$", rating: 3, image: "./c4.png", category: "Pyjamas", isNew: false, discount: 20, originalPrice: "40$" },
  { id: 13, name: "Blaues Satin-Set", price: "51$", rating: 4, image: "./c5.png", category: "Pyjamas", isNew: false, discount: 0 },
  { id: 14, name: "Rosa Satin-Kleid", price: "40$", rating: 4, image: "./c6.png", category: "Dessous", isNew: true, discount: 10, originalPrice: "44$" },
  { id: 15, name: "Rosa Trainingsanzug", price: "35$", rating: 3, image: "./c7.png", category: "Sportbekleidung", isNew: false, discount: 0 },
  { id: 16, name: "Blumen-Bademantel Set", price: "62$", rating: 5, image: "./c8.png", category: "Bademäntel", isNew: true, discount: 0 },
]

const categories = ["Alle", "Pyjamas", "Bademäntel", "Dessous", "Sportbekleidung"]
const sortOptions = ["Vorgestellt", "Preis: Niedrig zu Hoch", "Preis: Hoch zu Niedrig", "Neueste", "Bewertung"]

export default function ProductsPage() {
  const { isMobile } = useIsMobile()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [sortBy, setSortBy] = useState('Vorgestellt')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Alle' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = parseFloat(product.price.replace('$', '')) >= priceRange[0] && 
                        parseFloat(product.price.replace('$', '')) <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Preis: Niedrig zu Hoch':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
      case 'Preis: Hoch zu Niedrig':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
      case 'Bewertung':
        return b.rating - a.rating
      case 'Neueste':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4 animate-fade-in-up">Unsere Kollektion</h1>
            <p className="text-gray-600 text-lg animate-fade-in-up">Entdecke Deinen perfekten Stil</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filter</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    ×
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Suchen</label>
                  <Input
                    placeholder="Produkte suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Kategorie</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-pink-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Preisbereich</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Alle')
                    setSearchQuery('')
                    setPriceRange([0, 100])
                  }}
                >
                  Filter löschen
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <span className="text-sm text-gray-600">
                  {sortedProducts.length} Produkte gefunden
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <div key={product.id} className="stagger-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => console.log('Add to cart:', product.name)}
                      onAddToWishlist={() => console.log('Add to wishlist:', product.name)}
                      onQuickView={() => console.log('Quick view:', product.name)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product, index) => (
                  <Card key={product.id} className="stagger-item hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={120}
                            height={160}
                            className="rounded-lg object-cover"
                          />
                          {product.isNew && (
                            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white">
                              NEW
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                          <p className="text-gray-600 mb-2">{product.category}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500">({product.rating})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-pink-600">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            In den Warenkorb
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4 mr-2" />
                            Wunschliste
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Schnellansicht
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold mb-2">Keine Produkte gefunden</h3>
                <p className="text-gray-600 mb-4">Versuche deine Filter oder Suchbegriffe anzupassen</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('Alle')
                    setSearchQuery('')
                    setPriceRange([0, 100])
                  }}
                >
                  Filter löschen
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 