"use client"

import { Button } from "@/components/ui/button"

export const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="bg-blue-600 text-white py-16 rounded-lg">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect. Learn. Grow.</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Join our mentorship ecosystem where knowledge flows freely. Mentors guide up to 3 mentees, while learners
          connect with up to 5 mentors.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3" onClick={onGetStarted}>
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
