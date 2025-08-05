"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowRight,
  Sparkles,
  Award,
  Shield,
  Truck,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const isMobile = useIsMobile()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const products = [
    { id: 1, name: "Rosa Satin Pyjama-Set", price: "20$", rating: 4, image: "/v3.png", category: "Pyjamas", isNew: true, discount: 15 },
    { id: 2, name: "Schwarzer Seiden-Bademantel", price: "25$", rating: 5, image: "/v4.png", category: "Bademäntel", isNew: false, discount: 0 },
    { id: 3, name: "Kariertes Pyjama-Set", price: "17$", rating: 4, image: "/v5.png", category: "Pyjamas", isNew: false, discount: 20 },
    { id: 4, name: "Roter Spitzen-Body", price: "40$", rating: 5, image: "/v6.png", category: "Dessous", isNew: true, discount: 0 },
    { id: 5, name: "Grünes Gestreiftes Set", price: "19$", rating: 3, image: "/v7.png", category: "Pyjamas", isNew: false, discount: 10 },
    { id: 6, name: "Rosa Blumen-Pyjama", price: "31$", rating: 4, image: "/v8.png", category: "Pyjamas", isNew: false, discount: 0 },
    { id: 7, name: "Rotes Samt-Set", price: "13$", rating: 4, image: "/v9.png", category: "Pyjamas", isNew: true, discount: 25 },
    { id: 8, name: "Beiges Seiden-Set", price: "47$", rating: 5, image: "/v10.png", category: "Bademäntel", isNew: false, discount: 0 },
  ]

  const otherProducts = [
    { id: 9, name: "Braunes Satin-Set", price: "40$", rating: 5, image: "./c1.png", category: "Pyjamas", isNew: true, discount: 0 },
    { id: 10, name: "Cremefarbenes Strick-Set", price: "40$", rating: 4, image: "./c2.png", category: "Pyjamas", isNew: false, discount: 15 },
    { id: 11, name: "Rosa Slip-Kleid", price: "40$", rating: 4, image: "./c3.png", category: "Dessous", isNew: true, discount: 0 },
    { id: 12, name: "Leoparden-Print Set", price: "32$", rating: 3, image: "./c4.png", category: "Pyjamas", isNew: false, discount: 20 },
    { id: 13, name: "Blaues Satin-Set", price: "51$", rating: 4, image: "./c5.png", category: "Pyjamas", isNew: false, discount: 0 },
    { id: 14, name: "Rosa Satin-Kleid", price: "40$", rating: 4, image: "./c6.png", category: "Dessous", isNew: true, discount: 10 },
    { id: 15, name: "Rosa Trainingsanzug", price: "35$", rating: 3, image: "./c7.png", category: "Sportbekleidung", isNew: false, discount: 0 },
    { id: 16, name: "Blumen-Bademantel Set", price: "62$", rating: 5, image: "./c8.png", category: "Bademäntel", isNew: true, discount: 0 },
  ]

  const heroSlides = [
    {
      title: "Luxus Dessous",
      subtitle: "Entdecke Deine Perfekte Passform",
      image: "/v2.png",
      bgColor: "from-pink-100 to-rose-200"
    },
    {
      title: "Komfort & Stil",
      subtitle: "Premium Pyjama Kollektion",
      image: "/v3.png",
      bgColor: "from-rose-100 to-pink-200"
    },
    {
      title: "Elegante Bademäntel",
      subtitle: "Hülle Dich in Luxus",
      image: "/v4.png",
      bgColor: "from-purple-100 to-pink-200"
    }
  ]

  const sizes = [36, 38, 40, 42]
  const [selectedSize, setSelectedSize] = useState(36)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-rotate hero slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const addToCart = () => {
    setCartCount(prev => prev + 1)
    // Add animation feedback
  }

  const addToWishlist = () => {
    setWishlistCount(prev => prev + 1)
    // Add animation feedback
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <div className="text-xl font-light text-gray-600 animate-pulse">Beuty's Secret</div>
          <div className="loading-dots text-pink-400 mt-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center animate-fade-in-left">
              <div className="text-2xl font-script gradient-text font-bold">Beuty's Secret</div>
            </div>

            {/* Navigation */}
            <nav className={`hidden md:flex space-x-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-100'}`}>
              <Link href="/">
                <Button variant="ghost" className="hover-lift bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 rounded-full px-6 hover:from-pink-200 hover:to-rose-200">
                  Startseite
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" className="hover-lift bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 rounded-full px-6 hover:from-pink-200 hover:to-rose-200">
                  Produkte
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" className="hover-lift bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 rounded-full px-6 hover:from-pink-200 hover:to-rose-200">
                  Warenkorb
                </Button>
              </Link>
              <Link href="/tracking">
                <Button variant="ghost" className="hover-lift bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 rounded-full px-6 hover:from-pink-200 hover:to-rose-200">
                  Bestellung verfolgen
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" className="hover-lift bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 rounded-full px-6 hover:from-pink-200 hover:to-rose-200">
                  Konto
                </Button>
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 animate-fade-in-right">
              <div className="relative hover-scale cursor-pointer">
                <Search className="h-6 w-6 text-gray-600 hover:text-pink-400 transition-colors" />
              </div>
              <div className="relative hover-scale cursor-pointer">
                <Heart className="h-6 w-6 text-gray-600 hover:text-red-400 transition-colors" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs animate-bounce-slow">
                    {wishlistCount}
                  </Badge>
                )}
              </div>
              <Link href="/cart">
                <div className="relative hover-scale cursor-pointer">
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-pink-400 transition-colors" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-pink-500 text-xs animate-bounce-slow">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              </Link>
              <Button 
                variant="ghost" 
                className="md:hidden hover-scale"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-in-top bg-white border-t border-pink-100 py-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/">
                  <Button variant="ghost" className="text-left w-full">Startseite</Button>
                </Link>
                <Link href="/products">
                  <Button variant="ghost" className="text-left w-full">Produkte</Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" className="text-left w-full">Warenkorb</Button>
                </Link>
                <Link href="/tracking">
                  <Button variant="ghost" className="text-left w-full">Bestellung verfolgen</Button>
                </Link>
                <Link href="/account">
                  <Button variant="ghost" className="text-left w-full">Konto</Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-400 rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-rose-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-32 w-16 h-16 bg-purple-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Sidebar */}
            <div className="animate-fade-in-left">
              <Card className="glass hover-lift border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500 mb-2 animate-pulse-slow">vorherige → nächste</div>
                    <div className="flex space-x-1">
                      {heroSlides.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-pink-400 w-6' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-4 gradient-text">Artikel von guter Qualität</h2>

                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Beuty's Secret ist bekannt für hochwertige Kleidung, die stilvoll und bequem ist. Die Materialien
                    sind sorgfältig ausgewählt, um sowohl Komfort als auch Langlebigkeit zu gewährleisten.
                  </p>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <div className="flex space-x-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          className={`w-12 h-12 hover-scale transition-all duration-200 ${
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

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    + zum Warenkorb hinzufügen
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Center Content */}
            <div className="text-center animate-fade-in-up">
              <div className="relative">
                <div className="text-6xl md:text-8xl font-bold text-gray-300 opacity-30 mb-4 animate-pulse-slow">
                  {heroSlides[currentSlide].title}
                </div>
                <div className="text-4xl md:text-6xl font-bold text-gray-700 mb-8 leading-tight">
                  {heroSlides[currentSlide].subtitle}
                </div>
                <div className="flex justify-center items-center space-x-2 mb-8">
                  <span className="text-lg font-semibold text-pink-500">1</span>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400"></div>
                  <span className="text-lg text-gray-400">5</span>
                </div>
                
                {/* Play Button */}
                <div className="flex justify-center">
                  <Button className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 hover-scale shadow-lg">
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Model Image */}
            <div className="flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Image
                  src={heroSlides[currentSlide].image}
                  alt="Model in luxury lingerie"
                  width={500}
                  height={700}
                  className="rounded-2xl relative z-10 hover-scale transition-all duration-500 shadow-2xl"
                />
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEU
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 hover-scale"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 hover-scale"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Qualität", desc: "Materialien höchster Qualität" },
              { icon: Shield, title: "Sicheres Einkaufen", desc: "100% sichere Transaktionen" },
              { icon: Truck, title: "Schnelle Lieferung", desc: "Kostenloser Versand weltweit" },
              { icon: RefreshCw, title: "Einfache Rücksendung", desc: "30-Tage Rückgaberecht" }
            ].map((feature, index) => (
              <div key={index} className="text-center stagger-item">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
                  <feature.icon className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pyjama-Stil Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-400 mb-4 animate-fade-in-up">unser Artikel</h2>
              <h3 className="text-4xl font-bold gradient-text mb-4 animate-fade-in-up">Pyjama-Stil</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto animate-pulse-slow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover-lift border-0 shadow-lg stagger-item">
                  <CardContent className="p-0 relative group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        {product.isNew && (
                          <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                            NEU
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge className="bg-red-500 text-white">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                          onClick={addToWishlist}
                        >
                          <Heart className="w-4 h-4 text-pink-500" />
                        </Button>
                        <Button
                          size="sm"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                          onClick={addToCart}
                        >
                          <ShoppingCart className="w-4 h-4 text-pink-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-lg text-pink-600">{product.price}</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-12 h-1 bg-gray-300 rounded hover:bg-pink-400 transition-colors cursor-pointer"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded"></div>
              <div className="w-12 h-1 bg-gray-300 rounded hover:bg-pink-400 transition-colors cursor-pointer"></div>
            </div>
          </div>

          {/* Anderes Pyjama Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold gradient-text mb-4 animate-fade-in-up">Anderes Pyjama</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto animate-pulse-slow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover-lift border-0 shadow-lg stagger-item">
                  <CardContent className="p-0 relative group">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        {product.isNew && (
                          <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                            NEU
                          </Badge>
                        )}
                        {product.discount > 0 && (
                          <Badge className="bg-red-500 text-white">
                            -{product.discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                          onClick={addToWishlist}
                        >
                          <Heart className="w-4 h-4 text-pink-500" />
                        </Button>
                        <Button
                          size="sm"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white hover-scale"
                          onClick={addToCart}
                        >
                          <ShoppingCart className="w-4 h-4 text-pink-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-lg text-pink-600">{product.price}</span>
                      </div>
                      <h4 className="font-medium text-gray-800 mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-xl hover-lift">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Abonnieren Sie uns</h3>
                <p className="text-pink-100 mb-6">Erhalten Sie exklusive Angebote und Neuigkeiten</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Ihre E-Mail" 
                    className="flex-1 border-0 rounded-full px-4 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50" 
                  />
                  <Button className="bg-white text-pink-500 hover:bg-gray-100 rounded-full px-8 hover-scale">
                    Abonnieren!
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold gradient-text mb-8">Soziales Netzwerk</h3>
            <div className="flex justify-center space-x-6">
              {[
                { icon: Instagram, bg: "from-pink-400 to-purple-500", label: "IG" },
                { icon: Facebook, bg: "from-blue-500 to-blue-600", label: "f" },
                { icon: Twitter, bg: "from-blue-400 to-blue-500", label: "X" },
                { icon: Youtube, bg: "from-red-500 to-red-600", label: "YT" }
              ].map((social, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 bg-gradient-to-r ${social.bg} rounded-full flex items-center justify-center hover-scale cursor-pointer shadow-lg`}
                >
                  <span className="text-white font-bold">{social.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: MapPin, title: "Adresse", content: "Flughafenstrasse 3/Airport\nKloten, 8302 Kloten\nSchweiz" },
              { icon: Phone, title: "Telefon", content: "Telefonnummer:\n+41 79 552 00 31" },
              { icon: Clock, title: "Öffnungszeiten", content: "Bis 10 Uhr morgens\nnach 21 Uhr" },
              { icon: Mail, title: "E-Mail", content: "Beutyssecret@gmail.com" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center stagger-item">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 hover-scale">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-pink-100 whitespace-pre-line">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 pt-8 border-t border-pink-500/30">
            <p className="text-pink-200">@Alle Rechte vorbehalten - Beuty's Secret 2024</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
