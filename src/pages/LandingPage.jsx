
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from "@/components/ui/card";
// import { UserRound, BookOpen, GraduationCap, Lightbulb } from "lucide-react";
// import Image from "../assets/landing_img-1.png"
// import Footer from '@/components/header/Footer';
// import { Link } from 'react-router-dom';
// import LoginPage from "../pages/LoginModal";
// import { useState } from 'react';

// export default function LandingPage({data}) {
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const openLoginModal = (e) => {
//     e.preventDefault(); // Prevent navigation
//     setLoginModalOpen(true);
//  };
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">

//       <main className="flex-grow">
//         <div className="container max-w-7xl mx-auto px-4 py-8">
//           {/* Search Bar */}
//           <div className="relative w-full mb-12 max-w-3xl mx-auto">
//             <Input 
//               type="text" 
//               placeholder="Search for the scholarships" 
//               className="w-full py-6 px-6 rounded-full border-gray-200 bg-white shadow-sm"
//             />
//             <Button 
//               variant="ghost" 
//               className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             >
//               <svg 
//                 width="24" 
//                 height="24" 
//                 viewBox="0 0 24 24" 
//                 fill="none" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path 
//                   d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
//                   stroke="#6b7280" 
//                   strokeWidth="2" 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </Button>
//           </div>

//           {/* Hero Section */}
//           <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
//             {/* Left Content */}
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//                 Turn Your <span className="text-purple-500">Dreams</span><br />
//                 Into Reality with the<br />
//                 Right <span className="text-purple-500 relative">
//                   Scholarship
//                   <svg 
//                     className="absolute -bottom-2 left-0 w-full" 
//                     height="6" 
//                     viewBox="0 0 200 6" 
//                     fill="none" 
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path 
//                       d="M1 5C50 -1 150 -1 199 5" 
//                       stroke="#9061F9" 
//                       strokeWidth="2" 
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </span>
//               </h1>
              
//               <p className="text-gray-600 my-6">
//                 "Dedicate yourself to learning and earn scholarships that<br />
//                 open doors to new opportunities."
//               </p>
              
//               <Button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg">
//                 <Link to='/scholarships'>Find for me</Link>
//               </Button>
//             </div>

//             {/* Right Image Section */}
//             <div className="relative flex items-center justify-center">
//             {/* Yellow Background with Rotation */}
//             <div className="absolute -z-12 w-[90%] h-[90%] bg-yellow-300 rounded-[30px] rotate-[-5deg]"></div>
//             {/* Image with Rotation */}
//             <div className="relative bg-[#ffff80] rounded-[30px] overflow-hidden shadow-lg rotate-[-3deg]">
//                 <img 
//                   src={Image} 
//                   alt="Student with books" 
//                   className="w-full max-h-[80vh] object-cover rounded-[30px]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* How GrantU Works Section */}
//           <div className="text-center mb-20">
//             <h2 className="text-3xl font-bold text-purple-500 mb-4">How GrantU Works</h2>
            
//             <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
//               We simplify the scholarship application process so you can focus on 
//               what matters most - your education.
//             </p>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {/* Create a profile */}
//               <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
//                 <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
//                     <UserRound className="h-5 w-5 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 text-lg font-semibold mb-2"><Link to='/signup'>Create a profile</Link></h3>
//                   <p className="text-sm text-gray-600">
//                     Sign up and build your academic profile to match with scholarships
//                   </p>
//                 </CardContent>
//               </Card>
              
//               {/* Discover */}
//               <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
//                 <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
//                     <BookOpen className="h-5 w-5 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 text-lg font-semibold mb-2">Discover</h3>
//                   <p className="text-sm text-gray-600">
//                     Browse and filter scholarships that match your qualifications
//                   </p>
//                 </CardContent>
//               </Card>
              
//               {/* Connect */}
//               <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
//                 <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
//                     <GraduationCap className="h-5 w-5 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 text-lg font-semibold mb-2">Connect</h3>
//                   <p className="text-sm text-gray-600">
//                     Get guidance from mentors who've been through the process
//                   </p>
//                 </CardContent>
//               </Card>
              
//               {/* Apply */}
//               <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
//                 <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
//                     <Lightbulb className="h-5 w-5 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 text-lg font-semibold mb-2">Apply</h3>
//                   <p className="text-sm text-gray-600">
//                     Submit applications directly through our streamlined platform
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
          
//           {/* CTA Section */}
//           {!data && <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-purple-500 mb-4">Ready to Start Your Scholarship Journey?</h2>
            
//             <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
//               Join thousands of students who have found their perfect 
//               scholarship match with GrantU.
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white px-6">
//                 <Link to='/signup'>Create an Account</Link>
//               </Button>
//               <Button onClick={openLoginModal} variant="outline" size="lg" className="border-purple-500 text-purple-500 hover:bg-purple-50 px-6">
//                 Login
//               </Button>
//             </div>
//           </div>}
//         </div>
//       </main>
//       <Footer/>
//       <LoginPage 
//              open={loginModalOpen} 
//               onOpenChange={setLoginModalOpen} 
//       />
//     </div>
//   );
// }

"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserRound, BookOpen, GraduationCap, Lightbulb } from "lucide-react"
import Image from "../assets/landing_img-1.png"
import Footer from "@/components/header/Footer"
import { Link } from "react-router-dom"
import LoginPage from "../pages/LoginModal"
import { useState } from "react"
import StatsSection from "../components/home/StatSection"

export default function LandingPage({ data }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const openLoginModal = (e) => {
    e.preventDefault() // Prevent navigation
    setLoginModalOpen(true)
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="relative w-full mb-12 max-w-3xl mx-auto">
            <Input
              type="text"
              placeholder="Search for the scholarships"
              className="w-full py-6 px-6 rounded-full border-gray-200 bg-white shadow-sm"
            />
            <Button variant="ghost" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-24">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Turn Your <span className="text-purple-500">Dreams</span>
                <br />
                Into Reality with the
                <br />
                Right{" "}
                <span className="text-purple-500 relative">
                  Scholarship
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 5C50 -1 150 -1 199 5" stroke="#9061F9" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-gray-600 my-6">
                "Dedicate yourself to learning and earn scholarships that
                <br />
                open doors to new opportunities."
              </p>

              <Button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg">
                <Link to="/scholarships">Find for me</Link>
              </Button>
            </div>

            {/* Right Image Section */}
            <div className="relative flex items-center justify-center">
              {/* Yellow Background with Rotation */}
              <div className="absolute -z-12 w-[90%] h-[90%] bg-yellow-300 rounded-[30px] rotate-[-5deg]"></div>
              {/* Image with Rotation */}
              <div className="relative bg-[#ffff80] rounded-[30px] overflow-hidden shadow-lg rotate-[-3deg]">
                <img
                  src={Image || "/placeholder.svg"}
                  alt="Student with books"
                  className="w-full max-h-[80vh] object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>

          {/* How GrantU Works Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-purple-500 mb-4">How GrantU Works</h2>

            <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
              We simplify the scholarship application process so you can focus on what matters most - your education.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Create a profile */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <UserRound className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 text-lg font-semibold mb-2">
                    Create a profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sign up and build your academic profile to match with scholarships
                  </p>
                </CardContent>
              </Card>

              {/* Discover */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 text-lg font-semibold mb-2">Discover</h3>
                  <p className="text-sm text-gray-600">Browse and filter scholarships that match your qualifications</p>
                </CardContent>
              </Card>

              {/* Connect */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 text-lg font-semibold mb-2">Connect</h3>
                  <p className="text-sm text-gray-600">Get guidance from mentors who've been through the process</p>
                </CardContent>
              </Card>

              {/* Apply */}
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 px-4 pb-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 text-lg font-semibold mb-2">Apply</h3>
                  <p className="text-sm text-gray-600">Submit applications directly through our streamlined platform</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics Section */}
          <StatsSection />

          {/* CTA Section */}
          {!data && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-purple-500 mb-4">Ready to Start Your Scholarship Journey?</h2>

              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have found their perfect scholarship match with GrantU.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white px-6">
                  <Link to="/signup">Create an Account</Link>
                </Button>
                <Button
                  onClick={openLoginModal}
                  variant="outline"
                  size="lg"
                  className="border-purple-500 text-purple-500 hover:bg-purple-50 px-6"
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <LoginPage open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  )
}
