import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, Calendar, MessageSquare } from "lucide-react";
import Footer from "@/components/header/Footer";
import MenteeRegistrationForm from "@/components/forms/MenteeRegister";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenteePage({userData}) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
    // Scroll to registration form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto">
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button 
              onClick={closeRegistrationForm}
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <MenteeRegistrationForm onClose={closeRegistrationForm} />
          </div>
        </div>
      )}
      {/* Hero Section with Purple Background */}
      <section className="bg-purple-500 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Journey to Success Starts with a Mentor
          </h1>
          <p className="mb-8 max-w-2xl mx-auto">
            Get personalized guidance from experienced mentors who understand your
            academic goals.
          </p>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4"> */}
          {!userData?.Requirements && 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-purple-500 hover:bg-gray-100" onClick={openRegistrationForm}>
              Join as Mentee
            </Button>
            <Button className="border-white bg-purple-600 text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>}
          {userData?.Requirements && 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-purple-500 hover:bg-gray-100">
              Find Mentor
            </Button>
          </div>}

        </div>
      </section>

      {/* Mentee Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">
            Mentee Benefits
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Access a world of opportunities with our comprehensive mentorship program.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow ">
              <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <UserRound className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-purple-500 text-lg font-semibold mb-2">Expert Mentors</h3>
                <p className="text-sm text-gray-600 text-center">
                  Connect with expert mentors who have successfully secured scholarships
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow ">
              <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-purple-500 text-lg font-semibold mb-2">Flexible Sessions</h3>
                <p className="text-sm text-gray-600 text-center">
                  Schedule mentoring sessions that fit your timeline
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow ">
              <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                </div>
                <h3 className="text-purple-500 text-lg font-semibold mb-2">Direct Communication</h3>
                <p className="text-sm text-gray-600 text-center">
                  Get instant feedback and advice through our messaging platform
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-500 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of successful scholars and get the guidance you need
          </p>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4"> */}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!userData?.Requirements &&<Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={openRegistrationForm}>
              Get Started
            </Button>}
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-50">
              <Link to ="/mentors">Browse Mentors</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}