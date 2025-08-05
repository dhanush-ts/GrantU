"use client"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import RequestPopup from "@/components/mentorship/RequestPopup"
import MyConnections from "@/components/mentorship/MyConnections"
import Footer from "@/components/header/Footer"
import { LoadingSpinner } from "@/components/mentorship/LoadingSpinner" 
import { NavigationTabs } from "@/components/mentorship/NavigationTabs" 
import { InformationTab } from "@/components/mentorship/InformationTab" 
import { MentorTab } from "@/components/mentorship/MentorTab" 
import { MenteeTab } from "@/components/mentorship/MenteeTab" 
import { ConnectionsHeader } from "@/components/mentorship/ConnectionHeader" 

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

  const handleGetStarted = () => {
    handleTabChange(userData?.is_mentor ? "Mentee" : "Mentor")
  }

  const handleViewRequests = (type) => {
    setRequestType(type)
    setShowRequestPopup(true)
  }

  const handleViewConnections = (type) => {
    setConnectionsType(type)
    setShowMyConnections(true)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <NavigationTabs activeTab={activeTab} userData={userData} onTabChange={handleTabChange} />

        <div className="container mx-auto px-4 py-4">
          {showMyConnections ? (
            <div>
              <ConnectionsHeader
                connectionsType={connectionsType}
                activeTab={activeTab}
                onBack={() => setShowMyConnections(false)}
              />
              <MyConnections act={activeTab} setShowMyConnections={setShowMyConnections} userData={userData} type={connectionsType} />
            </div>
          ) : (
            <>
              {activeTab === "information" && <InformationTab userData={userData} onGetStarted={handleGetStarted} />}
              {activeTab === "Mentor" && (
                <MentorTab
                  userData={userData}
                  activeTab={activeTab}
                  showMyConnections={showMyConnections}
                  onViewRequests={() => handleViewRequests("mentee")}
                  onViewConnections={() => handleViewConnections("mentors")}
                />
              )}
              {activeTab === "Mentee" && (
                <MenteeTab
                  userData={userData}
                  activeTab={activeTab}
                  showMyConnections={showMyConnections}
                  onViewRequests={() => handleViewRequests("mentor")}
                  onViewConnections={() => handleViewConnections("students")}
                />
              )}
            </>
          )}
        </div>
        <Footer />
      </div>

      <RequestPopup
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
        type={requestType}
        userData={userData}
      />
    </div>
  )
}
