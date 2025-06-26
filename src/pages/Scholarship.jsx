// import React, { useRef } from 'react';
// import Footer from '@/components/header/Footer';
// import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function ScholarshipPage() {
//   const scrollContainerRef = useRef(null);
  
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };
  
//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto  bg-white">
//       {/* Hero Section - Purple Background */}
//       <div className="bg-purple-500 text-white py-16 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Scholarship</h1>
//         <p className="mb-8 max-w-2xl mx-auto">
//           Search through thousands of scholarships tailored to your profile and aspirations
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div className="max-w-4xl mx-auto px-4 mt-8 mb-12 flex gap-2">
//         <input 
//           className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700" 
//           placeholder="Search scholarships by name, category, or amount..." 
//         />
//         <button className="bg-purple-500 p-3 rounded-md hover:bg-purple-600">
//           <Search className="h-5 w-5 text-white" />
//         </button>
//       </div>

//       {/* Featured Scholarships Section */}
//       <div className="max-w-6xl mx-auto px-4 pb-16">
//         <h2 className="text-2xl font-bold text-center text-purple-500 mb-2">
//           Featured Scholarships
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           Explore our curated list of top scholarship opportunities
//         </p>

//         {/* Horizontal Scroll Navigation */}
//         <div className="relative">
//           <button 
//             onClick={scrollLeft}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
//           >
//             <ChevronLeft className="h-6 w-6 text-purple-500" />
//           </button>
          
//           {/* Scholarship Cards - Horizontal Scrollable */}
//           <div 
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto gap-6 pb-4 px-4 scrollbar-hide snap-x"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 min-w-[300px] flex-shrink-0 snap-start">
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-purple-600 font-semibold">
//                     {item === 3 ? "Academic Excellence Aw" : "Academic Excellence Award"}
//                   </h3>
//                   <span className="text-purple-600">🏆</span>
//                 </div>
                
//                 <p className="font-semibold mt-1">Rs. 10,000</p>
                
//                 <p className="text-gray-600 text-sm mt-2">
//                   For outstanding academic achievement and leadership potential.
//                 </p>
                
//                 <p className="text-sm font-medium mt-4">Deadline: May 1, 2024</p>
                
//                 <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md mt-4">
//                   Apply Now
//                 </button>
//               </div>
//             ))}
//           </div>
          
//           <button 
//             onClick={scrollRight}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10"
//           >
//             <ChevronRight className="h-6 w-6 text-purple-500" />
//           </button>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Users, DollarSign, ExternalLink, Filter, Clock, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/header/Footer"

// Mock data for scholarships
const scholarshipsData = [
  {
    "Scholarship Name": "Adobe India Women-in-Technology Scholarship",
    Deadline: "2025-03-15",
    Eligibility: "Female students in tech-related fields",
    Amount: "INR 100,000",
    Website: "https://www.adobe.com/in/initiatives/women-in-tech.html",
  },
  {
    "Scholarship Name": "Inlaks Shivdasani Foundation Scholarships",
    Deadline: "2025-04-30",
    Eligibility: "Indian citizens with a good first degree",
    Amount: "Up to USD 100,000",
    Website: "https://www.inlaksfoundation.org/scholarship/",
  },
  {
    "Scholarship Name": "Fulbright-Nehru Master's Fellowships",
    Deadline: "2025-05-15",
    Eligibility: "Indian students with leadership qualities",
    Amount: "Full tuition, living costs",
    Website: "https://www.usief.org.in",
  },
  {
    "Scholarship Name": "JN Tata Endowment for the Higher Education of Indians",
    Deadline: "2025-03-20",
    Eligibility: "Indian graduates pursuing postgraduate studies abroad",
    Amount: "Loan scholarship up to INR 10,00,000",
    Website: "https://www.jntataendowment.org/",
  },
  {
    "Scholarship Name": "Narotam Sekhsaria Scholarship",
    Deadline: "2025-03-15",
    Eligibility: "Indian nationals under 30 years old",
    Amount: "Interest-free loan scholarship",
    Website: "https://www.nssfoundation.org/",
  },
  {
    "Scholarship Name": "KC Mahindra Scholarships for Post-Graduate Studies Abroad",
    Deadline: "2025-04-15",
    Eligibility: "Indian citizens with a first-class degree or equivalent",
    Amount: "Up to INR 8,00,000",
    Website: "https://www.kcmet.org/",
  },
  {
    "Scholarship Name": "Commonwealth Scholarships for Masters and PhD in the UK",
    Deadline: "2025-03-10",
    Eligibility: "Citizens of Commonwealth countries",
    Amount: "Full tuition, airfare, and living stipend",
    Website: "https://cscuk.fcdo.gov.uk/",
  },
  {
    "Scholarship Name": "Chevening Scholarships",
    Deadline: "2025-11-01",
    Eligibility: "Emerging leaders from across the world",
    Amount: "Full tuition, living allowance",
    Website: "https://www.chevening.org/",
  },
  {
    "Scholarship Name": "Rhodes Scholarship for India",
    Deadline: "2025-07-31",
    Eligibility: "Indian students under 25, with academic excellence",
    Amount: "Full tuition, stipend, and airfare",
    Website: "https://www.rhodeshouse.ox.ac.uk/",
  },
  {
    "Scholarship Name": "Stanford Reliance Dhirubhai Fellowship",
    Deadline: "2025-04-01",
    Eligibility: "Indian citizens with financial need",
    Amount: "Covers approx. 80% of tuition",
    Website: "https://www.gsb.stanford.edu/",
  },
]

export default function ScholarshipPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredScholarships, setFilteredScholarships] = useState(scholarshipsData)
  const [activeFilter, setActiveFilter] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("deadline")
  const [animatedElements, setAnimatedElements] = useState([])

  useEffect(() => {
    // Set up intersection observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => {
      observer.observe(el)
      setAnimatedElements((prev) => [...prev, el])
    })

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [filteredScholarships])

  useEffect(() => {
    // Filter scholarships based on search term
    const results = scholarshipsData.filter(
      (scholarship) =>
        scholarship["Scholarship Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship["Eligibility"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship["Amount"].toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Apply additional filters
    let filtered = [...results]
    if (activeFilter === "upcoming") {
      const today = new Date()
      const oneMonth = new Date()
      oneMonth.setMonth(today.getMonth() + 1)

      filtered = filtered.filter((scholarship) => {
        const deadline = new Date(scholarship["Deadline"])
        return deadline > today && deadline <= oneMonth
      })
    } else if (activeFilter === "high-value") {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship["Amount"].includes("Full") ||
          scholarship["Amount"].includes("100,000") ||
          scholarship["Amount"].includes("10,00,000"),
      )
    }

    // Sort scholarships
    if (sortBy === "deadline") {
      filtered.sort((a, b) => new Date(a["Deadline"]) - new Date(b["Deadline"]))
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a["Scholarship Name"].localeCompare(b["Scholarship Name"]))
    }

    setFilteredScholarships(filtered)
  }, [searchTerm, activeFilter, sortBy])

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineStr) => {
    const today = new Date()
    const deadline = new Date(deadlineStr)
    const diffTime = deadline - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get urgency class based on days remaining
  const getUrgencyClass = (days) => {
    if (days < 30) return "text-red-500"
    if (days < 60) return "text-orange-500"
    return "text-green-500"
  }

  // Toggle filter section
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b max-w-7xl mx-auto from-purple-50 to-white">
      {/* Hero Section with CSS Animations */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-bounce-slow mb-6">
            <Award className="h-16 w-16 mx-auto text-purple-200" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Find Your Perfect Scholarship
          </h1>

          <p className="mb-8 max-w-2xl mx-auto text-lg text-purple-100 animate-fade-in animation-delay-300">
            Search through thousands of scholarships tailored to your profile and aspirations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-500">
            <Button className="bg-white text-purple-700 hover:bg-purple-50 transition-all duration-300 hover:scale-105">
              Browse All Scholarships
            </Button>
            <Button
              variant="outline"
              className="border-white text-white bg-purple-700 transition-all duration-300 hover:scale-105"
            >
              Get Personalized Recommendations
            </Button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle" style={{ top: "10%", left: "10%", animationDelay: "0s" }}></div>
          <div className="floating-circle" style={{ top: "70%", left: "20%", animationDelay: "2s" }}></div>
          <div className="floating-circle" style={{ top: "30%", left: "80%", animationDelay: "1s" }}></div>
          <div className="floating-circle" style={{ top: "60%", left: "70%", animationDelay: "3s" }}></div>
          <div className="floating-circle" style={{ top: "20%", left: "40%", animationDelay: "4s" }}></div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-2 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 py-6 bg-gray-50 border-0 focus-visible:ring-purple-500"
                placeholder="Search scholarships by name, eligibility, or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-1">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 transition-all duration-300 hover:bg-purple-100"
                onClick={toggleFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filter options */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isFilterOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 border-t ml-4 pb-2">
              <h3 className="font-medium mb-3">Quick Filters:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 text-sm transition-all duration-300 ${
                    activeFilter === "all" ? "bg-purple-600" : "hover:bg-purple-100"
                  }`}
                  onClick={() => setActiveFilter("all")}
                >
                  All Scholarships
                </Badge>
                <Badge
                  variant={activeFilter === "upcoming" ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 text-sm transition-all duration-300 ${
                    activeFilter === "upcoming" ? "bg-purple-600" : "hover:bg-purple-100"
                  }`}
                  onClick={() => setActiveFilter("upcoming")}
                >
                  Upcoming Deadlines
                </Badge>
                <Badge
                  variant={activeFilter === "high-value" ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 text-sm transition-all duration-300 ${
                    activeFilter === "high-value" ? "bg-purple-600" : "hover:bg-purple-100"
                  }`}
                  onClick={() => setActiveFilter("high-value")}
                >
                  High Value Awards
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-purple-100">
            <TabsTrigger value="featured" className="flex-1 data-[state=active]:bg-purple-600">
              Featured
            </TabsTrigger>
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-purple-600">
              All Scholarships
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-purple-600">
              Saved
            </TabsTrigger>
          </TabsList>

          {/* Featured Tab */}
          <TabsContent value="featured" className="mt-0">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-2 animate-on-scroll">
                Featured Scholarships
              </h2>
              <p className="text-center text-gray-600 mb-8 animate-on-scroll">
                Explore our curated list of top scholarship opportunities
              </p>
            </div>

            {/* Grid Layout for Featured Scholarships */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.slice(0, 6).map((scholarship, index) => (
                <div key={index} className={`animate-on-scroll animation-delay-${index % 5}`}>
                  <FeaturedScholarshipCard
                    scholarship={scholarship}
                    index={index}
                    daysRemaining={getDaysRemaining(scholarship["Deadline"])}
                    urgencyClass={getUrgencyClass(getDaysRemaining(scholarship["Deadline"]))}
                    data={scholarship}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* All Scholarships Tab */}
          <TabsContent value="all" className="mt-0">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-2 animate-on-scroll">
                All Scholarships
              </h2>
              <p className="text-center text-gray-600 mb-8 animate-on-scroll">
                Browse all available scholarship opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((scholarship, index) => (
                <div key={index} className={`animate-on-scroll animation-delay-${index % 5}`}>
                  <ScholarshipCard
                    scholarship={scholarship}
                    daysRemaining={getDaysRemaining(scholarship["Deadline"])}
                    urgencyClass={getUrgencyClass(getDaysRemaining(scholarship["Deadline"]))}
                  />
                </div>
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <div className="text-center py-16">
                <div className="animate-pulse">
                  <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No scholarships found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-0">
            <div className="text-center py-16">
              <div className="animate-pulse">
                <Sparkles className="h-16 w-16 mx-auto text-purple-300 mb-4" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No saved scholarships yet</h3>
              <p className="text-gray-500 mb-6">Save scholarships to view them later</p>
              <Button className="bg-purple-600 hover:bg-purple-700 transition-transform duration-300 hover:scale-105">
                Browse Scholarships
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Stats Section */}
      <div className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-12 animate-on-scroll">
            Why Choose Our Scholarship Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 text-purple-600" />,
                title: "10,000+ Scholarships",
                description: "Access thousands of scholarships from around the world",
              },
              {
                icon: <Users className="h-10 w-10 text-purple-600" />,
                title: "Personalized Matches",
                description: "Get scholarship recommendations based on your profile",
              },
              {
                icon: <Clock className="h-10 w-10 text-purple-600" />,
                title: "Deadline Reminders",
                description: "Never miss an application deadline again",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-on-scroll animation-delay-${index}`}
              >
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Perfect Scholarship?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Create a free account to save scholarships, get personalized recommendations, and receive deadline
              reminders.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, 10px);
          }
          50% {
            transform: translate(0, 20px);
          }
          75% {
            transform: translate(-10px, 10px);
          }
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-0 {
          animation-delay: 0s;
        }

        .animation-delay-1 {
          animation-delay: 0.1s;
        }

        .animation-delay-2 {
          animation-delay: 0.2s;
        }

        .animation-delay-3 {
          animation-delay: 0.3s;
        }

        .animation-delay-4 {
          animation-delay: 0.4s;
        }

        .floating-circle {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          animation: float 15s ease-in-out infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    <Footer/>

    </div>

  )
}

