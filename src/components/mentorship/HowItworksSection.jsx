import { GraduationCap, Users, MessageSquare, User } from "lucide-react"
import teacher from "@/assets/teacher.json"
import { Player } from "@lottiefiles/react-lottie-player"

export const HowItWorksSection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Mentors Guide",
      description:
        "Experienced professionals can mentor up to 3 students, sharing their expertise and helping shape the next generation of talent.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Mentees Learn",
      description:
        "Students can connect with up to 5 mentors, gaining diverse perspectives and accelerating their learning journey across different skills.",
      color: "green",
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description:
        "Built-in messaging and request system makes it easy to connect, schedule sessions, and maintain ongoing mentorship relationships.",
      color: "purple",
    },
  ]

  return (
    <section className="">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How Our Platform Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A simple yet powerful system designed to foster meaningful mentorship relationships
        </p>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-${feature.color}-600`}>{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="relative">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
              <Player
                  autoplay
                  loop
                  src={teacher}
                  style={{ height: '100%', width: '100%'  }}
                  />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
