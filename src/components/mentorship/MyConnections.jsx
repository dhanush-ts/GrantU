"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, Calendar, AlertCircle, Plus, ArrowLeft, Users, UserPlus } from "lucide-react"
import { fetchWithAuth } from "@/api"
import EnhancedStudentsList from "./EnhancedStudentsList"
import ConnectionCard from "./ConnectionCard"
import ProfileModal from "./ProfileModal"
import CombinedMeetingsTable from "./CombinedMeetingsTable"
import FreeTimeManager from "./FreeTimeManager"

export default function MyConnections({ userData, type, act, setShowMyConnections }) {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showFreeTimeModal, setShowFreeTimeModal] = useState(false)
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState(null)
  const [freeTime, setFreeTime] = useState({})
  const [meetings, setMeetings] = useState({ upcoming: [], completed: [] })
  const [mentorFreeTime, setMentorFreeTime] = useState({})
  const [meetingForm, setMeetingForm] = useState({
    Connection: "",
    Meeting_Start_Time: "",
    Meeting_End_Time: "",
    Description: "",
  })
  const [ConnectionError, setConnectionError] = useState(null)

  const maxConnections = type === "students" ? 3 : 5
  const isMentor = type === "students"

  useEffect(() => {
    fetchConnections()
    fetchMeetings()
    if (isMentor) {
      fetchFreeTime()
    }
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

  const fetchFreeTime = async (mentorId) => {
    try {
      const token = localStorage.getItem("authToken")
      const endpoint = mentorId ? `/user/freetime?id=${mentorId}` : "/user/freetime/"

      const response = await fetchWithAuth(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      if (mentorId) {
        setMentorFreeTime(data)
      } else {
        setFreeTime(data)
      }
    } catch (error) {
      console.error("Error fetching free time:", error)
    }
  }

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetchWithAuth(`/user/schedule-meeting?type=${type === "students"?"mentor":"mentee"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setMeetings(data)
    } catch (error) {
      console.error("Error fetching meetings:", error)
    }
  }

  const createFreeTimeSlot = async (slot) => {
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth("/user/freetime/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slot),
      })

      fetchFreeTime()
    } catch (error) {
      console.error("Error creating free time slot:", error)
    }
  }

  const deleteFreeTimeSlot = async (id) => {
    try {
      const token = localStorage.getItem("authToken")
      await fetchWithAuth(`/user/freetime/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      fetchFreeTime()
    } catch (error) {
      console.error("Error deleting free time slot:", error)
    }
  }

  const scheduleMeeting = async () => {
    try {
      const convertToUtcZ = (localTimeStr) => {
        const localDate = new Date(localTimeStr)
        localDate.setMinutes(localDate.getMinutes() + 330)
        return localDate.toISOString().split(".")[0] + "Z"
      }

      const formattedForm = {
        Connection: meetingForm.Connection,
        Meeting_Start_Time: convertToUtcZ(meetingForm.Meeting_Start_Time),
        Meeting_End_Time: convertToUtcZ(meetingForm.Meeting_End_Time),
        Description: meetingForm.Description || "Want to learn things!",
      }

      const token = localStorage.getItem("authToken")
      const response = await fetchWithAuth("/user/schedule-meeting/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedForm),
      })

      if (response.status === 203) {
        const errorData = await response.json()
        setConnectionError(errorData)
        return
      }

      setMeetingForm({ Connection: "", Meeting_Start_Time: "", Meeting_End_Time: "", Description: "" })
      setConnectionError(null)
      fetchMeetings()
      setShowMeetingModal(false)
    } catch (error) {
      console.error("Error scheduling meeting:", error)
    }
  }

  const handleScheduleMeeting = (connection) => {
    setSelectedConnection(connection)
    setMeetingForm({ ...meetingForm, Connection: connection.Connection_ID })

    if (!isMentor && connection.Mentor) {
      fetchFreeTime(connection.Mentor.User_ID)
    }

    setShowMeetingModal(true)
  }

  const handleViewProfile = (connection) => {
    setSelectedConnection(connection)
    if (!isMentor && connection.Mentor) {
      fetchFreeTime(connection.Mentor.User_ID)
    }
    setShowProfileModal(true)
  }


  const renderEmptySlots = () => {
    const emptySlots = Math.max(0, maxConnections - connections.length)
    return Array.from({ length: emptySlots }, (_, index) => (
      <Card
        key={`empty-${index}`}
        className="h-full border-2 border-dashed border-purple-300 hover:border-purple-400 transition-colors duration-200 cursor-pointer bg-purple-50 hover:bg-purple-100"
        onClick={() => setShowMyConnections(false)}
      >
        <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          </div>
          <h3 className="text-sm sm:text-lg font-medium text-purple-700 mb-2 text-center">
            Add {type === "students" ? "Student" : "Mentor"}
          </h3>
          <p className="text-xs sm:text-sm text-purple-600 text-center">
            Connect with a new {type === "students" ? "student" : "mentor"}
          </p>
        </CardContent>
      </Card>
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your connections...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm sm:text-base mb-6 text-gray-600 mt-1">
              Manage your {type === "students" ? "students" : "mentors"} and schedule meetings
            </p>
        
          {isMentor && (
            <Dialog open={showFreeTimeModal} onOpenChange={setShowFreeTimeModal}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base px-4 sm:px-6">
                  <Clock className="h-4 w-4 mr-2" />
                  Manage Free Time
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Manage Your Free Time
                  </DialogTitle>
                </DialogHeader>
                <FreeTimeManager
                  freeTime={freeTime}
                  onCreateSlot={createFreeTimeSlot}
                  onDeleteSlot={deleteFreeTimeSlot}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Connections Grid */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Your {type === "students" ? "Students" : "Mentors"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {connections.map((connection) => (
              <ConnectionCard
                key={connection.Connection_ID}
                connection={connection}
                type={type}
                onScheduleMeeting={handleScheduleMeeting}
                onViewProfile={handleViewProfile}
              />
            ))}
            {renderEmptySlots()}
          </div>
        </div>

        {/* Meetings Tables */}
        <div className="space-y-6 sm:space-y-8">
          <CombinedMeetingsTable meetings={meetings} isMentor={isMentor} />
        </div>

        {/* Profile Modal */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          connection={selectedConnection}
          type={type}
          onScheduleMeeting={handleScheduleMeeting}
          mentorFreeTime={mentorFreeTime}
        />

        {/* Add Connection Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-purple-700 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add {type === "students" ? "Student" : "Mentor"}
              </DialogTitle>
            </DialogHeader>
            <EnhancedStudentsList act={act} userData={userData} />
          </DialogContent>
        </Dialog>

        {/* Meeting Modal */}
        {showMeetingModal && selectedConnection && (
          <Dialog open={showMeetingModal} onOpenChange={setShowMeetingModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-purple-700 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {isMentor ? "Schedule Meeting" : "Book Session"} with{" "}
                  {isMentor ? selectedConnection.Mentee?.First_Name : selectedConnection.Mentor?.First_Name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {ConnectionError && (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Connection Conflict</span>
                      </div>
                      <p className="text-red-700">{ConnectionError.error}</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">
                      {isMentor ? "Schedule New Meeting" : "Book Session"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date & Time</label>
                        <Input
                          type="datetime-local"
                          value={meetingForm.Meeting_Start_Time}
                          onChange={(e) =>
                            setMeetingForm({
                              ...meetingForm,
                              Meeting_Start_Time: e.target.value,
                            })
                          }
                          className="border-purple-200 focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">End Date & Time</label>
                        <Input
                          type="datetime-local"
                          value={meetingForm.Meeting_End_Time}
                          onChange={(e) =>
                            setMeetingForm({
                              ...meetingForm,
                              Meeting_End_Time: e.target.value,
                            })
                          }
                          className="border-purple-200 focus:border-purple-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={meetingForm.Description}
                        onChange={(e) =>
                          setMeetingForm({
                            ...meetingForm,
                            Description: e.target.value,
                          })
                        }
                        placeholder="What would you like to discuss?"
                        rows={3}
                        className="border-purple-200 focus:border-purple-400"
                      />
                    </div>

                    <Button
                      onClick={scheduleMeeting}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={
                        !meetingForm.Meeting_Start_Time || !meetingForm.Meeting_End_Time || !meetingForm.Description
                      }
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {isMentor ? "Schedule Meeting" : "Book Session"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
