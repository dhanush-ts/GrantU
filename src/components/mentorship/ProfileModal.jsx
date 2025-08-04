"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, Mail, Phone, MapPin, Award, Clock } from "lucide-react"

export default function ProfileModal({ isOpen, onClose, connection, type, onScheduleMeeting, mentorFreeTime = {} }) {
  const person = type === "students" ? connection?.Mentee : connection?.Mentor
  const isMentor = type === "students"

  if (!person) return null

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">

        <div className="space-y-6">
          {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {person.First_Name} {person.Last_Name}
                  </h2>

                  {person?.Expertise && person.Expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                      {skill}
                    </Badge>
                  ))}

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    {person.Email && (
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{person.Email}</span>
                      </div>
                    )}
                    {person.Phone && (
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{person.Phone}</span>
                      </div>
                    )}
                    {person.Location && (
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{person.Location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

        {!isMentor && Object.keys(mentorFreeTime).length > 0 && (
            <Card className="border-purple-200">
                <CardContent className="p-4 sm:p-6">
                <div className="mb-3">
                    <h1 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Available Time Slots
                    </h1>
                </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 mb-2">{day}</h4>
                        {mentorFreeTime[day] && mentorFreeTime[day].length > 0 ? (
                            <div className="space-y-1">
                              {mentorFreeTime[day].map((slot) => (
                                <div key={slot.id} className="bg-green-50 p-2 rounded text-sm text-center text-green-700">
                                  {formatTime(slot.Start_Time)} - {formatTime(slot.End_Time)}
                                </div>
                        ))}
                        </div>
                      ) : (
                        <div className="bg-blue-50 p-2 rounded text-sm text-center text-blue-700">All day free</div>
                      )}
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
            )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => {
                onScheduleMeeting(connection)
                onClose()
              }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
