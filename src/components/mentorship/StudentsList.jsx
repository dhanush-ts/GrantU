"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, UserCheck, Clock, Send, X, Building, Target, Lightbulb, MessageSquare, Mail, Phone } from "lucide-react"

const StudentsList = ({ userData }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [requestData, setRequestData] = useState({
    description: "",
    details: "",
    interests: "",
  })
  const [act, setAct] = useState(userData?.is_mentor ? "Mentor" : "Mentee")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("http://127.0.0.1:8000/api/user/list/", {
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

      await fetch("http://127.0.0.1:8000/api/user/booking/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      setShowRequestModal(false)
      setRequestData({ description: "", details: "", interests: "" })
      fetchStudents() // Refresh the list
    } catch (error) {
      console.error("Error sending request:", error)
    }
  }

  const getStatusIcon = (student) => {
    if (student.your_student) {
      return <UserCheck className="h-5 w-5 text-green-500" title="Your Student" />
    }
    if (student.your_mentor) {
      return <UserCheck className="h-5 w-5 text-blue-500" title="Your Mentor" />
    }
    if (student.request_pending) {
      return <Clock className="h-5 w-5 text-yellow-500" title="Request Pending" />
    }
    return (
      <Button
        size="sm"
        onClick={() => {
          setSelectedStudent(student)
          setShowRequestModal(true)
        }}
        className="bg-purple-500 hover:bg-purple-600 text-white p-2"
      >
        <Send className="h-4 w-4" />
      </Button>
    )
  }

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card
            key={student.User_ID}
            className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {student.First_Name} {student.Last_Name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {student.organization_detail || "Organization not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">{getStatusIcon(student)}</div>
              </div>

              {/* Expertise Section */}
              {student.Expertise && student.Expertise.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.Expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Field of Interest Section */}
              {student.Field_of_Interest && student.Field_of_Interest.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.Field_of_Interest.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements Section */}
              {student.Requirements && (
                <div className="mb-4">
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Requirements
                  </h4>
                  <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                    {student.Requirements}
                  </p>
                </div>
              )}

              {/* Contact Info */}
              {/* <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {student.Email_Address}
                </p>
                {student.Phone_Number && (
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {student.Phone_Number}
                  </p>
                )}
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Send Request to {selectedStudent?.First_Name}</h3>
              <button onClick={() => setShowRequestModal(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={requestData.description}
                  onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Brief description of your request"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Details</label>
                <textarea
                  value={requestData.details}
                  onChange={(e) => setRequestData({ ...requestData, details: e.target.value })}
                  className="w-full p-2 border rounded-md h-20"
                  placeholder="Detailed information about what you need"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Interests (comma-separated)</label>
                <input
                  type="text"
                  value={requestData.interests}
                  onChange={(e) => setRequestData({ ...requestData, interests: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="AI, Machine Learning, Web Development"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={sendRequest} className="bg-purple-500 hover:bg-purple-600 flex-1">
                  Send Request
                </Button>
                <Button variant="outline" onClick={() => setShowRequestModal(false)} className="flex-1">
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

export default StudentsList
