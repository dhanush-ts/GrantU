import { TabHeader } from "./TabHeader"
import { TabActions } from "./TabActions"
import EnhancedStudentsList from "./EnhancedStudentsList"

export const MenteeTab = ({
  userData,
  activeTab,
  showMyConnections,
  onViewRequests,
  onViewConnections,
}) => {
  return (
    <div className="space-y-6">
      <TabHeader
        title="Teaching Dashboard"
        subtitle="Guide up to 3 students and share your expertise"
        bgColor="bg-green-600"
      />
      <TabActions type="mentor" onViewRequests={onViewRequests} onViewConnections={onViewConnections} />
      {!showMyConnections && <EnhancedStudentsList act={activeTab} userData={userData} />}
    </div>
  )
}
