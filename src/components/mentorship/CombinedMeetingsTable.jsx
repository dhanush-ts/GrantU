"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Video, Calendar, User, Filter, X, MessageSquare, Star, Send, Eye, Clock } from "lucide-react"
import { fetchWithAuth } from "@/api"
import { toast } from "sonner"

export default function CombinedMeetingsTable({ meetings, fetchMeetings }) {
  const isMentor = localStorage.getItem("mentorship-active-tab") == "Mentee"
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dayFilter, setDayFilter] = useState("all")
  const [feedbackFilter, setFeedbackFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const [feedbackDialog, setFeedbackDialog] = useState({ open: false, meeting: null, type: null })
  const [feedbackForm, setFeedbackForm] = useState({ rating: 5, comments: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Combine upcoming and completed meetings
  const allMeetings = [...(meetings.upcoming || []), ...(meetings.completed || [])]

  const isActiveMeeting = (startTime, endTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)
    return now >= start && now <= end
  }

  const getMeetingStatus = (startTime, endTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)

    if (now >= start && now <= end) return "active"
    if (now < start) return "upcoming"
    return "completed"
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      day: date.toLocaleDateString([], { weekday: "long" }),
    }
  }

  const handleRequestFeedback = async (meetingId) => {
    try {
      setIsSubmitting(true)
      const response = await fetchWithAuth(`/user/reminder/${meetingId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // You might want to refresh the meetings data here
        toast("Feedback request sent successfully!")
      } else {
        toast("Failed to send feedback request")
      }
    } catch (error) {
      toast("Error sending feedback request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitFeedback = async (meetingId) => {
    try {
      setIsSubmitting(true)
      const response = await fetchWithAuth(`/user/feedback-web/${meetingId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: feedbackForm.rating,
          comments: feedbackForm.comments,
        }),
      })

      if (response.ok) {
        setFeedbackDialog({ open: false, meeting: null, type: null })
        setFeedbackForm({ rating: 5, comments: "" })
        fetchMeetings();
        toast("Successfully submitted feedback!")
      }
    } catch (error) {
      toast("Error submitting feedback")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openFeedbackDialog = (meeting, type) => {
    setFeedbackDialog({ open: true, meeting, type })
    if (type === "give") {
      setFeedbackForm({ rating: 5, comments: "" })
    }
  }

  const filteredAndSortedMeetings = useMemo(() => {
    const filtered = allMeetings.filter((meeting) => {
      const personName = isMentor ? meeting.Mentee : meeting.Mentor
      const matchesSearch =
        personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.Description?.toLowerCase().includes(searchTerm.toLowerCase())

      const meetingDay = formatDateTime(meeting.Meeting_Start_Time).day
      const matchesDay = dayFilter === "all" || meetingDay === dayFilter

      const meetingStatus = getMeetingStatus(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)
      const matchesStatus = statusFilter === "all" || meetingStatus === statusFilter

      const hasFeedback = meeting.Feedback && Object.keys(meeting.Feedback).length > 0
      const matchesFeedback =
        feedbackFilter === "all" ||
        (feedbackFilter === "given" && hasFeedback) ||
        (feedbackFilter === "not-given" && !hasFeedback)

      return matchesSearch && matchesDay && matchesStatus && matchesFeedback
    })

    // Sort meetings
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.Meeting_Start_Time) - new Date(a.Meeting_Start_Time) // Most recent first
      } else if (sortBy === "name") {
        const nameA = isMentor ? a.Mentee : a.Mentor
        const nameB = isMentor ? b.Mentee : b.Mentor
        return nameA?.localeCompare(nameB) || 0
      }
      return 0
    })

    return filtered
  }, [searchTerm, statusFilter, dayFilter, feedbackFilter, sortBy, isMentor, meetings])

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const FilterContent = () => (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-32 border-purple-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
        <SelectTrigger className="w-full sm:w-36 border-purple-200">
          <SelectValue placeholder="Feedback" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Feedback</SelectItem>
          <SelectItem value="given">Feedback Given</SelectItem>
          <SelectItem value="not-given">No Feedback</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dayFilter} onValueChange={setDayFilter}>
        <SelectTrigger className="w-full sm:w-32 border-purple-200">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Days</SelectItem>
          {daysOfWeek.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-full sm:w-32 border-purple-200">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">By Date</SelectItem>
          <SelectItem value="name">By Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

  const renderFeedbackActions = (meeting, status) => {
    const hasFeedback = meeting.Feedback && Object.keys(meeting.Feedback).length > 0

    if (isMentor) {
      // Mentor logic
      if (status === "completed" && !hasFeedback) {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleRequestFeedback(meeting.id)}
            disabled={isSubmitting}
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Send className="h-3 w-3 mr-1" />
            Request Feedback
          </Button>
        )
      } else if (status === "upcoming") {
        return (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming meeting
          </div>
        )
      } else if (hasFeedback) {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => openFeedbackDialog(meeting, "view")}
            className="border-green-200 text-green-600 hover:bg-green-50"
          >
            <Eye className="h-3 w-3 mr-1" />
            See Feedback
          </Button>
        )
      }
    } else {
      // Mentee logic
      if (status === "completed" && !hasFeedback) {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => openFeedbackDialog(meeting, "give")}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Give Feedback
          </Button>
        )
      } else if (status === "upcoming") {
        return (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming meeting
          </div>
        )
      } else if (hasFeedback) {
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => openFeedbackDialog(meeting, "view")}
            className="border-green-200 text-green-600 hover:bg-green-50"
          >
            <Eye className="h-3 w-3 mr-1" />
            See Feedback
          </Button>
        )
      }
    }

    return null
  }

  return (
    <>
      <Card className="border-purple-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl text-purple-700 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Meetings
          </CardTitle>

          {/* Filters */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden sm:block">
              <FilterContent />
            </div>

            {/* Mobile Filters Button */}
            <div className="sm:hidden">
              <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-lg text-purple-700 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMobileFilters(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <FilterContent />
                    <Button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredAndSortedMeetings.length > 0 ? (
            <div className="space-y-3">
              {/* Desktop Table Header */}
              <div className="hidden lg:grid lg:grid-cols-6 gap-4 p-3 bg-purple-50 rounded-lg font-medium text-sm text-purple-700">
                <div>Date & Day</div>
                <div>Time</div>
                <div>{isMentor ? "Student" : "Mentor"}</div>
                <div>Description</div>
                <div>Status</div>
                <div>Feedback</div>
              </div>

              {/* Meeting Rows */}
              {filteredAndSortedMeetings.map((meeting, index) => {
                const dateTime = formatDateTime(meeting.Meeting_Start_Time)
                const endTime = formatDateTime(meeting.Meeting_End_Time)
                const status = getMeetingStatus(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)
                const isActive = status === "active"

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 sm:p-4 ${
                      isActive ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"
                    } hover:shadow-md transition-shadow duration-200`}
                  >
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-gray-900">
                            {isMentor ? meeting.Mentee : meeting.Mentor}
                          </span>
                        </div>
                        <Badge
                          variant={isActive ? "default" : status === "upcoming" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date:</span> {dateTime.date}
                        </div>
                        <div>
                          <span className="font-medium">Day:</span> {dateTime.day}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Time:</span> {dateTime.time} - {endTime.time}
                        </div>
                      </div>

                      {meeting.Description && (
                        <p className="text-sm text-gray-700 line-clamp-2">{meeting.Description}</p>
                      )}

                      <div className="flex flex-col gap-2">
                        {isActive && meeting.Meeting_Link && (
                          <Button
                            size="sm"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => window.open(meeting.Meeting_Link, "_blank")}
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Join Meeting
                          </Button>
                        )}
                        {renderFeedbackActions(meeting, status)}
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-6 gap-4 items-center">
                      <div className="text-sm">
                        <div className="font-medium">{dateTime.date}</div>
                        <div className="text-gray-500">{dateTime.day}</div>
                      </div>

                      <div className="text-sm font-medium">
                        {dateTime.time} - {endTime.time}
                      </div>

                      <div className="text-sm font-medium text-gray-900">
                        {isMentor ? meeting.Mentee : meeting.Mentor}
                      </div>

                      <div className="text-sm text-gray-700 line-clamp-2">
                        {meeting.Description || "No description"}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={isActive ? "default" : status === "upcoming" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {status.toUpperCase()}
                        </Badge>
                        {isActive && meeting.Meeting_Link && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white ml-2"
                            onClick={() => window.open(meeting.Meeting_Link, "_blank")}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center">{renderFeedbackActions(meeting, status)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No meetings found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={feedbackDialog.open} onOpenChange={(open) => setFeedbackDialog({ ...feedbackDialog, open })}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg text-purple-700 flex items-center gap-2">
              {feedbackDialog.type === "give" ? (
                <>
                  <MessageSquare className="h-5 w-5" />
                  Give Feedback
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5" />
                  Meeting Feedback
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {feedbackDialog.type === "give" ? (
              // Give Feedback Form
              <>
                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-sm font-medium">
                    Rating (0-5)
                  </Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                        className={`p-1 rounded transition-colors ${
                          star <= feedbackForm.rating
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{feedbackForm.rating}/5</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-sm font-medium">
                    Comments
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share your thoughts about this meeting..."
                    value={feedbackForm.comments}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, comments: e.target.value })}
                    className="min-h-[100px] border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setFeedbackDialog({ open: false, meeting: null, type: null })}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleSubmitFeedback(feedbackDialog.meeting?.id)}
                    disabled={isSubmitting || !feedbackForm.comments.trim()}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </div>
              </>
            ) : (
              // View Feedback
              <>
                {feedbackDialog.meeting?.Feedback ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (feedbackDialog.meeting.Rating || 0)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">
                          ({feedbackDialog.meeting.Rating || 0}/5)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Comments:</span>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                        {feedbackDialog.meeting.Feedback || "No comments provided"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">No feedback available for this meeting.</div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setFeedbackDialog({ open: false, meeting: null, type: null })}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
