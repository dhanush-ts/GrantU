import { TabHeader } from "./TabHeader"
import { TabActions } from "./TabActions"
import EnhancedStudentsList from "./EnhancedStudentsList"

export const MentorTab = ({
  userData,
  activeTab,
  showMyConnections,
  onViewRequests,
  onViewConnections,
}) => {
  return (
    <div className="space-y-6">
      <TabHeader
        title="Learning Dashboard"
        subtitle="Connect with up to 5 mentors and accelerate your growth"
        bgColor="bg-blue-600"
      />
      <TabActions type="mentee" onViewRequests={onViewRequests} onViewConnections={onViewConnections} />
      {!showMyConnections && <EnhancedStudentsList act={activeTab} userData={userData} />}
    </div>
  )
}
