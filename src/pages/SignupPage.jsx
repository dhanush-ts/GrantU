// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram, Calendar } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar as CalendarComponent } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import LoginPage from "../pages/LoginModal";
// import Image from '../assets/college2.png';
// import Footer from '@/components/header/Footer';
// import { api } from '@/api';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const [signupSuccess, setSignupSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [date, setDate] = useState();
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   const [yearSelectOpen, setYearSelectOpen] = useState(false);
//   const [calendarMonth, setCalendarMonth] = useState(new Date());
  
//   const [formData, setFormData] = useState({
//     First_Name: '',
//     Last_Name: '',
//     Email_Address: '',
//     Phone_Number: '',
//     Password: '',
//     Gender: '',
//     DOB: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleSelectChange = (value) => {
//     setFormData(prev => ({ ...prev, Gender: value }));
//     if (errors.Gender) {
//       setErrors(prev => ({ ...prev, Gender: null }));
//     }
//   };

//   const handleDateChange = (date) => {
//     setDate(date);
//     // Format date as ISO string (YYYY-MM-DDT00:00:00Z)
//     const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : '';
//     setFormData(prev => ({ ...prev, DOB: formattedDate }));
//     if (errors.DOB) {
//       setErrors(prev => ({ ...prev, DOB: null }));
//     }
//   };
  
//   const handleYearChange = (year) => {
//     // Create a new date for the calendar view with the selected year
//     const newCalendarMonth = new Date(calendarMonth);
//     newCalendarMonth.setFullYear(parseInt(year));
//     setCalendarMonth(newCalendarMonth);
    
//     // If there's already a selected date, update it with the new year
//     if (date) {
//       const newDate = new Date(date);
//       newDate.setFullYear(parseInt(year));
//       handleDateChange(newDate);
//     }
    
//     setYearSelectOpen(false);
//   };

//   const validateForm = () => {
//     const newErrors = {};
  
//     if (!formData.First_Name.trim()) newErrors.First_Name = 'First name is required';
//     if (!formData.Last_Name.trim()) newErrors.Last_Name = 'Last name is required';
  
//     if (!formData.Email_Address.trim()) {
//       newErrors.Email_Address = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email_Address)) {
//       newErrors.Email_Address = 'Invalid email format';
//     }
  
//     if (!formData.Phone_Number.trim()) {
//       newErrors.Phone_Number = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.Phone_Number)) {
//       newErrors.Phone_Number = 'Phone number must be 10 digits';
//     }
  
//     if (!formData.Password.trim()) {
//       newErrors.Password = 'Password is required';
//     } else if (formData.Password.length < 6) {
//       newErrors.Password = 'Password must be at least 6 characters';
//     }
  
//     if (!formData.Gender) newErrors.Gender = 'Gender is required';
  
//     if (!formData.DOB) {
//       newErrors.DOB = 'Date of birth is required';
//     } else {
//       const selectedDate = new Date(formData.DOB);
//       const today = new Date();
//       if (selectedDate > today) {
//         newErrors.DOB = 'Date of birth cannot be in the future';
//       }
//     }
  
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  

//   const handleSignup = async () => {
//     if (!validateForm()) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch(`${api}/api/auth/signup/`, {
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
//       console.log('Signup successful:');
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
//     <div className='container flex px-4 py-1 mx-auto max-w-7xl'>
//       {/* Left Side */}
//       <div className="hidden flex-col justify-center items-center p-10 text-white bg-gradient-to-br from-blue-400 to-purple-500 md:flex md:w-1/2">
//         <div className="mx-auto max-w-md text-center">
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
//       <div className="flex flex-col justify-center p-6 w-full md:w-1/2">
//         <div className="mx-auto w-full">
//           <h2 className="mb-4 text-2xl font-semibold text-center text-blue-600">Create an Account</h2>
//           <div className="mb-6 border-b border-gray-200"></div>

//           <Card className="border-gray-200">
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Input 
//                       name="First_Name" 
//                       placeholder="First Name" 
//                       value={formData.First_Name} 
//                       onChange={handleInputChange}
//                       className={errors.First_Name ? "border-red-500" : ""}
//                     />
//                     {errors.First_Name && <p className="mt-1 text-xs text-red-500">{errors.First_Name}</p>}
//                   </div>
//                   <div>
//                     <Input 
//                       name="Last_Name" 
//                       placeholder="Last Name" 
//                       value={formData.Last_Name} 
//                       onChange={handleInputChange}
//                       className={errors.Last_Name ? "border-red-500" : ""}
//                     />
//                     {errors.Last_Name && <p className="mt-1 text-xs text-red-500">{errors.Last_Name}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <Input 
//                     name="Email_Address" 
//                     type="Email_Address" 
//                     placeholder="Email" 
//                     value={formData.Email_Address} 
//                     onChange={handleInputChange}
//                     className={errors.Email_Address ? "border-red-500" : ""}
//                   />
//                   {errors.Email_Address && <p className="mt-1 text-xs text-red-500">{errors.Email_Address}</p>}
//                 </div>

//                 <div>
//                   <Input 
//                     name="Phone_Number" 
//                     placeholder="Phone Number" 
//                     value={formData.Phone_Number} 
//                     onChange={handleInputChange}
//                     className={errors.Phone_Number ? "border-red-500" : ""}
//                   />
//                   {errors.Phone_Number && <p className="mt-1 text-xs text-red-500">{errors.Phone_Number}</p>}
//                 </div>

//                 <div>
//                   <Input 
//                     name="Password" 
//                     type="Password" 
//                     placeholder="Set a Password" 
//                     value={formData.Password} 
//                     onChange={handleInputChange}
//                     className={errors.Password ? "border-red-500" : ""}
//                   />
//                   {errors.Password && <p className="mt-1 text-xs text-red-500">{errors.Password}</p>}
//                 </div>

//                 <div>
//                   <Select onValueChange={handleSelectChange} value={formData.Gender}>
//                     <SelectTrigger className={`w-full ${errors.Gender ? "border-red-500" : ""}`}>
//                       <SelectValue placeholder="Select Gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                       <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {errors.Gender && <p className="mt-1 text-xs text-red-500">{errors.Gender}</p>}
//                 </div>

//                 <div>
//                   <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={`w-full justify-start text-left font-normal ${!date ? 'text-gray-500' : ''} ${errors.DOB ? "border-red-500" : ""}`}
//                       >
//                         <Calendar className="mr-2 w-4 h-4" />
//                         {date ? format(date, 'PPP') : <span>Date of Birth</span>}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="p-0 w-auto" align="start">
//                       <div className="flex justify-between items-center p-2 border-b">
//                         <span className="font-medium">Select Year</span>
//                         <Popover open={yearSelectOpen} onOpenChange={setYearSelectOpen}>
//                           <PopoverTrigger asChild>
//                             <Button variant="outline" size="sm">
//                               {date ? date.getFullYear() : new Date().getFullYear()}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="overflow-y-auto w-48 h-64">
//                             <div className="grid grid-cols-3 gap-1">
//                               {Array.from({ length: 100 }, (_, i) => {
//                                 const year = new Date().getFullYear() - i;
//                                 return (
//                                   <Button 
//                                     key={year}
//                                     variant="ghost" 
//                                     size="sm"
//                                     onClick={() => handleYearChange(year)}
//                                   >
//                                     {year}
//                                   </Button>
//                                 );
//                               })}
//                             </div>
//                           </PopoverContent>
//                         </Popover>
//                       </div>
//                       <CalendarComponent
//                         mode="single"
//                         selected={date}
//                         onSelect={handleDateChange}
//                         defaultMonth={calendarMonth}
//                         month={calendarMonth}
//                         onMonthChange={setCalendarMonth}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   {errors.DOB && <p className="mt-1 text-xs text-red-500">{errors.DOB}</p>}
//                 </div>

//                 <Button 
//                   onClick={handleSignup} 
//                   disabled={loading}
//                   className="w-full text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   {loading ? "Creating..." : "Create Account"}
//                 </Button>

//                 {signupSuccess && (
//                   <div className="mt-2 text-sm text-center text-blue-600">
//                     Account created!
//                   </div>
//                 )}
//               </div>

//               {/* Divider */}
//               <div className="mt-6 text-center">

//                 <div className="mt-6 text-sm text-gray-500">
//                   Already have an Account?{' '}
//                   <Link className="font-normal text-blue-600" onClick={openLoginModal}>
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
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Image from '../assets/college2.png';
import Footer from '@/components/header/Footer';
import { PassField } from '@/constants/PassField';
import { api } from '@/api';
import { useAuth } from '@/context/AuthContext';

const SignupPage = ({onOpenLogin}) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth()
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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, Gender: value }));
    if (errors.Gender) setErrors(prev => ({ ...prev, Gender: null }));
  };

  const handleDateChange = (date) => {
    setDate(date);
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] + 'T00:00:00Z' : '';
    setFormData(prev => ({ ...prev, DOB: formattedDate }));
    if (errors.DOB) setErrors(prev => ({ ...prev, DOB: null }));
  };

  const handleYearChange = (year) => {
    const newCalendarMonth = new Date(calendarMonth);
    newCalendarMonth.setFullYear(parseInt(year));
    setCalendarMonth(newCalendarMonth);

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

    if (!formData.Email_Address.trim()) {
      newErrors.Email_Address = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email_Address)) {
      newErrors.Email_Address = 'Invalid email format';
    }

    if (!formData.Phone_Number.trim()) {
      newErrors.Phone_Number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.Phone_Number)) {
      newErrors.Phone_Number = 'Phone number must be 10 digits';
    }

    if (!formData.Password.trim()) {
      newErrors.Password = 'Password is required';
    } else if (formData.Password.length < 6) {
      newErrors.Password = 'Password must be at least 6 characters';
    }

    if (!formData.Gender) newErrors.Gender = 'Gender is required';

    if (!formData.DOB) {
      newErrors.DOB = 'Date of birth is required';
    } else {
      const selectedDate = new Date(formData.DOB);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.DOB = 'Date of birth cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/auth/register-request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok){
        if (data.error === 'User with this email already exists.') {
          alert("Account already exist, Please Login");
          onOpenLogin(); // if you have a login modal
          return;
        }
       throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('authToken', data.token); // Save for OTP verify
      setIsAuthenticated(true)
      navigate('/verify-otp');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container flex px-4 py-1 mx-auto max-w-7xl'>
      {/* Left Image Panel */}
      <div className="hidden flex-col justify-center items-center p-10 text-white bg-gradient-to-br from-blue-400 to-purple-500 md:flex md:w-1/2">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-4xl font-bold">
            &quot;Unlock your future with<br />an Exclusive Scholarship&quot;
          </h1>
        </div>
        <div className="mt-8">
          <img src={Image} alt="Student" className="w-full h-auto rounded-lg" />
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center p-6 w-full md:w-1/2">
        <div className="mx-auto w-full">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-600">Create an Account</h2>
          <div className="mb-6 border-b border-gray-200"></div>

          <Card className="border-gray-200">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input name="First_Name" placeholder="First Name" value={formData.First_Name} onChange={handleInputChange} className={errors.First_Name ? "border-red-500" : ""} />
                    {errors.First_Name && <p className="mt-1 text-xs text-red-500">{errors.First_Name}</p>}
                  </div>
                  <div>
                    <Input name="Last_Name" placeholder="Last Name" value={formData.LastName} onChange={handleInputChange} className={errors.Last_Name ? "border-red-500" : ""} />
                    {errors.Last_Name && <p className="mt-1 text-xs text-red-500">{errors.Last_Name}</p>}
                  </div>
                </div>

                <Input name="Email_Address" type="email" placeholder="Email" value={formData.Email_Address} onChange={handleInputChange} className={errors.Email_Address ? "border-red-500" : ""} />
                {errors.Email_Address && <p className="mt-1 text-xs text-red-500">{errors.Email_Address}</p>}

                <Input name="Phone_Number" placeholder="Phone Number" value={formData.Phone_Number} onChange={handleInputChange} className={errors.Phone_Number ? "border-red-500" : ""} />
                {errors.Phone_Number && <p className="mt-1 text-xs text-red-500">{errors.Phone_Number}</p>}

                {/* <Input name="Password" type="password" placeholder="Set a Password" value={formData.Password} onChange={handleInputChange} className={errors.Password ? "border-red-500" : ""} />
                {errors.Password && <p className="mt-1 text-xs text-red-500">{errors.Password}</p>} */}
                <PassField
                  isForm={true}
                  handleInputChange={handleInputChange}
                  formData={formData}
                />      



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
                {errors.Gender && <p className="mt-1 text-xs text-red-500">{errors.Gender}</p>}

                <div>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={`w-full justify-start text-left font-normal ${!date ? 'text-gray-500' : ''} ${errors.DOB ? "border-red-500" : ""}`}>
                        <Calendar className="mr-2 w-4 h-4" />
                        {date ? format(date, 'PPP') : <span>Date of Birth</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto" align="start">
                      <div className="flex justify-between items-center p-2 border-b">
                        <span className="font-medium">Select Year</span>
                        <Popover open={yearSelectOpen} onOpenChange={setYearSelectOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                              {date ? date.getFullYear() : new Date().getFullYear()}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="overflow-y-auto w-48 h-64">
                            <div className="grid grid-cols-3 gap-1">
                              {Array.from({ length: 100 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                  <Button key={year} variant="ghost" size="sm" onClick={() => handleYearChange(year)}>
                                    {year}
                                  </Button>
                                );
                              })}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <CalendarComponent mode="single" selected={date} onSelect={handleDateChange} defaultMonth={calendarMonth} month={calendarMonth} onMonthChange={setCalendarMonth} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {errors.DOB && <p className="mt-1 text-xs text-red-500">{errors.DOB}</p>}
                </div>

                <Button onClick={handleSignup} disabled={loading} className="w-full text-white bg-blue-600 hover:bg-blue-700">
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </div>

              <div className="mt-6 text-sm text-center text-gray-500">
                Already have an account? <button
                        className="font-medium text-blue-600"
                        onClick={onOpenLogin}
                      >
                        Login here
                      </button>

              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;
