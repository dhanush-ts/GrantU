"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function EmptyConnectionCard({ type, onAddConnection }) {
  return (
    <Card
      className="h-full border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
      onClick={onAddConnection}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Add {type === "students" ? "Student" : "Mentor"}</h3>
        <p className="text-sm text-gray-500 text-center">
          Connect with a new {type === "students" ? "student" : "mentor"} to expand your network
        </p>
      </CardContent>
    </Card>
  )
}
