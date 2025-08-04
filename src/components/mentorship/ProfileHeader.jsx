import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Users, UserPlus } from "lucide-react"


export default function ProfileHeader({ userData, type, connectionsCount, maxConnections} ) {
  return (
    <Card className="border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {userData?.First_Name} {userData?.Last_Name}
            </h1>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {type === "students" ? "🎓 Mentor" : "📚 Mentee"}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{connectionsCount} Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>{maxConnections - connectionsCount} Available</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
