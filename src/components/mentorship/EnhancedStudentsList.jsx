"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  User,
  UserCheck,
  Clock,
  Send,
  X,
  Target,
  Lightbulb,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { fetchWithAuth } from "@/api"

const EnhancedStudentsList = ({ userData, act }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [requestData, setRequestData] = useState({
    description: "",
    details: "",
    interests: "",
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetchWithAuth("/user/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      setStudents(data.students || [])
    } catch (error) {
      console.error("Error fetching students:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendRequest = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const payload = {
        [act === "Mentor" ? "Mentor" : "Mentee"]: selectedStudent.User_ID,
        Description: requestData.description,
        Details: requestData.details,
        Selection_By: act === "Mentor" ? "mentee" : "mentor",
        Interests: requestData.interests
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i),
      }

      await fetchWithAuth("/user/booking/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      setShowRequestModal(false)
      setRequestData({ description: "", details: "", interests: "" })
      fetchStudents()
    } catch (error) {
      console.error("Error sending request:", error)
    }
  }

  const getStatusIcon = (student) => {
    if (student.your_student) {
      return (
        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
          <UserCheck className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">Student</span>
        </div>
      )
    }
    if (student.your_mentor) {
      return (
        <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
          <UserCheck className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Mentor</span>
        </div>
      )
    }
    if (student.request_pending) {
      return (
        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
          <Clock className="h-4 w-4 text-yellow-600 animate-pulse" />
          <span className="text-xs font-medium text-yellow-700">Pending</span>
        </div>
      )
    }
    return (
      <Button
        size="sm"
        onClick={() => {
          setSelectedStudent(student)
          setShowRequestModal(true)
        }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <Send className="h-4 w-4 mr-1" />
        Connect
      </Button>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Discovering amazing people...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Connect with Amazing People</h2>
        <p className="text-gray-600">Find your perfect {act === "Mentor" ? "mentor" : "mentee"} match</p>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {students.map((student, index) => (
          <Card
            key={student.User_ID}
            className="hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Sparkle effect */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </div>

            <CardContent className="p-6 relative z-10">
              {/* Header with Avatar and Status */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-xl">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                      {student.First_Name} {student.Last_Name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Building className="h-4 w-4" />
                      {student.organization_detail || "Organization not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">{getStatusIcon(student)}</div>
              </div>

              {/* Expertise Section */}
              {student.Expertise && student.Expertise.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.Expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200 border border-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Field of Interest Section */}
              {student.Field_of_Interest && student.Field_of_Interest.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.Field_of_Interest.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements Section */}
              {student.Requirements && (
                <div className="mb-6">
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    What they're looking for
                  </h4>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-400 shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed italic">"{student.Requirements}"</p>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {/* <div className="pt-4 border-t border-gray-200 space-y-2">
                <p className="text-sm text-gray-600 flex items-center gap-2 hover:text-purple-600 transition-colors duration-200">
                  <Mail className="h-4 w-4" />
                  {student.Email_Address}
                </p>
                {student.Phone_Number && (
                  <p className="text-sm text-gray-600 flex items-center gap-2 hover:text-purple-600 transition-colors duration-200">
                    <Phone className="h-4 w-4" />
                    {student.Phone_Number}
                  </p>
                )}
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-purple-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Connect with {selectedStudent?.First_Name}</h3>
                  <p className="text-purple-100 text-sm mt-1">Send a connection request</p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 group"
                >
                  <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                <input
                  type="text"
                  value={requestData.description}
                  onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-200"
                  placeholder="Brief description of your request"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Details</label>
                <textarea
                  value={requestData.details}
                  onChange={(e) => setRequestData({ ...requestData, details: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl h-24 focus:border-purple-400 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Detailed information about what you need help with"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={requestData.interests}
                  onChange={(e) => setRequestData({ ...requestData, interests: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors duration-200"
                  placeholder="AI, Machine Learning, Web Development"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={sendRequest}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex-1 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all duration-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedStudentsList