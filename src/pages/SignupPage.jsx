// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import LoginPage from "../pages/LoginModal";
// import Image from '../assets/college2.png';
// import Footer from '@/components/header/Footer';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [signupSuccess, setSignupSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     First_Name: '',
//     Last_Name: '',
//     Email_Address: '',
//     Phone_Number: '',
//     Password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/auth/signup/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Signup failed');
//       }

//       const data = await response.json();
//       console.log('Signup successful:', data);
//       setSignupSuccess(true);

//       // Optional delay before redirect to show success message
//       setTimeout(() => {
//         navigate('/'); // Change to your login route if different
//       }, 1500);
//     } catch (error) {
//       console.error('Signup error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openLoginModal = (e) => {
//     e.preventDefault();
//     setLoginModalOpen(true);
//   };

//   return (
//     <div className='flex container max-w-7xl mx-auto px-4 py-1'>
//       {/* Left Side */}
//       <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 flex-col justify-center items-center text-white p-10">
//         <div className="max-w-md mx-auto text-center">
//           <h1 className="text-4xl font-bold">
//             &quot;Unlock your future with<br />a Exclusive Scholarship&quot;
//           </h1>
//         </div>
//         <div className="mt-8">
//           <img 
//             src={Image}
//             alt="Student with book" 
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
//         <div className="mx-auto w-full">
//           <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Create an Account</h2>
//           <div className="border-b border-gray-200 mb-6"></div>

//           <Card className="border-gray-200">
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input name="First_Name" placeholder="First Name" value={formData.First_Name} onChange={handleInputChange} />
//                   <Input name="Last_Name" placeholder="Last Name" value={formData.Last_Name} onChange={handleInputChange} />
//                 </div>

//                 <Input name="Email_Address" type="Email_Address" placeholder="Email_Address Address" value={formData.Email_Address} onChange={handleInputChange} />
//                 <Input name="Phone_Number" placeholder="Phone Number" value={formData.Phone_Number} onChange={handleInputChange} />
//                 <Input name="Password" type="Password" placeholder="Set a Password" value={formData.Password} onChange={handleInputChange} />

//                 <Button 
//                   onClick={handleSignup} 
//                   disabled={loading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {loading ? "Creating..." : "Create Account"}
//                 </Button>

//                 {signupSuccess && (
//                   <div className="text-green-600 text-center text-sm mt-2">
//                     Account created!
//                   </div>
//                 )}
//               </div>

//               {/* Divider */}
//               <div className="mt-6 text-center">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <span className="w-full border-t border-gray-300" />
//                   </div>
//                   <div className="relative flex justify-center text-xs uppercase">
//                     <span className="bg-white px-2 text-gray-500">OR</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-center space-x-4">
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     {/* Google */}
//                     <svg width="28" height="28" viewBox="0 0 24 24" fill="#EA4335">
//                       <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
//                     </svg>
//                   </Button>
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     {/* LinkedIn */}
//                     <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2">
//                       <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
//                     </svg>
//                   </Button>
//                 </div>

//                 <div className="mt-6 text-sm text-gray-500">
//                   Already have an Account?{' '}
//                   <Link className="text-blue-600 font-normal" onClick={openLoginModal}>
//                     Login here
//                   </Link>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </div>

//       <LoginPage open={loginModalOpen} onOpenChange={setLoginModalOpen} />
//     </div>
//   );
// };

// export default SignupPage;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import LoginPage from "../pages/LoginModal";
import Image from '../assets/college2.png';
import Footer from '@/components/header/Footer';

