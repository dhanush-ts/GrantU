// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';
// import {Avatar,AvatarFallback,AvatarImage} from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Button 
// } from '@/components/ui/button';
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Building,
//   Briefcase,
//   BookOpen,
//   Edit
// } from 'lucide-react';

// export default function ProfilePage() {
//   const [userData, setUserData] = useState({
//     "First_Name": "John",
//     "Last_Name": "Doe",
//     "Email_Address": "aswin.doe@example.com",
//     "Phone_Number": "0987654321",
//     "Password": "Changeme@123",
//     "pincode": "123456",
//     "address": "123 Main Street",
//     "DOB": "1995-08-15T00:00:00Z",
//     "Gender": "Male",
//     "Expertise": [
//         "SQL",
//         "Power BI",
//         "MS Excel"
//     ],
//     "Field_of_Interest": [
//         "SQL",
//         "Ubuntu"
//     ],
//     "Requirements": "I want to learn",
//     "Years_of_Experience": 4,
//     "organization_detail": "I am working at amazon"
//   });

//   // Format date of birth
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Calculate age
//   const calculateAge = (dateString) => {
//     const birthDate = new Date(dateString);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
    
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
    
//     return age;
//   };

//   const getInitials = () => {
//     return `${userData.First_Name.charAt(0)}${userData.Last_Name.charAt(0)}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container  mx-auto px-4">
//         <div className="flex flex-col max-w-7xl mx-auto md:flex-row gap-6">
//           {/* Left Column: Profile Card */}
//           <div className="w-full md:w-1/3">
//             <Card className="shadow-lg">
//               <CardHeader className="pb-0">
//                 <div className="flex justify-between items-start">
//                   <div className="flex flex-col items-center">
//                     <Avatar className="h-24 w-24">
//                       <AvatarFallback className="bg-purple-500 text-white text-xl">
//                         {getInitials()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="mt-4 text-center">
//                       <CardTitle className="text-2xl">{userData.First_Name} {userData.Last_Name}</CardTitle>
//                       <CardDescription className="text-gray-500 mt-1">
//                         {userData.organization_detail}
//                       </CardDescription>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="icon">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Mail className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{userData.Email_Address}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{userData.Phone_Number}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{userData.address}, {userData.pincode}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{formatDate(userData.DOB)} ({calculateAge(userData.DOB)} years)</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <User className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{userData.Gender}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Briefcase className="h-5 w-5 text-gray-500" />
//                     <span className="text-sm">{userData.Years_of_Experience} years of experience</span>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="border-t pt-4 flex justify-between">
//                 <Button variant="outline">Reset Password</Button>
//                 <Button>Save Changes</Button>
//               </CardFooter>
//             </Card>
//           </div>
          
//           {/* Right Column: Tabs */}
//           <div className="w-full md:w-2/3">
//             <Tabs defaultValue="skills" className="w-full">
//               <TabsList className="grid grid-cols-3 mb-4">
//                 <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
//                 <TabsTrigger value="interests">Interests</TabsTrigger>
//                 <TabsTrigger value="requirements">Requirements</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="skills">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Skills & Expertise</CardTitle>
//                     <CardDescription>Your professional skills and technical expertise</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {userData.Expertise.map((skill, index) => (
//                         <Badge key={index} className="bg-purple-500 hover:bg-purple-600 px-3 py-1">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="mt-4">
//                       <h3 className="text-lg font-medium mb-2">Experience Summary</h3>
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Building className="h-5 w-5 text-gray-500" />
//                           <span className="font-medium">Current Organization:</span>
//                         </div>
//                         <p className="ml-7 text-gray-700">{userData.organization_detail}</p>
                        
//                         <div className="flex items-center gap-2 mt-4 mb-2">
//                           <Briefcase className="h-5 w-5 text-gray-500" />
//                           <span className="font-medium">Years of Experience:</span>
//                         </div>
//                         <p className="ml-7 text-gray-700">{userData.Years_of_Experience} years</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex justify-end border-t pt-4">
//                     <Button variant="outline">Add Skill</Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
              
