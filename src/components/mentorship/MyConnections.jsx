"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Plus, X, Sparkles, Star, Zap } from "lucide-react"
import { fetchWithAuth } from "@/api"
import EnhancedStudentsList from "./EnhancedStudentsList"

const MyConnections = ({ userData, type, act }) => {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const maxConnections = type === "students" ? 3 : 5

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    fetchConnections()
  }, [type])

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const endpoint =
        type === "students" ? "/user/requests/mentor?accepted_only=true" : "/user/requests/mentee?accepted_only=true"
      const response = await fetchWithAuth(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setConnections(data.data || [])
    } catch (error) {
      console.error("Error fetching connections:", error)
    } finally {
      setLoading(false)
    }
  }

  const getResponsiveValues = () => {
    if (typeof window === "undefined") return { radius: 180, cardSize: "w-32 h-32" }

    const width = window.innerWidth
    if (width < 640) {
      // Mobile
      return {
        radius: 120,
        cardSize: "w-24 h-24",
        centerSize: "w-32 h-32",
        containerHeight: "h-[500px]",
      }
    } else if (width < 1024) {
      // Tablet
      return {
        radius: 160,
        cardSize: "w-32 h-32",
        centerSize: "w-40 h-40",
        containerHeight: "h-[600px]",
      }
    } else {
      // Desktop
      return {
        radius: 220,
        cardSize: "w-40 h-40",
        centerSize: "w-52 h-52",
        containerHeight: "h-[700px]",
      }
    }
  }

  const { radius, cardSize, centerSize, containerHeight } = getResponsiveValues()

  const renderConnectionCard = (connection, index) => {
    const person = type === "students" ? connection.Mentee : connection.Mentor
    const angle = index * (360 / maxConnections) * (Math.PI / 180)
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
      <div key={connection.Booking_ID}>
        {/* Connection Node */}
        <div
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 animate-float z-10 ${cardSize}`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            animationDelay: `${index * 0.3}s`,
          }}
        >
          <Card className="w-full h-full hover:shadow-2xl transition-all duration-700 hover:scale-110 bg-gradient-to-br from-white via-purple-50 to-blue-50 border-2 border-purple-300 hover:border-purple-500 relative overflow-hidden group">
            <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center h-full relative">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />

              {/* Floating particles - hidden on mobile for performance */}
              <div className="hidden sm:block absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 animate-pulse" />
              </div>
              <div
                className="hidden sm:block absolute bottom-1 left-1 sm:bottom-2 sm:left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ animationDelay: "0.5s" }}
              >
                <Zap className="h-2 w-2 sm:h-3 sm:w-3 text-blue-400 animate-pulse" />
              </div>

              {/* Profile Avatar */}
              <div className="w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-1 sm:mb-3 shadow-xl relative z-10 group-hover:shadow-2xl transition-shadow duration-300">
                <User className="h-4 w-4 sm:h-6 md:h-8 sm:w-6 md:w-8 text-white" />
                <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20 group-hover:opacity-40" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
              </div>

              {/* User Info */}
              <div className="text-center relative z-10">
                <p className="text-xs sm:text-sm font-bold text-gray-800 leading-tight group-hover:text-purple-700 transition-colors duration-300 truncate max-w-full">
                  {person.First_Name}
                </p>
                <p className="text-xs text-gray-600 font-medium group-hover:text-purple-600 transition-colors duration-300 mb-1 sm:mb-2 truncate">
                  {person.Last_Name}
                </p>

                {/* Expertise indicator - simplified for mobile */}
                {person.Expertise && person.Expertise.length > 0 && (
                  <div className="flex justify-center space-x-1">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" />
                    <div
                      className="w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-1 h-1 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                )}
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </CardContent>
          </Card>
        </div>

        {/* Connection Line - Responsive */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <filter id={`glow-${index}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main connection line */}
          <line
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${x}px)`}
            y2={`calc(50% + ${y}px)`}
            stroke={`url(#gradient-${index})`}
            strokeWidth={isMobile ? "2" : "4"}
            filter={`url(#glow-${index})`}
            className="animate-pulse-glow"
          />

          {/* Outer glow line - hidden on mobile for performance */}
          {!isMobile && (
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke="#8b5cf6"
              strokeWidth="8"
              opacity="0.3"
              filter="url(#glow)"
              className="animate-pulse-glow"
              style={{ animationDelay: "0.5s" }}
            />
          )}

          {/* Animated particles along the line - simplified for mobile */}
          <circle
            cx={`calc(50% + ${x * 0.3}px)`}
            cy={`calc(50% + ${y * 0.3}px)`}
            r={isMobile ? "2" : "3"}
            fill="white"
            opacity="0.8"
            className="animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {!isMobile && (
            <circle
              cx={`calc(50% + ${x * 0.7}px)`}
              cy={`calc(50% + ${y * 0.7}px)`}
              r="2"
              fill="#fde047"
              opacity="0.7"
              className="animate-bounce"
              style={{ animationDelay: `${index * 0.2 + 0.3}s` }}
            >
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>
    )
  }

  const renderEmptySlot = (index) => {
    const angle = index * (360 / maxConnections) * (Math.PI / 180)
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
      <div key={`empty-${index}`}>
        {/* Empty Slot Node */}
        <div
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 ${cardSize}`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
          }}
        >
          <Card className="w-full h-full border-dashed border-2 sm:border-3 border-gray-300 hover:border-purple-400 transition-all duration-500 cursor-pointer hover:scale-110 bg-gradient-to-br from-gray-50 to-white hover:shadow-xl group relative overflow-hidden">
            <CardContent
              className="p-2 sm:p-4 flex flex-col items-center justify-center h-full relative"
              onClick={() => setShowAddModal(true)}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Plus Icon */}
              <div className="w-8 h-8 sm:w-12 md:w-16 sm:h-12 md:h-16 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-purple-200 group-hover:to-purple-300 rounded-full flex items-center justify-center mb-1 sm:mb-3 transition-all duration-300 relative z-10 group-hover:shadow-lg">
                <Plus className="h-4 w-4 sm:h-6 md:h-8 sm:w-6 md:w-8 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-20 animate-ping" />
              </div>

              {/* Text */}
              <p className="text-xs text-gray-500 group-hover:text-purple-600 text-center font-medium transition-colors duration-300 relative z-10 leading-tight">
                Add {type === "students" ? "Student" : "Mentor"}
              </p>

              {/* Sparkle effects on hover - hidden on mobile */}
              <div className="hidden sm:block absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-purple-400 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashed Connection Line */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{ width: "100%", height: "100%" }}
        >
          <line
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${x}px)`}
            y2={`calc(50% + ${y}px)`}
            stroke="#d1d5db"
            strokeWidth={isMobile ? "1" : "2"}
            strokeDasharray="8,4"
            opacity="0.5"
          />
        </svg>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-purple-600 mx-auto"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 sm:h-16 sm:w-16 border-2 border-purple-300 mx-auto opacity-20"></div>
        </div>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 animate-pulse">Loading your network...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-pink-100/40 rounded-3xl blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-50/20 to-transparent animate-pulse-slow" />

      {/* Floating background particles - reduced on mobile */}
      <div className="hidden sm:block absolute top-10 left-10 w-4 h-4 bg-purple-300 rounded-full opacity-30 animate-float" />
      <div
        className="hidden sm:block absolute top-20 right-20 w-3 h-3 bg-blue-300 rounded-full opacity-40 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="hidden lg:block absolute bottom-20 left-20 w-2 h-2 bg-pink-300 rounded-full opacity-50 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="hidden lg:block absolute bottom-10 right-10 w-5 h-5 bg-yellow-300 rounded-full opacity-20 animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className={`relative ${containerHeight} flex items-center justify-center`}>
        {/* Ultra Enhanced Center Profile */}
        <Card
          className={`${centerSize} z-20 shadow-2xl border-2 sm:border-4 border-purple-400 bg-gradient-to-br from-white via-purple-50 to-blue-50 relative overflow-hidden group hover:scale-105 transition-all duration-500`}
        >
          <CardContent className="p-3 sm:p-6 flex flex-col items-center justify-center h-full relative">
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 animate-pulse-slow" />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />

            {/* Sparkle constellation - simplified for mobile */}
            <div className="hidden sm:block absolute top-2 right-2 sm:top-3 sm:right-3">
              <Sparkles className="h-3 w-3 sm:h-5 sm:w-5 text-purple-400 animate-pulse" />
            </div>
            <div className="hidden sm:block absolute top-4 right-6 sm:top-6 sm:right-8">
              <Star
                className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <div className="hidden sm:block absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
              <Sparkles
                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="hidden sm:block absolute bottom-4 left-6 sm:bottom-6 sm:left-8">
              <Zap className="h-2 w-2 sm:h-3 sm:w-3 text-pink-400 animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            {/* Enhanced Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-2 sm:mb-4 shadow-2xl relative z-10 group-hover:shadow-purple-500/50 transition-all duration-500">
              <User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
              <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
              <div className="absolute -inset-1 rounded-full bg-white opacity-20 animate-pulse" />
            </div>

            {/* Enhanced User Info */}
            <div className="text-center relative z-10">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors duration-300">
                {userData?.First_Name}
              </p>
              <p className="text-sm text-gray-600 font-medium mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors duration-300">
                {userData?.Last_Name}
              </p>
              <div className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 rounded-full shadow-inner">
                <p className="text-xs sm:text-sm font-bold text-purple-700">
                  {type === "students" ? "🎓 Mentor" : "📚 Mentee"}
                </p>
              </div>
            </div>

            {/* Orbital rings - hidden on mobile for performance */}
            <div className="hidden sm:block absolute inset-4 border border-purple-200 rounded-full opacity-30 animate-spin-slow" />
            <div
              className="hidden lg:block absolute inset-8 border border-blue-200 rounded-full opacity-20 animate-spin-slow"
              style={{ animationDirection: "reverse", animationDelay: "1s" }}
            />
          </CardContent>
        </Card>

        {/* Render Connections */}
        {connections.map((connection, index) => renderConnectionCard(connection, index))}

        {/* Render Empty Slots */}
        {Array.from({ length: maxConnections - connections.length }, (_, index) =>
          renderEmptySlot(connections.length + index),
        )}
      </div>

      {/* Ultra Enhanced Stats */}
      <div className="text-center mt-8 sm:mt-12 pb-8">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 sm:px-8 shadow-xl border border-purple-200 hover:shadow-2xl transition-all duration-300 max-w-full">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30" />
            </div>
            <span className="text-base sm:text-lg font-bold text-gray-700">{connections.length} Connected</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="w-full sm:w-px h-px sm:h-6 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-gray-300 to-transparent sm:hidden" />
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
            <span className="text-base sm:text-lg text-gray-600">{maxConnections - connections.length} Available</span>
          </div>
        </div>
      </div>

      {/* Enhanced Add Modal - Mobile Optimized */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-purple-200 relative flex flex-col">
            {/* Modal header with gradient */}
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white p-4 sm:p-8 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20" />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-bold">Add {type === "students" ? "Student" : "Mentor"}</h2>
                    <p className="text-purple-100 text-sm sm:text-lg">Expand your network</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 sm:p-3 hover:bg-white/20 rounded-full transition-colors duration-200 group"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-gradient-to-br from-gray-50 to-white">
              <EnhancedStudentsList act={act} userData={userData} />
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default MyConnections