const SignupPage = () => {
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [yearSelectOpen, setYearSelectOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email_Address: '',
    Phone_Number: '',
    Password: '',
    Gender: '',
    DOB: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, Gender: value }));
    if (errors.Gender) {
      setErrors(prev => ({ ...prev, Gender: null }));
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    // Format date as ISO string (YYYY-MM-DDT00:00:00Z)
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : '';
    setFormData(prev => ({ ...prev, DOB: formattedDate }));
    if (errors.DOB) {
      setErrors(prev => ({ ...prev, DOB: null }));
    }
  };
  
  const handleYearChange = (year) => {
    // Create a new date for the calendar view with the selected year
    const newCalendarMonth = new Date(calendarMonth);
    newCalendarMonth.setFullYear(parseInt(year));
    setCalendarMonth(newCalendarMonth);
    
    // If there's already a selected date, update it with the new year
    if (date) {
      const newDate = new Date(date);
      newDate.setFullYear(parseInt(year));
      handleDateChange(newDate);
    }
    
    setYearSelectOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.First_Name.trim()) newErrors.First_Name = 'First name is required';
    if (!formData.Last_Name.trim()) newErrors.Last_Name = 'Last name is required';
    if (!formData.Email_Address.trim()) newErrors.Email_Address = 'Email_Address is required';
    if (!formData.Phone_Number.trim()) newErrors.Phone_Number = 'Phone number is required';
    if (!formData.Password.trim()) newErrors.Password = 'Password is required';
    if (!formData.Gender) newErrors.Gender = 'Gender is required';
    if (!formData.DOB) newErrors.DOB = 'Date of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      setSignupSuccess(true);

      // Optional delay before redirect to show success message
      setTimeout(() => {
        navigate('/'); // Change to your login route if different
      }, 1500);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    setLoginModalOpen(true);
  };

  return (
    <div className='flex container max-w-7xl mx-auto px-4 py-1'>
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 flex-col justify-center items-center text-white p-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold">
            &quot;Unlock your future with<br />a Exclusive Scholarship&quot;
          </h1>
        </div>
        <div className="mt-8">
          <img 
            src={Image}
            alt="Student with book" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <div className="mx-auto w-full">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Create an Account</h2>
          <div className="border-b border-gray-200 mb-6"></div>

          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input 
                      name="First_Name" 
                      placeholder="First Name" 
                      value={formData.First_Name} 
                      onChange={handleInputChange}
                      className={errors.First_Name ? "border-red-500" : ""}
                    />
                    {errors.First_Name && <p className="text-red-500 text-xs mt-1">{errors.First_Name}</p>}
                  </div>
                  <div>
                    <Input 
                      name="Last_Name" 
                      placeholder="Last Name" 
                      value={formData.Last_Name} 
                      onChange={handleInputChange}
                      className={errors.Last_Name ? "border-red-500" : ""}
                    />
                    {errors.Last_Name && <p className="text-red-500 text-xs mt-1">{errors.Last_Name}</p>}
                  </div>
                </div>

                <div>
                  <Input 
                    name="Email_Address" 
                    type="Email_Address" 
                    placeholder="Email" 
                    value={formData.Email_Address} 
                    onChange={handleInputChange}
                    className={errors.Email_Address ? "border-red-500" : ""}
                  />
                  {errors.Email_Address && <p className="text-red-500 text-xs mt-1">{errors.Email_Address}</p>}
                </div>

                <div>
                  <Input 
                    name="Phone_Number" 
                    placeholder="Phone Number" 
                    value={formData.Phone_Number} 
                    onChange={handleInputChange}
                    className={errors.Phone_Number ? "border-red-500" : ""}
                  />
                  {errors.Phone_Number && <p className="text-red-500 text-xs mt-1">{errors.Phone_Number}</p>}
                </div>

                <div>
                  <Input 
                    name="Password" 
                    type="Password" 
                    placeholder="Set a Password" 
                    value={formData.Password} 
                    onChange={handleInputChange}
                    className={errors.Password ? "border-red-500" : ""}
                  />
                  {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password}</p>}
                </div>

                <div>
                  <Select onValueChange={handleSelectChange} value={formData.Gender}>
                    <SelectTrigger className={`w-full ${errors.Gender ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.Gender && <p className="text-red-500 text-xs mt-1">{errors.Gender}</p>}
                </div>

                <div>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!date ? 'text-gray-500' : ''} ${errors.DOB ? "border-red-500" : ""}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Date of Birth</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-2 flex justify-between items-center border-b">
                        <span className="font-medium">Select Year</span>
                        <Popover open={yearSelectOpen} onOpenChange={setYearSelectOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                              {date ? date.getFullYear() : new Date().getFullYear()}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 h-64 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-1">
                              {Array.from({ length: 100 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                  <Button 
                                    key={year}
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleYearChange(year)}
                                  >
                                    {year}
                                  </Button>
                                );
                              })}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        defaultMonth={calendarMonth}
                        month={calendarMonth}
                        onMonthChange={setCalendarMonth}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.DOB && <p className="text-red-500 text-xs mt-1">{errors.DOB}</p>}
                </div>

                <Button 
                  onClick={handleSignup} 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>

                {signupSuccess && (
                  <div className="text-green-600 text-center text-sm mt-2">
                    Account created!
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="mt-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">OR</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    {/* Google */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#EA4335">
                      <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    {/* LinkedIn */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </Button>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  Already have an Account?{' '}
                  <Link className="text-blue-600 font-normal" onClick={openLoginModal}>
                    Login here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>

      <LoginPage open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  );
};

export default SignupPage;