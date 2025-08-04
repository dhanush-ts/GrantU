import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, CheckCircle } from "lucide-react"


export default function MeetingCard({ meeting, isMentor, isUpcoming = true }) {
  const isActiveMeeting = (startTime, endTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)
    return now >= start && now <= end
  }

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isActive = isUpcoming && isActiveMeeting(meeting.Meeting_Start_Time, meeting.Meeting_End_Time)

  return (
    <Card className={`border ${isActive ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {isUpcoming ? (
              <Clock className="h-4 w-4 text-blue-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-gray-500" />
            )}
            <Badge variant={isActive ? "default" : isUpcoming ? "secondary" : "outline"}>
              {isActive ? "ACTIVE" : isUpcoming ? "UPCOMING" : "COMPLETED"}
            </Badge>
          </div>

          {isActive && meeting.Meeting_Link && (
            <a
              href={meeting.Meeting_Link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
            >
              <Video className="h-4 w-4" />
              <span>Join</span>
            </a>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">{isMentor ? meeting.Mentee : meeting.Mentor}</h4>

          <p className="text-sm text-gray-600">
            {formatDateTime(meeting.Meeting_Start_Time)} - {formatDateTime(meeting.Meeting_End_Time)}
          </p>

          {meeting.Description && <p className="text-sm text-gray-700 line-clamp-2">{meeting.Description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
