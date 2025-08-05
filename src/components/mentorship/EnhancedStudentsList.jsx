"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, UserCheck, Clock, Send, X, Target, Lightbulb, Building, MessageSquare, Check, Loader2 } from 'lucide-react'
import { fetchWithAuth } from "@/api"
import FieldOfInterestSelector from "@/constants/FieldOfInterestSelector"

export const EnhancedStudentsList = ({ userData, act }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [buttonLoading, setButtonLoading] = useState({})
  const [requestData, setRequestData] = useState({
    description: "",
    details: "",
    interests: [],
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetchWithAuth(`/user/list/?type=${act === "Mentor" ? "mentor" : "mentee"}`, {
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
    setButtonLoading(prev => ({ ...prev, sendRequest: true }))
    try {
      const token = localStorage.getItem("authToken")
      const payload = {
        [act === "Mentor" ? "Mentor" : "Mentee"]: selectedStudent.User_ID,
        Description: requestData.description,
        Details: requestData.details,
        Selection_By: act === "Mentor" ? "mentee" : "mentor",
        Interests: requestData.interests,
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
      setRequestData({ description: "", details: "", interests: [] })
      fetchStudents()
    } catch (error) {
      console.error("Error sending request:", error)
    } finally {
      setButtonLoading(prev => ({ ...prev, sendRequest: false }))
    }
  }

  const acceptRequest = async (studentId) => {
    setButtonLoading(prev => ({ ...prev, [studentId]: true }))
    try {
      const token = localStorage.getItem("authToken")
      const queryParam = act === "Mentor" ? "mentee" : "mentor"
      await fetchWithAuth(`/user/requests/user/${studentId}/?type=${queryParam}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      fetchStudents()
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setButtonLoading(prev => ({ ...prev, [studentId]: false }))
    }
  }

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "Not mentioned"
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const renderListItems = (items, maxVisible = 4) => {
    if (!items || items.length === 0) return <span className="text-gray-500 text-sm">Not mentioned</span>
    
    const visibleItems = items.slice(0, maxVisible)
    const remainingCount = items.length - maxVisible

    return (
      <div className="flex flex-wrap gap-1">
        {visibleItems.map((item, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border"
          >
            {item}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs border">
            +{remainingCount} more
          </span>
        )}
      </div>
    )
  }

  const getStatusIcon = (student) => {
    if (student.can_accept) {
      return (
        <Button
          size="sm"
          onClick={() => acceptRequest(student.User_ID)}
          disabled={buttonLoading[student.User_ID]}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {buttonLoading[student.User_ID] ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Accept
            </>
          )}
        </Button>
      )
    }

    if (student.your_student) {
      return (
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-200">
          <UserCheck className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">Student</span>
        </div>
      )
    }

    if (student.your_mentor) {
      return (
        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded border border-blue-200">
          <UserCheck className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Mentor</span>
        </div>
      )
    }

    if (student.request_pending) {
      return (
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
          <Clock className="h-4 w-4 text-yellow-600" />
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
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Send className="h-4 w-4 mr-1" />
        Connect
      </Button>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect with {act === "Mentor" ? "Mentors" : "Mentees"}
        </h2>
        <p className="text-gray-600">Find your perfect {act === "Mentor" ? "mentor" : "mentee"} match</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.User_ID} className="border border-gray-200 h-full">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {student.First_Name} {student.Last_Name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1 truncate">
                      <Building className="h-3 w-3 flex-shrink-0" />
                      {student.organization_detail || "Not mentioned"}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">{getStatusIcon(student)}</div>
              </div>

              <div className="space-y-4">
                {/* Expertise Section */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Expertise
                  </h4>
                  {renderListItems(student.Expertise)}
                </div>

                {/* Interests Section */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    Interests
                  </h4>
                  {renderListItems(student.Field_of_Interest)}
                </div>

                {/* Requirements Section */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Looking for
                  </h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-700">
                      {truncateText(student.Requirements)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full shadow-xl">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">
                    Connect with {selectedStudent?.First_Name}
                  </h3>
                  <p className="text-blue-100 text-sm">Send a connection request</p>
                </div>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={requestData.description}
                  onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of your request"
                />
              </div>

              <div>
                <FieldOfInterestSelector
                  value={requestData.interests}
                  onChange={(interests) => setRequestData({ ...requestData, interests })}
                  placeholder="Search or add interests..."
                  inputClassName="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  buttonClassName="rounded-r px-3 py-2"
                  dropdownClassName="border border-gray-300 rounded shadow-lg"
                  labelClassName="text-sm font-medium mb-1 text-gray-700"
                  badgeClassName="px-2 py-1 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Details
                </label>
                <textarea
                  value={requestData.details}
                  onChange={(e) => setRequestData({ ...requestData, details: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded h-20 focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Detailed information about what you need help with"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={sendRequest}
                  disabled={buttonLoading.sendRequest}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                >
                  {buttonLoading.sendRequest ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1"
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
