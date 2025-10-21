"use client"

import { useState, useEffect } from "react"

const ChatPopup = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval
    if (isLoading) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLoading])

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { from: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setElapsedTime(0)

    // Add loading message
    const loadingMessage = { from: "bot", text: "", isLoading: true }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      const sessionId = generateUUID()
      const queryPayload = {
        session_id: sessionId,
        query: input,
      }

      const response = await fetch(
        `https://ai-preprod.grantu.education/chat?query=${encodeURIComponent(JSON.stringify(queryPayload))}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await response.json()

      console.log(data)

      setMessages((prev) => {
        const updated = prev.slice(0, -1) // Remove loading message
        return [
          ...updated,
          {
            from: "bot",
            text: data?.reply?.message || data?.reply,
            profiles: data?.reply?.profiles || [],
            isLoading: false,
          },
        ]
      })
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => {
        const updated = prev.slice(0, -1) // Remove loading message
        return [
          ...updated,
          {
            from: "bot",
            text: "Sorry, I couldn't process your request. Please try again.",
            isLoading: false,
          },
        ]
      })
    } finally {
      setIsLoading(false)
      setElapsedTime(0)
    }
  }

  return (
    <div className="fixed md:bottom-36 md:right-24 bottom-20 right-5 bg-white border shadow-lg w-96 rounded-xl overflow-hidden flex flex-col z-50 max-h-[600px]">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
        <h4 className="text-sm font-semibold">Roe</h4>
        <button onClick={onClose} className="text-white font-bold text-lg hover:opacity-80">
          ×
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">Hi! Ask me anything about finding mentors...</p>
          </div>
        )}

        {/* <CHANGE> Render messages and their profiles together in a single loop */}
        {messages.map((msg, i) => (
          <div key={i}>
            {/* Message bubble */}
            <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white rounded-lg rounded-tr-none"
                    : "bg-gray-100 text-gray-900 rounded-lg rounded-tl-none"
                } px-4 py-3`}
              >
                {msg.isLoading ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">Searching for mentors...</span>
                    </div>
                    <div className="text-xs text-gray-500">{elapsedTime}s elapsed (typically 30-45s)</div>
                    <div className="w-full bg-gray-300 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((elapsedTime / 45) * 100, 95)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
            </div>

            {/* Profiles for this message - rendered immediately after */}
            {msg.from === "bot" && msg.profiles && msg.profiles.length > 0 && (
              <div className="mt-4 space-y-3">
                {msg.profiles.map((profile) => (
                  <div
                    key={profile.profile_number}
                    className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Profile Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-bold text-gray-900 text-base">{profile.name}</h5>
                        <p className="text-xs text-green-600 font-semibold">{profile.expertise}</p>
                      </div>
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        #{profile.profile_number}
                      </span>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-500 font-semibold">Experience</p>
                        <p className="text-gray-900 font-bold">{profile.experience}</p>
                      </div>
                      <div className="bg-white rounded p-2">
                        <p className="text-gray-500 font-semibold">Field</p>
                        <p className="text-gray-900 font-bold">{profile.field_of_interest}</p>
                      </div>
                    </div>

                    {/* Organization */}
                    <div className="bg-white rounded p-2 mb-3">
                      <p className="text-gray-500 font-semibold text-xs">Organization</p>
                      <p className="text-gray-900 text-sm font-medium">{profile.organization}</p>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-white rounded p-2 border-l-2 border-green-500">
                      <p className="text-gray-500 font-semibold text-xs mb-1">Why they match</p>
                      <p className="text-gray-700 text-xs leading-relaxed">{profile.ai_analysis}</p>
                    </div>

                    {/* Requirements */}
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-gray-500 font-semibold text-xs mb-1">Requirements</p>
                      <p className="text-gray-700 text-xs">{profile.requirements}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t px-3 py-2 flex gap-2 bg-gray-50">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          disabled={isLoading}
          className="flex-grow px-3 py-2 outline-none text-sm border border-gray-200 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-gray-100"
          placeholder="Search for mentors..."
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-green-600 text-white px-3 py-2 text-sm font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}

export default ChatPopup