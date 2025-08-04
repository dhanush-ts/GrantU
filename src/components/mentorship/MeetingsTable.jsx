"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Video, Calendar, Clock, User } from "lucide-react"

export default function MeetingsTable({ meetings, title, isUpcoming = true }) {
  const isMentor = JSON.parse(localStorage.getItem("mentorship-active-tab"))?.role === "Mentee"
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dayFilter, setDayFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const isActiveMeeting = (startTime, endTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)
    return now >= start && now <= end
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return {
      date: date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      day: date.toLocaleDateString([], { weekday: "long" }),
    }
  }

  const filteredAndSortedMeetings = useMemo(() => {
    const filtered = meetings.filter((meeting) => {
      const personName = isMentor ? meeting.Mentee : meeting.Mentor
      const matchesSearch =
        personName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.Description?.toLowerCase().includes(searchTerm.toLowerCase())

      const meetingDay = formatDateTime(meeting.Meeting_Start_Time).day
      const matchesDay = dayFilter === "all" || meetingDay === dayFilter

      let matchesStatus = true
      if (isUpcoming) {
        if (statusFilter === "active") {
          matchesStatus = isActiveMeeting(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)
        } else if (statusFilter === "upcoming") {
          matchesStatus = !isActiveMeeting(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)
        }
      }

      return matchesSearch && matchesDay && matchesStatus
    })

    // Sort meetings
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.Meeting_Start_Time) - new Date(b.Meeting_Start_Time)
      } else if (sortBy === "name") {
        const nameA = isMentor ? a.Mentee : a.Mentor
        const nameB = isMentor ? b.Mentee : b.Mentor
        return nameA?.localeCompare(nameB) || 0
      }
      return 0
    })

    return filtered
  }, [meetings, searchTerm, statusFilter, dayFilter, sortBy, isMentor, isUpcoming])

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <Card className="border-purple-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl text-purple-700 flex items-center gap-2">
          {isUpcoming ? <Calendar className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
          {title}
        </CardTitle>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {isUpcoming && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 border-purple-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            )}

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
              <div>Action</div>
            </div>

            {/* Meeting Rows */}
            {filteredAndSortedMeetings.map((meeting, index) => {
              const dateTime = formatDateTime(meeting.Meeting_Start_Time)
              const endTime = formatDateTime(meeting.Meeting_End_Time)
              const isActive = isUpcoming && isActiveMeeting(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-3 sm:p-4 ${isActive ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"} hover:shadow-md transition-shadow duration-200`}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-900">{isMentor ? meeting.Mentee : meeting.Mentor}</span>
                      </div>
                      <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"} className="text-xs">
                        {isActive ? "ACTIVE" : isUpcoming ? "UPCOMING" : "COMPLETED"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span> {dateTime.date}
                      </div>
                      <div>
                        <span className="font-medium">Day:</span> {dateTime.day}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {dateTime.time} - {endTime.time}
                      </div>
                    </div>

                    {meeting.Description && <p className="text-sm text-gray-700 line-clamp-2">{meeting.Description}</p>}

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

                    <div className="text-sm text-gray-700 line-clamp-2">{meeting.Description || "No description"}</div>

                    <div>
                      <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"} className="text-xs">
                        {isActive ? "ACTIVE" : isUpcoming ? "UPCOMING" : "COMPLETED"}
                      </Badge>
                    </div>

                    <div>
                      {isActive && meeting.Meeting_Link ? (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => window.open(meeting.Meeting_Link, "_blank")}
                        >
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </div>
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
  )
}
