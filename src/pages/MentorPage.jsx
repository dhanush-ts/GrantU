// import { Button } from "@/components/ui/button";
// import { Card, CardContent ,CardFooter} from "@/components/ui/card";
// import { Heart, BookOpen, Network, Star, ChevronLeft, ChevronRight } from "lucide-react";
// import Footer from "@/components/header/Footer";
// import mentorImage from "../assets/pf.png";
// import { Badge } from '@/components/ui/badge';

// export default function MentorPage() {
//   const scrollContainerRef = 
// 
// ef(null);
  
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
//   const developers = [
//     {
//       id: 1,
//       name: 'Tanmay Goel',
//       rating: 5,
//       position: 'Software Engineer',
//       company: 'Qualcomm',
//       bookings: '4199+',
//       hasCall: true,
//       hasPriorityDM: true,
//       profileImage: mentorImage,
//     },
//     {
//       id: 2,
//       name: 'Suraj Kumar Na...',
//       rating: 4.6,
//       position: 'DevOps Engineer II',
//       company: 'Bristol Squibb',
//       bookings: '57+',
//       hasCall: true,
//       hasPriorityDM: true,
//       profileImage: mentorImage,
//     },
//     {
//       id: 3,
//       name: 'Pravin Sawant',
//       rating: 5,
//       position: 'Senior software en...',
//       company: 'Wells Fargo',
//       bookings: '85+',
//       hasCall: true,
//       hasPriorityDM: true,
//       profileImage: mentorImage,
//     },
//     {
//       id: 4,
//       name: 'Anand Pandey',
//       rating: 5,
//       position: 'Software Engineer',
//       company: 'Bluecore',
//       bookings: '155+',
//       hasCall: true,
//       hasPriorityDM: true,
//       profileImage: mentorImage,
//     },
//     {
//       id: 5,
//       name: 'Alok Ra...',
//       rating: 4.7,
//       position: 'Building...',
//       company: 'Multiplier',
//       bookings: '203+',
//       hasCall: true,
//       hasPriorityDM: true,
//       profileImage: mentorImage,
//     }
//   ];


//   // const placeholderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut";

//   return (
    
//     <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
//       {/* Hero Section with Purple Background */}
//       <section className="bg-purple-500 text-white py-16 text-center">
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">
//             Become a Mentor
//           </h1>
//           <p className="mb-8 max-w-2xl mx-auto">
//             Share your knowledge and experience to help students navigate the 
//             scholarship process.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> 
//             <Button className="bg-white text-purple-500 hover:bg-gray-100">
//               Sign Up as Mentor
//             </Button>
//             <Button className="border-white bg-purple-600 text-white hover:bg-white hover:text-black">
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </section>

