"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, User, Building, Target, Lightbulb, Loader2 } from "lucide-react"
import { fetchWithAuth } from "@/api"

export const RequestPopup = ({ isOpen, onClose, type, userData }) => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState({})

  useEffect(() => {
    if (isOpen) {
      fetchRequests()
    }
  }, [isOpen, type])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken")
      const endpoint = type === "mentee" ? "/user/requests/mentee/" : "/user/requests/mentor/"
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
    setButtonLoading((prev) => ({ ...prev, [`accept_${bookingId}`]: true }))
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth(`/user/requests/${bookingId}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      fetchRequests()
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setButtonLoading((prev) => ({ ...prev, [`accept_${bookingId}`]: false }))
    }
  }

  const handleReject = async (bookingId) => {
    setButtonLoading((prev) => ({ ...prev, [`reject_${bookingId}`]: true }))
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth(`/user/requests/reject/${bookingId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      fetchRequests()
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setButtonLoading((prev) => ({ ...prev, [`reject_${bookingId}`]: false }))
    }
  }

  const truncateText = (text, maxLength = 150) => {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">{type === "mentee" ? "Mentee" : "Mentor"} Requests</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(85vh-80px)]">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => {
                const person = type === "mentee" ? request.Mentor : request.Mentee
                return (
                  <Card key={request.Booking_ID} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="grid lg:grid-cols-2 gap-4">
                        {/* Person Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 truncate">
                                {person.First_Name} {person.Last_Name}
                              </h3>
                              <p className="text-gray-600 text-sm flex items-center gap-1 truncate">
                                <Building className="h-4 w-4 flex-shrink-0" />
                                {person.organization_detail || "Not mentioned"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-gray-700 flex items-center gap-1 mb-1">
                                <Target className="h-4 w-4" />
                                Expertise
                              </h4>
                              {renderListItems(person.Expertise)}
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-700 flex items-center gap-1 mb-1">
                                <Lightbulb className="h-4 w-4" />
                                Interests
                              </h4>
                              {renderListItems(person.Field_of_Interest)}
                            </div>
                          </div>
                        </div>

                        {/* Request Details */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Request Details</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Description:</span>
                                <p className="text-gray-700 mt-1">{truncateText(request.Description, 100)}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Details:</span>
                                <p className="text-gray-700 mt-1">{truncateText(request.Details, 100)}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Requirements:</span>
                                <p className="text-gray-700 mt-1">{truncateText(person.Requirements, 100)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            {request.can_accept ? (
                              <>
                                <Button
                                  onClick={() => handleAccept(request.Booking_ID)}
                                  disabled={buttonLoading[`accept_${request.Booking_ID}`]}
                                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                >
                                  {buttonLoading[`accept_${request.Booking_ID}`] ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  ) : null}
                                  Accept
                                </Button>
                                <Button
                                  onClick={() => handleReject(request.Booking_ID)}
                                  disabled={buttonLoading[`reject_${request.Booking_ID}`]}
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50 flex-1"
                                >
                                  {buttonLoading[`reject_${request.Booking_ID}`] ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  ) : null}
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Button disabled className="flex-1 bg-gray-100 text-gray-500">
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
