"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  bgColor: string
  ctaText: string
  badge?: string
}

interface HeroSectionProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function HeroSection({ 
  slides, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentSlide, autoPlay, autoPlayInterval])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-rose-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-purple-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-left">
            <div className="space-y-6">
              {/* Badge */}
              {currentSlideData.badge && (
                <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {currentSlideData.badge}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <h2 className="text-2xl md:text-4xl font-light text-gray-600">
                {currentSlideData.subtitle}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                {currentSlideData.description}
              </p>

              {/* CTA Button */}
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white hover-lift shadow-lg px-8 py-4 text-lg"
              >
                {currentSlideData.ctaText}
              </Button>

              {/* Play Button */}
              <div className="flex items-center space-x-4">
                <Button className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 hover-scale shadow-lg">
                  <Play className="w-6 h-6 ml-1" />
                </Button>
                <span className="text-gray-600">Watch our story</span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="text-center animate-fade-in-up">
            <div className="relative">
              <div className="text-6xl md:text-8xl font-bold text-gray-300 opacity-30 mb-4 animate-pulse-slow">
                {currentSlideData.title}
              </div>
              <div className="text-4xl md:text-6xl font-bold text-gray-700 mb-8 leading-tight">
                {currentSlideData.subtitle}
              </div>
              <div className="flex justify-center items-center space-x-2 mb-8">
                <span className="text-lg font-semibold text-pink-500">1</span>
                <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400"></div>
                <span className="text-lg text-gray-400">{slides.length}</span>
              </div>
            </div>
          </div>

          {/* Right side - Model Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in-right">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.title}
                width={500}
                height={700}
                className="rounded-2xl relative z-10 hover-scale transition-all duration-500 shadow-2xl"
              />
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-gradient-to-r from-pink-400 to-rose-400 text-white animate-pulse-slow">
                  <Sparkles className="w-3 h-3 mr-1" />
                  NEW
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 hover-scale z-20"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 hover-scale z-20"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-pink-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-10">
        <div 
          className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  )
} 