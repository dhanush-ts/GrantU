"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, User, Building, Target, Lightbulb } from "lucide-react"
import { fetchWithAuth } from "@/api"

const RequestPopup = ({ isOpen, onClose, type, userData }) => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchRequests()
    }
  }, [isOpen, type])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken")
      const endpoint =
        type === "mentee"
          ? "/user/requests/mentee/"
          : "/user/requests/mentor/"

      const response = await fetchWithAuth(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setRequests(data.data || [])
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth(`/user/requests/${bookingId}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      fetchRequests() // Refresh the list
    } catch (error) {
      console.error("Error accepting request:", error)
    }
  }

  const handleReject = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth(`/user/requests/reject/${bookingId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      fetchRequests() // Refresh the list
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-purple-600">{type === "mentee" ? "Mentee" : "Mentor"} Requests</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full group">
            <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No requests found</div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => {
                const person = type === "mentee" ? request.Mentor : request.Mentee
                return (
                  <Card key={request.Booking_ID} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">
                                {person.First_Name} {person.Last_Name}
                              </h3>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                {person.organization_detail || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-purple-600 flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Expertise
                              </h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {person.Expertise?.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                )) || <span className="text-gray-500 text-sm">Not specified</span>}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-purple-600 flex items-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Interests
                              </h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {person.Field_of_Interest?.map((interest, idx) => (
                                  <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                    {interest}
                                  </span>
                                )) || <span className="text-gray-500 text-sm">Not specified</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Request Details</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Description:</strong> {request.Description}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Details:</strong> {request.Details}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Requirements:</strong> {person.Requirements || "Not specified"}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-4">
                            {request.can_accept ? (
                              <>
                                <Button
                                  onClick={() => handleAccept(request.Booking_ID)}
                                  className="bg-green-500 hover:bg-green-600 text-white flex-1"
                                >
                                  Accept
                                </Button>
                                <Button
                                  onClick={() => handleReject(request.Booking_ID)}
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Button disabled className="flex-1">
                                {request.status === "accepted" ? "Accepted" : "Pending"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestPopup
