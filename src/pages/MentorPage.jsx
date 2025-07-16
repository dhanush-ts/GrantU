"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, BookOpen, Network, User, Briefcase } from "lucide-react"
import Footer from "@/components/header/Footer"
import { Badge } from "@/components/ui/badge"
import MentorRegistrationForm from "@/components/forms/MentorRegister"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { api, fetchWithAuth } from "@/api"
import { useAuth } from "@/context/AuthContext"

export default function MentorPage({ userData }) {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const {isAuthenticated, loginModalOpen, setLoginModalOpen} = useAuth();

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
    if(isAuthenticated){
      setShowRegistrationForm(true);
    }else{
      setLoginModalOpen(true);
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
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-100"
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

      {/* Hero Section */}
      <section className="bg-purple-500 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Become a Mentor</h1>
          <p className="mb-8 max-w-2xl mx-auto">
            Share your knowledge and experience to help students navigate the scholarship process.
          </p>
          {!userData?.Expertise && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-purple-500 hover:bg-gray-100" onClick={openRegistrationForm}>
                Join as Mentor
              </Button>
              <Button className="border-white bg-purple-600 text-white hover:bg-white hover:text-black">
                Learn More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Meet Our Mentors Section */}
      <div className="container mt-10 mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">Meet Our Mentors</h2> */}
      
          <p className="font-semibold text-center text-3xl text-gradient bg-gradient-to-r from-purple-200 via-purple-500 to-purple-900 bg-clip-text text-transparent">
            Meet Our {mentors?.length} Incredible Mentor{mentors?.length === 1 ? '' : 's'}!
          </p>
          <p className="text-center text-gray-600 mt-5 mb-12 max-w-2xl mx-auto">
          Our mentors come from diverse backgrounds and have helped students secure millions in scholarship funding.
          </p>

        {/* Mentors Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-xl">Loading mentors...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-xl">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {mentors.map((mentor, index) => (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-purple-100 text-purple-500">
                        {mentor.First_Name?.charAt(0)}
                        {mentor.Last_Name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg uppercase text-gray-800">
                        {mentor.First_Name} {mentor.Last_Name}
                      </h3>
                      <p className="text-sm text-gray-600">{mentor.organization_detail || "Mentor"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Experience */}
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{mentor.Years_of_Experience} years of experience</span>
                    </div>

                    {/* Gender & Location */}
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
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
                            className="rounded-full px-3 py-1 bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
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
                    className="w-full rounded-full border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-medium transition-colors"
                  >
                    Contact Mentor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Why Become a Mentor Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">Why Become a Mentor?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Mentoring is a rewarding way to give back and help shape the future of education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reason 1 */}
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-700 font-semibold">Make an Impact</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Help students from diverse backgrounds access educational opportunities they might otherwise miss.
                </p>
              </CardContent>
            </Card>

            {/* Reason 2 */}
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-700 font-semibold">Share Knowledge</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Pass on your expertise and insights about navigating the scholarship application process.
                </p>
              </CardContent>
            </Card>

            {/* Reason 3 */}
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 px-6 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Network className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-700 font-semibold">Build Your Network</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Connect with other mentors and students who are passionate about education.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!userData?.Expertise && (
        <section className="py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-500 mb-4">Ready to make a Difference?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of mentors and help students achieve their educational dreams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={openRegistrationForm}>
                Sign Up as Mentor
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
