// import { useState } from "react";
// import { X, Check, Loader2 } from "lucide-react";
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle, 
//   CardDescription 
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { api } from "@/api";

// export default function MenteeRegistrationForm() {
//   const [requirements, setRequirements] = useState("I want to learn");
//   const [fieldOfInterest, setFieldOfInterest] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const interestOptions = [
//     "SQL",
//     "Ubuntu",
//     "Python",
//     "JavaScript",
//     "React",
//     "Data Analysis",
//     "Machine Learning",
//     "Cloud Computing",
//     "Web Development",
//     "Mobile Development"
//   ];

//   const filteredOptions = interestOptions.filter(
//     option => !fieldOfInterest.includes(option) && 
//     option.toLowerCase().includes(inputValue.toLowerCase())
//   );

//   const handleAddInterest = (option) => {
//     setFieldOfInterest([...fieldOfInterest, option]);
//     setInputValue("");
//   };
  
//   const handleAddCustomInterest = () => {
//     if (inputValue && !fieldOfInterest.includes(inputValue)) {
//       setFieldOfInterest([...fieldOfInterest, inputValue]);
//       setInputValue("");
//     }
//   };

//   const handleRemoveInterest = (option) => {
//     setFieldOfInterest(fieldOfInterest.filter(item => item !== option));
//   };

//   const handleSubmit = async () => {
//     // Reset states
//     setError("");
//     setSuccess(false);

//     // Validate form
//     if (!requirements.trim()) {
//       setError("Please fill in your requirements.");
//       return;
//     }

//     if (fieldOfInterest.length === 0) {
//       setError("Please add at least one field of interest.");
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Get JWT token from localStorage
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         throw new Error('Authentication token not found. Please login first.');
//       }
      
//       const response = await fetch(`${api}/api/user/mentee/`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           Requirements: requirements,
//           Field_of_Interest: fieldOfInterest
//         }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }
      
//       setSuccess(true);
//     } catch (err) {
//       setError(err.message || 'Failed to register. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold text-purple-600">Join as a Mentee</CardTitle>
//         <CardDescription>Start your learning journey with GrantU</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Requirements */}
//         <div className="space-y-2">
//           <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
//             Requirements
//           </label>
//           <Textarea
//             id="requirements"
//             value={requirements}
//             onChange={(e) => setRequirements(e.target.value)}
//             rows={3}
//             className="w-full"
//           />
//         </div>

//         {/* Field of Interest Multiselect */}
//         <div className="space-y-2">
//           <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
//             Field of Interest
//           </label>
//           <div className="relative">
//             <div className="flex">
//               <Input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     e.preventDefault();
//                     handleAddCustomInterest();
//                   }
//                 }}
//                 placeholder="Search or add interest..."
//                 className="rounded-r-none"
//               />
//               <Button 
//                 type="button"
//                 onClick={handleAddCustomInterest}
//                 variant="default"
//                 className="rounded-l-none bg-purple-600 hover:bg-purple-700"
//               >
//                 <Check className="h-4 w-4" />
//               </Button>
//             </div>
//             {inputValue && filteredOptions.length > 0 && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
//                 {filteredOptions.map((option) => (
//                   <div
//                     key={option}
//                     className="p-2 hover:bg-purple-100 cursor-pointer"
//                     onClick={() => handleAddInterest(option)}
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//             {inputValue && filteredOptions.length === 0 && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
//                 <div className="p-2 hover:bg-purple-100 cursor-pointer" onClick={handleAddCustomInterest}>
//                   Add "{inputValue}"
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Selected interest tags */}
//           <div className="flex flex-wrap gap-2 mt-2">
//             {fieldOfInterest.map((item) => (
//               <Badge 
//                 key={item} 
//                 variant="outline"
//                 className="bg-purple-100 text-purple-800 border-purple-200"
//               >
//                 {item}
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveInterest(item)}
//                   className="ml-1 text-purple-600 hover:text-purple-800"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </Badge>
//             ))}
//           </div>
//         </div>

//         {/* Submit button */}
//         <Button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="w-full bg-purple-600 hover:bg-purple-700"
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Registering...
//             </>
//           ) : (
//             'Register as Mentee'
//           )}
//         </Button>
        
//         {/* Error message */}
//         {error && (
//           <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
        
//         {/* Success message */}
//         {success && (
//           <Alert className="bg-green-50 text-green-600 border-green-200">
//             <AlertDescription>Registration successful! You are now registered as a mentee.</AlertDescription>
//           </Alert>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from "@/api";
import {getMatchingFields, getStandardizedField } from "@/constants/standardizeField";

export default function MenteeRegistrationForm() {
  const [requirements, setRequirements] = useState("I want to learn");
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddInterest = (option) => {
    const standardized = getStandardizedField(option);
    if (!fieldOfInterest.includes(standardized)) {
      setFieldOfInterest([...fieldOfInterest, standardized]);
    }
    setInputValue("");
  };
  
  const handleAddCustomInterest = () => {
    if (inputValue.trim()) {
      const standardized = getStandardizedField(inputValue);
      if (!fieldOfInterest.includes(standardized)) {
        setFieldOfInterest([...fieldOfInterest, standardized]);
      }
      setInputValue("");
    }
  };

  const handleRemoveInterest = (option) => {
    setFieldOfInterest(fieldOfInterest.filter(item => item !== option));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!requirements.trim()) {
      setError("Please fill in your requirements.");
      return;
    }

    if (fieldOfInterest.length === 0) {
      setError("Please add at least one field of interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found. Please login first.');
      }

      const response = await fetch(`${api}/api/user/mentee/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          Requirements: requirements,
          Field_of_Interest: fieldOfInterest
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-600">Join as a Mentee</CardTitle>
        <CardDescription>Start your learning journey with GrantU</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <Textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fieldOfInterest" className="block text-sm font-medium text-gray-700">
            Field of Interest
          </label>
          <div className="relative">
            <div className="flex">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
                placeholder="Search or add interest..."
                className="rounded-r-none"
              />
              <Button 
                type="button"
                onClick={handleAddCustomInterest}
                variant="default"
                className="rounded-l-none bg-purple-600 hover:bg-purple-700"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {fieldOfInterest.map((item) => (
              <Badge 
                key={item} 
                variant="outline"
                className="bg-purple-100 text-purple-800 border-purple-200"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(item)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            'Register as Mentee'
          )}
        </Button>

        {error && (
          <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <AlertDescription>Registration successful! You are now registered as a mentee.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