//       <div className="container mt-10 mx-auto">
//           <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">
//             Meet Our Mentors
//           </h2>
//           <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//             Our mentors come from diverse backgrounds and have helped
//             students secure millions in scholarship funding.
//           </p>
//       </div>
//       <div className="w-full py-8">
//       <div className="flex overflow-x-auto gap-6 pb-6 px-4 no-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//         {developers.map((developer) => (
//           <Card key={developer.id} className="min-w-72 max-w-72 flex-none bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={developer.profileImage}
//                   alt={developer.name}
//                   className="w-14 h-14 rounded-full border-2 border-gray-50 shadow-sm object-cover"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg text-gray-800">{developer.name}</h3>
//                   <div className="flex items-center">
//                     <div className="flex items-center bg-yellow-50 rounded-md px-2 py-0.5">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="font-bold ml-1 text-gray-700">{developer.rating}/5</span>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 truncate mt-0.5">{developer.position}</p>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex flex-wrap gap-2">
//                   <Badge variant="outline" className="rounded-full px-3 py-1 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
//                     {developer.company}
//                   </Badge>
//                   <Badge variant="outline" className="rounded-full px-3 py-1 bg-green-50 text-green-700 border-green-100 hover:bg-green-100">
//                     {developer.bookings} bookings
//                   </Badge>
//                 </div>
                
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {developer.hasCall && (
//                     <Badge variant="outline" className="rounded-full px-3 py-1 bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100">
//                       1:1 Call
//                     </Badge>
//                   )}
//                   {developer.hasPriorityDM && (
//                     <Badge variant="outline" className="rounded-full px-3 py-1 bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100">
//                       Priority DM
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
            
//             <CardFooter className="px-6 pb-6 pt-0">
//               <Button variant="outline" className="w-full rounded-full border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors">
//                 See Profile
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>

//       {/* Why Become a Mentor Section */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">
//             Why Become a Mentor?
//           </h2>
//           <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//             Mentoring is a rewarding way to give back and help shape the future of
//             education.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Reason 1 */}
//             <Card className="bg-purple-50 shadow-purple-6 shadow-sm hover:shadow-md transition-shadow border-none hover:shadow-purple-500">
//               <CardContent className="pt-6 px-4 pb-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
//                     <Heart className="h-4 w-4 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 font-semibold">Make an Impact</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Help students from diverse backgrounds access educational
//                   opportunities they might otherwise miss.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Reason 2 */}
//             <Card className="bg-purple-50 shadow-sm hover:shadow-md transition-shadow border-none hover:shadow-purple-500">
//               <CardContent className="pt-6 px-4 pb-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
//                     <BookOpen className="h-4 w-4 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 font-semibold">Share Knowledge</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Pass on your expertise and insights about navigating the scholarship
//                   application process.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Reason 3 */}
//             <Card className="bg-purple-50 shadow-sm hover:shadow-md transition-shadow border-none hover:shadow-purple-500">
//               <CardContent className="pt-6 px-4 pb-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
//                     <Network className="h-4 w-4 text-purple-500" />
//                   </div>
//                   <h3 className="text-purple-500 font-semibold">Build Your Network</h3>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Connect with other mentors and students who are passionate
//                   about education.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-12 px-4">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold text-purple-500 mb-4">
//             Ready to make a Difference?
//           </h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Join our community of mentors and help students achieve their
//             educational dreams.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Button className="bg-purple-500 hover:bg-purple-600 text-white">
//               Sign Up as Mentor
//             </Button>
//             <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
//               Learn More
//             </Button>
//           </div>
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   );
// }

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, BookOpen, Network, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/header/Footer";
import mentorImage from "../assets/pf.png";
import { Badge } from "@/components/ui/badge";
import MentorRegistrationForm from "@/components/forms/MentorRegister"; // Import the form component

export default function MentorPage({userData}) {
  const scrollContainerRef = useRef(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
    // Scroll to registration form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const developers = [
    {
      id: 1,
      name: "Tanmay Goel",
      rating: 5,
      position: "Software Engineer",
      company: "Qualcomm",
      bookings: "4199+",
      hasCall: true,
      hasPriorityDM: true,
      profileImage: mentorImage,
    },
    {
      id: 2,
      name: "Suraj Kumar Na...",
      rating: 4.6,
      position: "DevOps Engineer II",
      company: "Bristol Squibb",
      bookings: "57+",
      hasCall: true,
      hasPriorityDM: true,
      profileImage: mentorImage,
    },
    {
      id: 3,
      name: "Pravin Sawant",
      rating: 5,
      position: "Senior software en...",
      company: "Wells Fargo",
      bookings: "85+",
      hasCall: true,
      hasPriorityDM: true,
      profileImage: mentorImage,
    },
    {
      id: 4,
      name: "Anand Pandey",
      rating: 5,
      position: "Software Engineer",
      company: "Bluecore",
      bookings: "155+",
      hasCall: true,
      hasPriorityDM: true,
      profileImage: mentorImage,
    },
    {
      id: 5,
      name: "Alok Ra...",
      rating: 4.7,
      position: "Building...",
      company: "Multiplier",
      bookings: "203+",
      hasCall: true,
      hasPriorityDM: true,
      profileImage: mentorImage,
    },
  ];

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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          {!userData?.Expertise && <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-purple-500 hover:bg-gray-100" onClick={openRegistrationForm}>
              Join as Mentor
            </Button>
            <Button className="border-white bg-purple-600 text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>}
        </div>
      </section>

      {/* Meet Our Mentors Section */}
      <div className="container mt-10 mx-auto">
        <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">Meet Our Mentors</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our mentors come from diverse backgrounds and have helped students secure millions in
          scholarship funding.
        </p>
      </div>

      <div className="w-full py-8 relative">
        {/* Left Chevron */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6 text-purple-500" />
        </button>

        {/* Scrollable Cards */}
        <div
          className="flex overflow-x-auto gap-6 pb-6 px-12 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollContainerRef}
        >
          {developers.map((developer) => (
            <Card
              key={developer.id}
              className="min-w-72 max-w-72 flex-none bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={developer.profileImage}
                    alt={developer.name}
                    className="w-14 h-14 rounded-full border-2 border-gray-50 shadow-sm object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{developer.name}</h3>
                    <div className="flex items-center">
                      <div className="flex items-center bg-yellow-50 rounded-md px-2 py-0.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold ml-1 text-gray-700">{developer.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-0.5">{developer.position}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
                      {developer.company}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-green-50 text-green-700 border-green-100 hover:bg-green-100">
                      {developer.bookings} bookings
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {developer.hasCall && (
                      <Badge variant="outline" className="rounded-full px-3 py-1 bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100">
                        1:1 Call
                      </Badge>
                    )}
                    {developer.hasPriorityDM && (
                      <Badge variant="outline" className="rounded-full px-3 py-1 bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100">
                        Priority DM
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
                >
                  See Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Right Chevron */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 text-purple-500" />
        </button>
      </div>

      {/* Why Become a Mentor Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-purple-500 text-center mb-2">
            Why Become a Mentor?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Mentoring is a rewarding way to give back and help shape the future of education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reason 1 */}
            <Card className="bg-purple-50 shadow-purple-6 shadow-sm hover:shadow-md transition-shadow border-none ">
              <CardContent className="pt-6 px-4 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Heart className="h-4 w-4 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 font-semibold">Make an Impact</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Help students from diverse backgrounds access educational opportunities they might
                  otherwise miss.
                </p>
              </CardContent>
            </Card>

            {/* Reason 2 */}
            <Card className="bg-purple-50 shadow-sm hover:shadow-md transition-shadow border-none">
              <CardContent className="pt-6 px-4 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <BookOpen className="h-4 w-4 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 font-semibold">Share Knowledge</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Pass on your expertise and insights about navigating the scholarship application
                  process.
                </p>
              </CardContent>
            </Card>

            {/* Reason 3 */}
            <Card className="bg-purple-50 shadow-sm hover:shadow-md transition-shadow border-none ">
              <CardContent className="pt-6 px-4 pb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Network className="h-4 w-4 text-purple-500" />
                  </div>
                  <h3 className="text-purple-500 font-semibold">Build Your Network</h3>
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
      {!userData?.Expertise && <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-500 mb-4">
            Ready to make a Difference?
          </h2>
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
      </section>}

      <Footer />
    </div>
  );
}