//               <TabsContent value="interests">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Fields of Interest</CardTitle>
//                     <CardDescription>Areas you're interested in learning and developing</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-wrap gap-2">
//                       {userData.Field_of_Interest.map((interest, index) => (
//                         <Badge key={index} variant="outline" className="border-purple-400 text-purple-500 px-3 py-1">
//                           {interest}
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="mt-8">
//                       <h3 className="text-lg font-medium mb-3">Suggested Interests</h3>
//                       <div className="flex flex-wrap gap-2">
//                         <Badge variant="outline" className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100">
//                           Data Analytics
//                         </Badge>
//                         <Badge variant="outline" className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100">
//                           Python
//                         </Badge>
//                         <Badge variant="outline" className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100">
//                           Cloud Computing
//                         </Badge>
//                         <Badge variant="outline" className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100">
//                           Machine Learning
//                         </Badge>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex justify-end border-t pt-4">
//                     <Button variant="outline">Add Interest</Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
              
//               <TabsContent value="requirements">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Learning Requirements</CardTitle>
//                     <CardDescription>Your specific learning goals and requirements</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                       <div className="flex items-start gap-2">
//                         <BookOpen className="h-5 w-5 text-gray-500 mt-1" />
//                         <div>
//                           <p className="text-gray-700">{userData.Requirements}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <h3 className="text-lg font-medium">Recommended Learning Paths</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <Card className="bg-purple-50 border-purple-100">
//                           <CardHeader className="pb-2">
//                             <CardTitle className="text-md">SQL Mastery</CardTitle>
//                           </CardHeader>
//                           <CardContent className="pt-0">
//                             <p className="text-sm text-gray-600">Advanced database design and optimization</p>
//                           </CardContent>
//                         </Card>
                        
//                         <Card className="bg-purple-50 border-purple-100">
//                           <CardHeader className="pb-2">
//                             <CardTitle className="text-md">Power BI Advanced</CardTitle>
//                           </CardHeader>
//                           <CardContent className="pt-0">
//                             <p className="text-sm text-gray-600">Data modeling and DAX formulas</p>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex justify-end border-t pt-4">
//                     <Button variant="outline">Update Requirements</Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Briefcase,
  BookOpen,
  Edit,
  Lock,
  Save,
  Plus,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom"