// Featured Scholarship Card Component
function FeaturedScholarshipCard({ scholarship, index, daysRemaining, urgencyClass,data }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-purple-100 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Colorful top bar */}
      <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-purple-700 font-bold line-clamp-2">
            {scholarship["Scholarship Name"]}
          </CardTitle>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Featured</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-purple-700 font-medium mb-4">
          <DollarSign className="h-5 w-5" />
          <span>{scholarship["Amount"]}</span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">{scholarship["Eligibility"]}</p>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-600">
                Deadline:{" "}
                {new Date(scholarship["Deadline"]).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className={`text-sm font-medium ${urgencyClass}`}>{daysRemaining} days remaining</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4 flex flex-col gap-2">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300">Apply Now</Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300"
        >
          <a href={data.Website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Website
          </a>
        </Button>
      </CardFooter>
    </div>
  )
}

// Regular Scholarship Card Component
function ScholarshipCard({ scholarship, daysRemaining, urgencyClass }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-purple-100 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-purple-700 font-bold line-clamp-2">
          {scholarship["Scholarship Name"]}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-purple-700 font-medium mb-3">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm">{scholarship["Amount"]}</span>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">{scholarship["Eligibility"]}</p>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-600">
                Deadline:{" "}
                {new Date(scholarship["Deadline"]).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className={`text-xs font-medium ${urgencyClass}`}>{daysRemaining} days remaining</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-3 flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all duration-300"
        >
          Details
        </Button>
        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 transition-all duration-300">
          Apply
        </Button>
      </CardFooter>
    </div>
  )
}
