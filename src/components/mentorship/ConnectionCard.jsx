"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar } from "lucide-react"

export default function ConnectionCard({ connection, type, onScheduleMeeting, onViewProfile }) {
  const person = type === "students" ? connection.Mentee : connection.Mentor

  if (!person) return null

  const handleCardClick = () => {
    onViewProfile(connection)
  }

  return (
    <Card
      className="h-full border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 bg-white cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:from-purple-200 group-hover:to-purple-300 transition-colors duration-300">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors duration-300">
                  {person.First_Name} {person.Last_Name}
                </h3>

                {/* Skills displayed directly below name */}
                <div className="mt-1">
                  {person.Expertise && person.Expertise.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {person.Expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {skill}
                        </Badge>
                      ))}
                      {person.Expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                          +{person.Expertise.length - 2} other{person.Expertise.length - 2 > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                      Not mentioned
                    </Badge>
                  )}
                </div>
              </div>

              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 text-xs sm:text-sm self-start sm:self-center"
              >
                {type === "students" ? "Student" : "Mentor"}
              </Badge>
            </div>

            {/* Quick Action */}
            <div className="flex justify-start mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onScheduleMeeting(connection)
                }}
                className="flex items-center px-3 py-1.5 text-xs sm:text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors duration-200 font-medium"
              >
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Quick Schedule
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
