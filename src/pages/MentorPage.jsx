"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Heart,
  BookOpen,
  Network,
  User,
  Briefcase,
  Star,
  Sparkles,
  GraduationCap,
  MessageSquare,
  Target,
} from "lucide-react"
import Footer from "@/components/header/Footer"
import { Badge } from "@/components/ui/badge"
import MentorRegistrationForm from "@/components/forms/MentorRegister"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { fetchWithAuth } from "@/api"
import { useAuth } from "@/context/AuthContext"

export default function MentorPage({ userData }) {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const { isAuthenticated, loginModalOpen, setLoginModalOpen } = useAuth()

  // Fetch mentors data
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)
        const response = await fetchWithAuth(`/user/mentors/`)
        if (!response.ok) {
          throw new Error(`Failed to fetch mentors: ${response.status}`)
        }
        const data = await response.json()
        setMentors(data)
      } catch (err) {
        console.error("Error fetching mentors:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMentors()
  }, [])

  const openRegistrationForm = () => {
    if (isAuthenticated) {
      setShowRegistrationForm(true)
    } else {
      setLoginModalOpen(true)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false)
  }

  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      {/* Registration Form Modal/Overlay */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button
              onClick={closeRegistrationForm}
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-100 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <MentorRegistrationForm onClose={closeRegistrationForm} />
          </div>
        </div>
      )}

      <div className="space-y-16">
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-24 rounded-3xl relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
          <div
            className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          />

          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 animate-spin" style={{ animationDuration: "8s" }}>
            <GraduationCap className="h-8 w-8 text-white/30" />
          </div>
          <div
            className="absolute top-1/3 right-1/3 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          >
            <BookOpen className="h-6 w-6 text-white/20" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-bounce" style={{ animationDelay: "2s" }}>
            <Star className="h-7 w-7 text-white/25" />
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Become a Mentor
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
                Share your knowledge and experience to help students navigate their journey and unlock their potential.
              </p>
            </div>

            {!userData?.Expertise && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
                  onClick={openRegistrationForm}
                >
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
                  Join as Mentor
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Meet Our Mentors Section */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-800 bg-clip-text text-transparent">
              Meet Our {mentors?.length} Incredible Mentor{mentors?.length === 1 ? "" : "s"}!
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our mentors come from diverse backgrounds and have helped students secure millions in scholarship funding.
            </p>
          </div>

          {/* Mentors Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500 text-xl">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {mentors.map((mentor, index) => (
                <Card
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border-0 hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-105 relative"
                >
                  {/* Animated background accent */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-10 translate-x-10 animate-pulse"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />

                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 text-lg font-bold">
                          {mentor.First_Name?.charAt(0)}
                          {mentor.Last_Name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {mentor.First_Name} {mentor.Last_Name}
                        </h3>
                        <p className="text-sm text-gray-600">{mentor.organization_detail || "Mentor"}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Experience */}
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 text-purple-500 mr-2 animate-pulse" />
                        <span className="text-sm text-gray-700">{mentor.Years_of_Experience} years of experience</span>
                      </div>

                      {/* Gender & Location */}
                      <div className="flex items-center">
                        <User
                          className="w-4 h-4 text-purple-500 mr-2 animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <span className="text-sm text-gray-700">
                          {mentor.Gender || "Not specified"} {mentor.address ? `• ${mentor.address}` : ""}
                        </span>
                      </div>

                      {/* Expertise */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.Expertise?.slice(0, 5).map((skill, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="rounded-full px-3 py-1 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 animate-pulse"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-medium transition-all duration-300 group-hover:scale-105 bg-transparent"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Mentor
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Why Become a Mentor Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-purple-600 mb-6">Why Become a Mentor?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Mentoring is a rewarding way to give back and help shape the future of education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Reason 1 */}
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-red-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full -translate-y-10 translate-x-10 animate-pulse" />
                <CardContent className="pt-10 px-8 pb-8 text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                    <Heart className="h-10 w-10 text-red-500 animate-pulse" />
                  </div>
                  <h3 className="text-red-600 text-2xl font-semibold mb-4">Make an Impact</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Help students from diverse backgrounds access educational opportunities they might otherwise miss.
                  </p>
                </CardContent>
              </Card>

              {/* Reason 2 */}
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-blue-500 group relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <CardContent className="pt-10 px-8 pb-8 text-center relative z-10">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <BookOpen className="h-10 w-10 text-blue-500 animate-spin" style={{ animationDuration: "4s" }} />
                  </div>
                  <h3 className="text-blue-600 text-2xl font-semibold mb-4">Share Knowledge</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Pass on your expertise and insights about navigating the scholarship application process.
                  </p>
                </CardContent>
              </Card>

              {/* Reason 3 */}
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-green-500 group relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-y-10 translate-x-10 animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
                <CardContent className="pt-10 px-8 pb-8 text-center relative z-10">
                  <div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    <Network className="h-10 w-10 text-green-500 animate-pulse" />
                  </div>
                  <h3 className="text-green-600 text-2xl font-semibold mb-4">Build Your Network</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Connect with other mentors and students who are passionate about education.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!userData?.Expertise && (
          <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
            <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce" />
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />

            <div className="container mx-auto text-center relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
                Join our community of mentors and help students achieve their educational dreams.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
                  onClick={openRegistrationForm}
                >
                  <Target className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
                  Sign Up as Mentor
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
