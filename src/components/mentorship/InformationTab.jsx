import { HeroSection } from "./HeroSection"
import { HowItWorksSection } from "./HowItworksSection" 
import { BenefitsSection } from "./BenifitsSection" 

export const InformationTab = ({ userData, onGetStarted }) => {
  return (
    <div className="space-y-12">
      <HeroSection onGetStarted={onGetStarted} />
      <HowItWorksSection />
      <BenefitsSection />
    </div>
  )
}
