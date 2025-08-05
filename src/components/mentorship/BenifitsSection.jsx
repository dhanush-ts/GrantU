import { Card, CardContent } from "@/components/ui/card"
import { UserRound, Calendar, MessageSquare } from "lucide-react"

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: UserRound,
      title: "Expert Network",
      description:
        "Connect with industry professionals and experienced mentors who have successfully navigated their career paths.",
      color: "blue",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description:
        "Schedule mentoring sessions that fit your timeline and learning pace, with built-in calendar integration.",
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Get instant feedback and advice through our integrated messaging platform and notification system.",
      color: "purple",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Platform Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="pt-8 px-6 pb-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-${benefit.color}-100 flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`h-8 w-8 text-${benefit.color}-600`} />
                  </div>
                  <h3 className={`text-${benefit.color}-600 text-xl font-semibold mb-3`}>{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
