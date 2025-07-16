"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Plus, X, Sparkles } from "lucide-react"
import StudentsList from "./StudentsList"

const MyConnections = ({ userData, type, act }) => {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const maxConnections = type === "students" ? 3 : 5

  useEffect(() => {
    fetchConnections()
  }, [type])

  const fetchConnections = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const endpoint =
        type === "students"
          ? "http://127.0.0.1:8000/api/user/requests/mentor?accepted_only=true"
          : "http://127.0.0.1:8000/api/user/requests/mentee?accepted_only=true"

      const response = await fetch(endpoint, {
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

  const renderConnectionCard = (connection, index) => {
    const person = type === "students" ? connection.Mentee : connection.Mentor
    const angle = index * (360 / maxConnections) * (Math.PI / 180)
    const radius = 140
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
      <div
        key={connection.Booking_ID}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          animationDelay: `${index * 0.2}s`,
        }}
      >
        <Card className="w-32 h-32 hover:shadow-2xl transition-all duration-500 hover:scale-110 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 hover:border-purple-400">
          <CardContent className="p-3 flex flex-col items-center justify-center h-full relative overflow-hidden">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />

            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-2 shadow-lg relative z-10">
              <User className="h-6 w-6 text-white" />
              <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
            </div>

            <div className="text-center relative z-10">
              <p className="text-sm font-bold text-gray-800 leading-tight">{person.First_Name}</p>
              <p className="text-xs text-gray-600 font-medium">{person.Last_Name}</p>

              {/* Mini expertise indicators */}
              {person.Expertise && person.Expertise.length > 0 && (
                <div className="flex justify-center mt-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced glowing connection line */}
        <div className="absolute" style={{ left: "50%", top: "50%" }}>
          <div
            className="absolute origin-bottom-left bg-gradient-to-t from-purple-500 via-purple-400 to-transparent opacity-60 animate-pulse"
            style={{
              width: "3px",
              height: `${radius - 64}px`,
              transform: `rotate(${Math.atan2(y, x) + Math.PI / 2}rad)`,
              boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
            }}
          />
          <div
            className="absolute origin-bottom-left bg-gradient-to-t from-purple-300 to-transparent opacity-40 animate-pulse"
            style={{
              width: "6px",
              height: `${radius - 64}px`,
              transform: `rotate(${Math.atan2(y, x) + Math.PI / 2}rad) translateX(-1.5px)`,
              filter: "blur(2px)",
              animationDelay: "0.5s",
            }}
          />
        </div>
      </div>
    )
  }

  const renderEmptySlot = (index) => {
    const angle = index * (360 / maxConnections) * (Math.PI / 180)
    const radius = 140
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return (
      <div
        key={`empty-${index}`}
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
        }}
      >
        <Card className="w-32 h-32 border-dashed border-3 border-gray-300 hover:border-purple-400 transition-all duration-300 cursor-pointer hover:scale-105 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg">
          <CardContent
            className="p-3 flex flex-col items-center justify-center h-full relative group"
            onClick={() => setShowAddModal(true)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-purple-200 group-hover:to-purple-300 rounded-full flex items-center justify-center mb-2 transition-all duration-300">
              <Plus className="h-6 w-6 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
            </div>
            <p className="text-xs text-gray-500 group-hover:text-purple-600 text-center font-medium transition-colors duration-300">
              Add {type === "students" ? "Student" : "Mentor"}
            </p>
          </CardContent>
        </Card>

        {/* Dashed connection line */}
        <div className="absolute" style={{ left: "50%", top: "50%" }}>
          <div
            className="absolute origin-bottom-left border-l-2 border-dashed border-gray-300 opacity-50"
            style={{
              height: `${radius - 64}px`,
              transform: `rotate(${Math.atan2(y, x) + Math.PI / 2}rad)`,
            }}
          />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading connections...</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-3xl blur-3xl" />

      <div className="relative h-[500px] flex items-center justify-center">
        {/* Enhanced center profile */}
        <Card className="w-40 h-40 z-10 shadow-2xl border-4 border-purple-300 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-pulse" />

            {/* Sparkle effects */}
            <div className="absolute top-2 right-2">
              <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            </div>
            <div className="absolute bottom-2 left-2">
              <Sparkles className="h-3 w-3 text-blue-400 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-3 shadow-xl relative z-10">
              <User className="h-8 w-8 text-white" />
              <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
            </div>

            <div className="text-center relative z-10">
              <p className="text-lg font-bold text-gray-800">{userData?.First_Name}</p>
              <p className="text-sm text-gray-600 font-medium">{userData?.Last_Name}</p>
              <div className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                <p className="text-xs font-semibold text-purple-700">{type === "students" ? "Mentor" : "Mentee"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connections */}
        {connections.map((connection, index) => renderConnectionCard(connection, index))}

        {/* Empty slots */}
        {Array.from({ length: maxConnections - connections.length }, (_, index) =>
          renderEmptySlot(connections.length + index),
        )}
      </div>

      {/* Enhanced stats */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg border border-purple-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">{connections.length} Connected</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <span className="text-sm text-gray-600">{maxConnections - connections.length} Available</span>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-purple-200">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
              <h2 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Add {type === "students" ? "Student" : "Mentor"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <StudentsList act={act} userData={userData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyConnections
