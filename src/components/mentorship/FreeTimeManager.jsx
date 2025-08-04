"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Clock } from "lucide-react"


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function FreeTimeManager({ freeTime, onCreateSlot, onDeleteSlot }) {
  const [newSlot, setNewSlot] = useState({ Day: "", Start_Time: "", End_Time: "" })

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCreateSlot = () => {
    onCreateSlot(newSlot)
    setNewSlot({ Day: "", Start_Time: "", End_Time: "" })
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Time Slot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select value={newSlot.Day} onValueChange={(value) => setNewSlot({ ...newSlot, Day: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="time"
              value={newSlot.Start_Time}
              onChange={(e) => setNewSlot({ ...newSlot, Start_Time: e.target.value })}
              placeholder="Start Time"
            />

            <Input
              type="time"
              value={newSlot.End_Time}
              onChange={(e) => setNewSlot({ ...newSlot, End_Time: e.target.value })}
              placeholder="End Time"
            />
          </div>

          <Button
            onClick={handleCreateSlot}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!newSlot.Day || !newSlot.Start_Time || !newSlot.End_Time}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Time Slot
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map((day) => (
          <Card key={day} className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {freeTime[day] && freeTime[day].length > 0 ? (
                <div className="space-y-2">
                  {freeTime[day].map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium">
                        {formatTime(slot.Start_Time)} - {formatTime(slot.End_Time)}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteSlot(slot.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No slots available</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
