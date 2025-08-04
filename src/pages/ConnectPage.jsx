"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, Calendar, MessageSquare, Bell, Users, GraduationCap, Info, User, ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import RequestPopup from "@/components/mentorship/RequestPopup"
import EnhancedStudentsList from "@/components/mentorship/EnhancedStudentsList"
import MyConnections from "@/components/mentorship/MyConnections"
import Footer from "@/components/header/Footer"

export default function MentorshipPlatform() {
  const { userData, loading } = useAuth()
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mentorship-active-tab") || "information"
    }
    return "information"
  })
  const [showRequestPopup, setShowRequestPopup] = useState(false)
  const [requestType, setRequestType] = useState("")
  const [showMyConnections, setShowMyConnections] = useState(false)
  const [connectionsType, setConnectionsType] = useState("")

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setShowMyConnections(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("mentorship-active-tab", tabId)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your mentorship journey...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "information", label: "Info", icon: Info, key: "Info" },
    { id: "Mentor", label: "Mentee", icon: Users, key: "Mentor" },
    { id: "Mentee", label: "Mentor", icon: GraduationCap, show: userData?.is_mentor, key: "Mentee" },
  ].filter((tab) => tab.show !== false)

  const renderInformationTab = () => (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-24 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Connect. Learn. Grow.
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Join our mentorship ecosystem where knowledge flows freely. Mentors guide up to 3 mentees, while learners
            connect with up to 5 mentors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => handleTabChange(userData?.is_mentor ? "Mentee" : "Mentor")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the information tab content remains the same but with enhanced styling */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6 text-purple-600">How Our Platform Works</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
            A simple yet powerful system designed to foster meaningful mentorship relationships
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-purple-600">Mentors Guide</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Experienced professionals can mentor up to 3 students, sharing their expertise and helping shape the
                    next generation of talent.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-blue-600">Mentees Learn</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Students can connect with up to 5 mentors, gaining diverse perspectives and accelerating their
                    learning journey across different skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-green-600">Seamless Communication</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Built-in messaging and request system makes it easy to connect, schedule sessions, and maintain
                    ongoing mentorship relationships.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 animate-pulse" />
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-4">You</h4>

                  {/* Enhanced connection visualization */}
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center animate-bounce">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <GraduationCap className="h-10 w-10 text-green-600" />
                  </div>
                  <div
                    className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    <MessageSquare className="h-10 w-10 text-yellow-600" />
                  </div>
                  <div
                    className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <Calendar className="h-10 w-10 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-purple-600">Platform Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-purple-500 group">
              <CardContent className="pt-10 px-8 pb-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserRound className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-purple-500 text-2xl font-semibold mb-4">Expert Network</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Connect with industry professionals and experienced mentors who have successfully navigated their
                  career paths.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-blue-500 group">
              <CardContent className="pt-10 px-8 pb-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-blue-500 text-2xl font-semibold mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Schedule mentoring sessions that fit your timeline and learning pace, with built-in calendar
                  integration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-green-500 group">
              <CardContent className="pt-10 px-8 pb-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-green-500 text-2xl font-semibold mb-4">Real-time Communication</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Get instant feedback and advice through our integrated messaging platform and notification system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )

  const renderMentorTab = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 px-6 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Learning Dashboard</h2>
          <p className="text-xl opacity-90">Connect with up to 5 mentors and accelerate your growth</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            setRequestType("mentee")
            setShowRequestPopup(true)
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Bell className="h-4 w-4 mr-2" />
          View Learning Requests
        </Button>

        <Button
          onClick={() => {
            setConnectionsType("mentors")
            setShowMyConnections(true)
          }}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          My Mentors
        </Button>
      </div>

      {!showMyConnections && <EnhancedStudentsList act={activeTab} userData={userData} />}
    </div>
  )

  const renderMenteeTab = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20" />
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Teaching Dashboard</h2>
          <p className="text-xl opacity-90">Guide up to 3 students and share your expertise</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={() => {
            setRequestType("mentor")
            setShowRequestPopup(true)
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Bell className="h-4 w-4 mr-2" />
          View Teaching Requests
        </Button>

        <Button
          onClick={() => {
            setConnectionsType("students")
            setShowMyConnections(true)
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Users className="h-4 w-4 mr-2" />
          My Students
        </Button>
      </div>

      {!showMyConnections && <EnhancedStudentsList act={activeTab} userData={userData} />}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Tabs */}
        <div className="sticky -top-5 z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-6">
              {/* Enhanced Tab Navigation */}
              <div className="flex bg-gradient-to-r from-gray-100 to-purple-100 rounded-2xl p-2 shadow-inner">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform scale-105"
                          : "text-gray-600 hover:text-purple-600 hover:bg-white/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4">
          {showMyConnections ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-purple-600">
                  My {connectionsType === "students" ? "Students" : "Mentors"}
                </h2>
            <Button
              variant="ghost"
              className="mb-2 sm:mb-4 text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 sm:p-3"
              onClick={() => setShowMyConnections(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Back to {activeTab === "Mentor" ? "Learning" : "Teaching"} Dashboard</span>
            </Button>
              </div>
              <MyConnections act={activeTab} userData={userData} type={connectionsType} />
            </div>
          ) : (
            <>
              {activeTab === "information" && renderInformationTab()}
              {activeTab === "Mentee" && renderMenteeTab()}
              {activeTab === "Mentor" && renderMentorTab()}
            </>
          )}
        </div>

        <Footer />
      </div>

      {/* Request Popup */}
      <RequestPopup
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
        type={requestType}
        userData={userData}
      />
    </div>
  )
}