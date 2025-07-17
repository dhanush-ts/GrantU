"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  UserRound,
  Calendar,
  MessageSquare,
  GraduationCap,
  Users,
  Star,
  Sparkles,
  BookOpen,
  Target,
} from "lucide-react"
import Footer from "@/components/header/Footer"
import MenteeRegistrationForm from "@/components/forms/MenteeRegister"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function MenteePage({ userData }) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const navi = useNavigate();
  const { isAuthenticated, loginModalOpen, setLoginModalOpen } = useAuth()

  const openRegistrationForm = () => {
    if (isAuthenticated) {
      setShowRegistrationForm(true)
    } else {
      setLoginModalOpen(!loginModalOpen)
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false)
  }

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
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
            <MenteeRegistrationForm onClose={closeRegistrationForm} />
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
                Your Journey to Success Starts Here
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
                Connect with experienced mentors who understand your academic goals and get personalized guidance to
                unlock your potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {!userData?.Requirements ? (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
                    onClick={openRegistrationForm}
                  >
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
                    Join as Mentee
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => navi("/mentors")}
                >
                  <Target className="mr-2 h-5 w-5" />
                  Find Mentor
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-purple-600 mb-6">How Our Platform Works</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                A simple yet powerful system designed to foster meaningful mentorship relationships
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    <GraduationCap
                      className="h-8 w-8 text-purple-600 animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-purple-600">Expert Mentors</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Connect with experienced professionals who have successfully navigated their career paths and can
                      guide you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                    <Users className="h-8 w-8 text-blue-600 animate-bounce" style={{ animationDelay: "1.5s" }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-blue-600">Personalized Learning</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Get tailored guidance that fits your unique goals and learning style from multiple mentors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 animate-pulse"
                    style={{ animationDelay: "2s" }}
                  >
                    <MessageSquare
                      className="h-8 w-8 text-green-600 animate-bounce"
                      style={{ animationDelay: "2.5s" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-green-600">Seamless Communication</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Built-in messaging and scheduling system makes it easy to connect and maintain relationships.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-purple-100 rounded-3xl p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 animate-pulse" />
                  <div className="relative z-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl animate-bounce">
                      <UserRound className="h-16 w-16 text-white" />
                    </div>
                    <h4 className="text-2xl font-semibold mb-4">You</h4>

                    {/* Animated connection nodes */}
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center animate-bounce">
                      <Users className="h-10 w-10 text-blue-600 animate-spin" style={{ animationDuration: "4s" }} />
                    </div>
                    <div
                      className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <GraduationCap
                        className="h-10 w-10 text-green-600 animate-spin"
                        style={{ animationDuration: "5s", animationDirection: "reverse" }}
                      />
                    </div>
                    <div
                      className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center animate-bounce"
                      style={{ animationDelay: "1s" }}
                    >
                      <MessageSquare className="h-10 w-10 text-yellow-600 animate-pulse" />
                    </div>
                    <div
                      className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center animate-bounce"
                      style={{ animationDelay: "1.5s" }}
                    >
                      <Calendar className="h-10 w-10 text-red-600 animate-spin" style={{ animationDuration: "6s" }} />
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
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-600">Mentee Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105 border-t-4 border-t-purple-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -translate-y-10 translate-x-10 animate-pulse" />
                <CardContent className="pt-10 px-8 pb-8 text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                    <UserRound className="h-10 w-10 text-purple-500 animate-pulse" />
                  </div>
                  <h3 className="text-purple-500 text-2xl font-semibold mb-4">Expert Network</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Connect with industry professionals who have successfully secured scholarships and navigated their
                    careers.
                  </p>
                </CardContent>
              </Card>

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
                    <Calendar className="h-10 w-10 text-blue-500 animate-spin" style={{ animationDuration: "4s" }} />
                  </div>
                  <h3 className="text-blue-500 text-2xl font-semibold mb-4">Flexible Scheduling</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Schedule mentoring sessions that fit your timeline and learning pace with integrated calendar
                    support.
                  </p>
                </CardContent>
              </Card>

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
                    <MessageSquare className="h-10 w-10 text-green-500 animate-pulse" />
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

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20" />
          <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce" />
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />

          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg opacity-90">
              Join our community of successful scholars and get the guidance you need to achieve your dreams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {!userData?.Requirements && (
                <Button
                  className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse"
                  onClick={openRegistrationForm}
                >
                  <Star className="mr-2 h-5 w-5 animate-spin" style={{ animationDuration: "3s" }} />
                  Get Started
                </Button>
              )}
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/mentors" className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Browse Mentors
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
