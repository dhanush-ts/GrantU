"use client"

import { Info, Users, GraduationCap } from "lucide-react"

export const NavigationTabs = ({ activeTab, userData, onTabChange }) => {
  const tabs = [
    { id: "information", label: "Info", icon: Info },
    { id: "Mentor", label: "Mentee", icon: Users },
    { id: "Mentee", label: "Mentor", icon: GraduationCap, show: userData?.is_mentor },
  ].filter((tab) => tab.show !== false)

  return (
    <div className="sticky -top-5 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-6">
          <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
