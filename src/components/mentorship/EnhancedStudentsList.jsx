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
  MessageSquare,
  Check,
  Loader2,
} from "lucide-react"
import { fetchWithAuth } from "@/api"
import FieldOfInterestSelector from "@/constants/FieldOfInterestSelector"

const EnhancedStudentsList = ({ act }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [buttonLoading, setButtonLoading] = useState({})
  const [formErrors, setFormErrors] = useState({})
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

  const validateForm = () => {
    const errors = {}
    if (!requestData.description.trim()) {
      errors.description = "Description is required"
    }
    if (!requestData.details.trim()) {
      errors.details = "Details are required"
    }
    if (requestData.interests.length === 0) {
      errors.interests = "At least one field of interest is required"
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const sendRequest = async () => {
    if (!validateForm()) return

    setButtonLoading((prev) => ({ ...prev, sendRequest: true }))
    try {
      const token = localStorage.getItem("authToken")
      const payload = {
        [act === "Mentor" ? "Mentor" : "Mentee"]: selectedStudent.User_ID,
        Description: requestData.description,
        Details: requestData.details,
        Selection_By: act === "Mentor" ? "mentee" : "mentor",
        Interests: requestData.interests,
      }
      await fetchWithAuth("/user/connection/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      setShowRequestModal(false)
      setRequestData({ description: "", details: "", interests: [] })
      setFormErrors({})
      fetchStudents()
    } catch (error) {
      console.error("Error sending request:", error)
    } finally {
      setButtonLoading((prev) => ({ ...prev, sendRequest: false }))
    }
  }

  const acceptRequest = async (studentId) => {
    setButtonLoading((prev) => ({ ...prev, [studentId]: true }))
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
      setButtonLoading((prev) => ({ ...prev, [studentId]: false }))
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
          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border">
            {item}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs border">+{remainingCount} more</span>
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
          className="bg-green-600 hover:bg-green-700 text-white border-0"
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
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Expertise
                  </h4>
                  {renderListItems(student.Expertise)}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    Interests
                  </h4>
                  {renderListItems(student.Field_of_Interest)}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Looking for
                  </h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-700">{truncateText(student.Requirements)}</p>
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
                  <h3 className="text-lg font-semibold">Connect with {selectedStudent?.First_Name}</h3>
                  <p className="text-blue-100 text-sm">Send a connection request</p>
                </div>
                <button
                  onClick={() => {
                    setShowRequestModal(false)
                    setFormErrors({})
                  }}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={requestData.description}
                  onChange={(e) => {
                    setRequestData({ ...requestData, description: e.target.value })
                    if (formErrors.description) {
                      setFormErrors({ ...formErrors, description: "" })
                    }
                  }}
                  className={`w-full p-2 border rounded focus:outline-none ${
                    formErrors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="Brief description of your request"
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Field of Interest <span className="text-red-500">*</span>
                </label>
                <FieldOfInterestSelector
                  value={requestData.interests}
                  onChange={(interests) => {
                    setRequestData({ ...requestData, interests })
                    if (formErrors.interests) {
                      setFormErrors({ ...formErrors, interests: "" })
                    }
                  }}
                  placeholder="Search or add interests..."
                  inputClassName={`w-full p-2 border rounded focus:outline-none ${
                    formErrors.interests
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  buttonClassName="rounded-r px-3 py-2"
                  dropdownClassName="border border-gray-300 rounded shadow-lg"
                  labelClassName="text-sm font-medium mb-1 text-gray-700"
                  badgeClassName="px-2 py-1 rounded"
                />
                {formErrors.interests && <p className="text-red-500 text-xs mt-1">{formErrors.interests}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={requestData.details}
                  onChange={(e) => {
                    setRequestData({ ...requestData, details: e.target.value })
                    if (formErrors.details) {
                      setFormErrors({ ...formErrors, details: "" })
                    }
                  }}
                  className={`w-full p-2 border rounded h-20 focus:outline-none resize-none ${
                    formErrors.details ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="Detailed information about what you need help with"
                />
                {formErrors.details && <p className="text-red-500 text-xs mt-1">{formErrors.details}</p>}
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
                  onClick={() => {
                    setShowRequestModal(false)
                    setFormErrors({})
                  }}
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