import { api } from "@/api"
// import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const navi = useNavigate();
  const [userData, setUserData] = useState({
    First_Name: "",
    Last_Name: "",
    Email_Address: "",
    Phone_Number: "",
    Password: "",
    pincode: "",
    address: "",
    DOB: "",
    Gender: "",
    Expertise: null,
    Field_of_Interest: null,
    Requirements: null,
    Years_of_Experience: null,
    organization_detail: null,
  })

  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState({
    profile: false,
    expertise: false,
    interests: false,
    requirements: false,
  })

  const [editData, setEditData] = useState({
    address: "",
    pincode: "",
    Expertise: [],
    Years_of_Experience: "",
    organization_detail: "",
    Field_of_Interest: [],
    Requirements: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        // Get token from localStorage or wherever you store it
        const token = localStorage.getItem("token")

        if(!token){
          navi("/signup");
        }

        const response = await fetch(`${api}/api/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch profile data")
        }

        const data = await response.json()
        setUserData(data)

        // Initialize edit data with current values
        setEditData({
          address: data.address || "",
          pincode: data.pincode || "",
          Expertise: data.Expertise || [],
          Years_of_Experience: data.Years_of_Experience?.toString() || "",
          organization_detail: data.organization_detail || "",
          Field_of_Interest: data.Field_of_Interest || [],
          Requirements: data.Requirements || "",
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Update profile (address and pincode)
  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`${api}/api/auth/profile/edit/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          address: editData.address,
          pincode: editData.pincode,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const data = await response.json()

      // Update local state with new data
      setUserData((prev) => ({
        ...prev,
        address: editData.address,
        pincode: editData.pincode,
      }))

      setEditMode((prev) => ({ ...prev, profile: false }))
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  // Update mentor data (expertise, experience, organization)
  const updateMentorData = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`${api}/api/auth/mentor/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Expertise: editData.Expertise,
          Years_of_Experience: editData.Years_of_Experience,
          organization_detail: editData.organization_detail,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update mentor data")
      }

      const data = await response.json()

      // Update local state with new data
      setUserData((prev) => ({
        ...prev,
        Expertise: editData.Expertise,
        Years_of_Experience: Number.parseInt(editData.Years_of_Experience) || 0,
        organization_detail: editData.organization_detail,
      }))

      setEditMode((prev) => ({ ...prev, expertise: false }))

    } catch (error) {
      console.error("Error updating mentor data:", error)
    }
  }

  // Update mentee data (interests and requirements)
  const updateMenteeData = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`${api}/api/auth/mentee/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Field_of_Interest: editData.Field_of_Interest,
          Requirements: editData.Requirements,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update mentee data")
      }

      const data = await response.json()

      // Update local state with new data
      setUserData((prev) => ({
        ...prev,
        Field_of_Interest: editData.Field_of_Interest,
        Requirements: editData.Requirements,
      }))

      setEditMode((prev) => ({
        ...prev,
        interests: false,
        requirements: false,
      }))

    } catch (error) {
      console.error("Error updating mentee data:", error)
    }
  }

  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate age
  const calculateAge = (dateString) => {
    if (!dateString) return null
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const getInitials = () => {
    return `${userData.First_Name?.charAt(0) || ""}${userData.Last_Name?.charAt(0) || ""}`
  }

  // Add new skill to expertise
  const addSkill = () => {
    if (newSkill.trim() && !editData.Expertise.includes(newSkill.trim())) {
      setEditData((prev) => ({
        ...prev,
        Expertise: [...prev.Expertise, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  // Remove skill from expertise
  const removeSkill = (skill) => {
    setEditData((prev) => ({
      ...prev,
      Expertise: prev.Expertise.filter((s) => s !== skill),
    }))
  }

  // Add new interest
  const addInterest = () => {
    if (newInterest.trim() && !editData.Field_of_Interest.includes(newInterest.trim())) {
      setEditData((prev) => ({
        ...prev,
        Field_of_Interest: [...prev.Field_of_Interest, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  // Remove interest
  const removeInterest = (interest) => {
    setEditData((prev) => ({
      ...prev,
      Field_of_Interest: prev.Field_of_Interest.filter((i) => i !== interest),
    }))
  }

  // Add suggested interest
  const addSuggestedInterest = (interest) => {
    if (!editData.Field_of_Interest.includes(interest)) {
      setEditData((prev) => ({
        ...prev,
        Field_of_Interest: [...prev.Field_of_Interest, interest],
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row gap-4 md:gap-6">
          {/* Left Column: Profile Card */}
          <div className="w-full md:w-1/3">
            <Card className="shadow-lg">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24">
                      <AvatarFallback className="bg-purple-500 text-white uppercase text-4xl font-semibold">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                      <CardTitle className="text-xl uppercase md:text-2xl">
                        {userData.First_Name} {userData.Last_Name}
                      </CardTitle>
                      <CardDescription className="text-gray-500 mt-1">
                        {userData.organization_detail || "No organization specified"}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditMode((prev) => ({ ...prev, profile: !prev.profile }))}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm break-all">{userData.Email_Address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">{userData.Phone_Number}</span>
                  </div>

                  {editMode.profile ? (
                    <div className="space-y-3 pt-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input
                          value={editData.address}
                          onChange={(e) => setEditData((prev) => ({ ...prev, address: e.target.value }))}
                          placeholder="Enter your address"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Pincode</label>
                        <Input
                          value={editData.pincode}
                          onChange={(e) => setEditData((prev) => ({ ...prev, pincode: e.target.value }))}
                          placeholder="Enter your pincode"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <span className="text-sm">
                        {userData.address || "No address specified"}, {userData.pincode || ""}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">
                      {formatDate(userData.DOB)}
                      {calculateAge(userData.DOB) ? ` (${calculateAge(userData.DOB)} years)` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">{userData.Gender || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">
                      {userData.Years_of_Experience
                        ? `${userData.Years_of_Experience} years of experience`
                        : "Experience not specified"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                {editMode.profile ? (
                  <>
                    <Button variant="outline" onClick={() => setEditMode((prev) => ({ ...prev, profile: false }))}>
                      Cancel
                    </Button>
                    <Button onClick={updateProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <Button variant="outline">Reset Password</Button> */}
                    {/* <Button onClick={() => setEditMode((prev) => ({ ...prev, profile: true }))}>Edit Profile</Button> */}
                  </>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Right Column: Tabs */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="skills">
                  {userData.Expertise === null ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Skills & Expertise
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Become a mentor to unlock</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    "Skills & Expertise"
                  )}
                </TabsTrigger>
                <TabsTrigger value="interests" disabled={userData.Field_of_Interest === null}>
                  {userData.Field_of_Interest === null ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Interests
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Become a mentee to unlock</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    "Interests"
                  )}
                </TabsTrigger>
                <TabsTrigger value="requirements" disabled={userData.Requirements === null}>
                  {userData.Requirements === null ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center">
                          <Lock className="h-3 w-3 mr-1" />
                          Requirements
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Become a mentee to unlock</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    "Requirements"
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="skills">
                {userData.Expertise === null ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Become a Mentor</CardTitle>
                      <CardDescription>Share your expertise and help others grow</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Lock className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-center text-gray-500 max-w-md">
                        This section is currently locked. Become a mentor to share your skills and expertise with
                        others.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-4">
                      <Button>Become a Mentor</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle>Skills & Expertise</CardTitle>
                        <CardDescription>Your professional skills and technical expertise</CardDescription>
                      </div>
                      {!editMode.expertise && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditMode((prev) => ({ ...prev, expertise: true }))}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editMode.expertise ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Skills & Expertise</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {editData.Expertise.map((skill, index) => (
                                <Badge
                                  key={index}
                                  className="bg-purple-500 hover:bg-purple-600 px-3 py-1 cursor-pointer"
                                  onClick={() => removeSkill(skill)}
                                >
                                  {skill} ×
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a new skill"
                                className="flex-1"
                                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                              />
                              <Button onClick={addSkill} size="sm">
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Years of Experience</label>
                            <Input
                              type="number"
                              value={editData.Years_of_Experience}
                              onChange={(e) =>
                                setEditData((prev) => ({ ...prev, Years_of_Experience: e.target.value }))
                              }
                              placeholder="Enter years of experience"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Organization Details</label>
                            <Textarea
                              value={editData.organization_detail}
                              onChange={(e) =>
                                setEditData((prev) => ({ ...prev, organization_detail: e.target.value }))
                              }
                              placeholder="Enter your organization details"
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {userData.Expertise &&
                              userData.Expertise.map((skill, index) => (
                                <Badge key={index} className="bg-purple-500 hover:bg-purple-600 px-3 py-1">
                                  {skill}
                                </Badge>
                              ))}
                            {(!userData.Expertise || userData.Expertise.length === 0) && (
                              <p className="text-gray-500">No skills specified</p>
                            )}
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2">Experience Summary</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Building className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">Current Organization:</span>
                              </div>
                              <p className="ml-7 text-gray-700">{userData.organization_detail || "Not specified"}</p>

                              <div className="flex items-center gap-2 mt-4 mb-2">
                                <Briefcase className="h-5 w-5 text-gray-500" />
                                <span className="font-medium">Years of Experience:</span>
                              </div>
                              <p className="ml-7 text-gray-700">
                                {userData.Years_of_Experience
                                  ? `${userData.Years_of_Experience} years`
                                  : "Not specified"}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    {editMode.expertise && (
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditMode((prev) => ({ ...prev, expertise: false }))}
                        >
                          Cancel
                        </Button>
                        <Button onClick={updateMentorData}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="interests">
                {userData.Field_of_Interest === null ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Become a Mentee</CardTitle>
                      <CardDescription>Discover new interests and learn from experts</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Lock className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-center text-gray-500 max-w-md">
                        This section is currently locked. Become a mentee to explore your interests and connect with
                        mentors.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-4">
                      <Button>Become a Mentee</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle>Fields of Interest</CardTitle>
                        <CardDescription>Areas you're interested in learning and developing</CardDescription>
                      </div>
                      {!editMode.interests && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditMode((prev) => ({ ...prev, interests: true }))}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editMode.interests ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Fields of Interest</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {editData.Field_of_Interest.map((interest, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-purple-400 text-purple-500 px-3 py-1 cursor-pointer"
                                  onClick={() => removeInterest(interest)}
                                >
                                  {interest} ×
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                                placeholder="Add a new interest"
                                className="flex-1"
                                onKeyDown={(e) => e.key === "Enter" && addInterest()}
                              />
                              <Button onClick={addInterest} size="sm">
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-lg font-medium mb-3">Suggested Interests</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => addSuggestedInterest("Data Analytics")}
                              >
                                Data Analytics
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => addSuggestedInterest("Python")}
                              >
                                Python
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => addSuggestedInterest("Cloud Computing")}
                              >
                                Cloud Computing
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => addSuggestedInterest("Machine Learning")}
                              >
                                Machine Learning
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2">
                            {userData.Field_of_Interest &&
                              userData.Field_of_Interest.map((interest, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-purple-400 text-purple-500 px-3 py-1"
                                >
                                  {interest}
                                </Badge>
                              ))}
                            {(!userData.Field_of_Interest || userData.Field_of_Interest.length === 0) && (
                              <p className="text-gray-500">No interests specified</p>
                            )}
                          </div>
                          <div className="mt-8">
                            <h3 className="text-lg font-medium mb-3">Suggested Interests</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                              >
                                Data Analytics
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                              >
                                Python
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                              >
                                Cloud Computing
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-gray-300 text-gray-500 px-3 py-1 cursor-pointer hover:bg-gray-100"
                              >
                                Machine Learning
                              </Badge>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    {editMode.interests && (
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditMode((prev) => ({ ...prev, interests: false }))}
                        >
                          Cancel
                        </Button>
                        <Button onClick={updateMenteeData}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="requirements">
                {userData.Requirements === null ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Become a Mentee</CardTitle>
                      <CardDescription>Define your learning requirements</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Lock className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-center text-gray-500 max-w-md">
                        This section is currently locked. Become a mentee to specify your learning requirements and
                        goals.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t pt-4">
                      <Button>Become a Mentee</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div>
                        <CardTitle>Learning Requirements</CardTitle>
                        <CardDescription>Your specific learning goals and requirements</CardDescription>
                      </div>
                      {!editMode.requirements && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditMode((prev) => ({ ...prev, requirements: true }))}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editMode.requirements ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Learning Requirements</label>
                            <Textarea
                              value={editData.Requirements}
                              onChange={(e) => setEditData((prev) => ({ ...prev, Requirements: e.target.value }))}
                              placeholder="Describe your learning goals and requirements"
                              rows={5}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex items-start gap-2">
                              <BookOpen className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-gray-700">{userData.Requirements || "No requirements specified"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Recommended Learning Paths</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card className="bg-purple-50 border-purple-100">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-md">SQL Mastery</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <p className="text-sm text-gray-600">Advanced database design and optimization</p>
                                </CardContent>
                              </Card>

                              <Card className="bg-purple-50 border-purple-100">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-md">Power BI Advanced</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <p className="text-sm text-gray-600">Data modeling and DAX formulas</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    {editMode.requirements && (
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditMode((prev) => ({ ...prev, requirements: false }))}
                        >
                          Cancel
                        </Button>
                        <Button onClick={updateMenteeData}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
