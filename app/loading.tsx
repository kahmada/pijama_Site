export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="text-4xl font-script gradient-text font-bold animate-pulse-slow">
            Beuty's Secret
          </div>
        </div>
        
        {/* Spinning Circle */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-pink-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-lg text-gray-600 mb-4 animate-pulse">
          Loading your perfect fit...
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-pink-300 rounded-full animate-float opacity-50"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-rose-300 rounded-full animate-float opacity-50" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-32 w-2 h-2 bg-purple-300 rounded-full animate-float opacity-50" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  )
}
