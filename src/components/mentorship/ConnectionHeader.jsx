"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const ConnectionsHeader = ({ connectionsType, activeTab, onBack }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">My {connectionsType === "students" ? "Students" : "Mentors"}</h2>
      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {activeTab === "Mentor" ? "Learning" : "Teaching"} Dashboard
      </Button>
    </div>
  )
}
