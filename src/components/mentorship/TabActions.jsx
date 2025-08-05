"use client"

import { Button } from "@/components/ui/button"
import { Bell, GraduationCap, Users } from "lucide-react"

export const TabActions = ({ type, onViewRequests, onViewConnections }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button onClick={onViewRequests} className="bg-blue-600 hover:bg-blue-700 text-white">
        <Bell className="h-4 w-4 mr-2" />
        View Requests
      </Button>
      <Button onClick={onViewConnections} className="bg-green-600 hover:bg-green-700 text-white">
        {type === "mentor" ? <Users className="h-4 w-4 mr-2" /> : <GraduationCap className="h-4 w-4 mr-2" />}
        My {type === "mentor" ? "Students" : "Mentors"}
      </Button>
    </div>
  )
}
