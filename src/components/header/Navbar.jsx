import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import LoginPage from "../../pages/LoginModal";
import { Menu, X, User } from 'lucide-react';
import MentorRegistrationForm from '../forms/MentorRegister';
import MenteeRegistrationForm from '../forms/MenteeRegister';
import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [userData, setUserData] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // const [isMentorRegistrationOpen, setIsMentorRegistrationOpen] = useState(false);
  // const [isMenteeRegistrationOpen, setIsMenteeRegistrationOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState(null); // 'mentor' | 'mentee' | null



  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { userData, setUserData, isAuthenticated, setIsAuthenticated} = useAuth()
  

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await fetch(`${api}/api/user/profile/`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsAuthenticated(true)
          } else {
            console.error("Failed to fetch user profile");
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    
    checkAuthStatus();
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await fetch(`${api}/api/user/profile/`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setIsAuthenticated(true)
          } else {
            console.error("Failed to fetch user profile");
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (data) => {
    setUserData(data.user);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserData(null);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const openMentorRegistration = () => {
    setRegistrationType('mentor');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const openMenteeRegistration = () => {
    setRegistrationType('mentee');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const closeRegistrationForm = () => {
    setRegistrationType(null);
  };
  

  return (
    <header className="container relative px-4 py-4 mx-auto max-w-7xl">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-800"
          >
            <path d="M21 10C21 13.3137 18.3137 16 15 16C11.6863 16 9 13.3137 9 10C9 6.68629 11.6863 4 15 4C18.3137 4 21 6.68629 21 10Z" fill="currentColor" />
            <path d="M3 8C3 5.79086 4.79086 4 7 4H15C17.2091 4 19 5.79086 19 8V16C19 18.2091 17.2091 20 15 20H7C4.79086 20 3 18.2091 3 16V8Z" fill="currentColor" />
            <path d="M9 14H19V18C19 19.1046 18.1046 20 17 20H9V14Z" fill="currentColor" />
            <path d="M5 14C5 13.4477 5.44772 13 6 13H10C10.5523 13 11 13.4477 11 14V17C11 17.5523 10.5523 18 10 18H6C5.44772 18 5 17.5523 5 17V14Z" fill="white" />
          </svg>
          <span className="text-xl font-bold text-blue-800">
            <Link to="/">GrantU</Link>
          </span>
        </div>
        
          {registrationType && (
            <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50">
              <div className="relative w-full max-w-md">
                <button 
                  onClick={closeRegistrationForm}
                  className="absolute top-2 right-2 p-1 text-gray-700 bg-white rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
                {registrationType === 'mentee' && <MenteeRegistrationForm onClose={closeRegistrationForm} />}
                {registrationType === 'mentor' && <MentorRegistrationForm onClose={closeRegistrationForm} />}
              </div>
            </div>
          )}


        {/* Desktop Nav */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link to="/" className={`text-blue-900 hover:text-purple-500 ${currentPath === '/' ? 'font-bold text-blue-600' : ''}`}>
            Home
          </Link>
          <Link to="/students" className={`text-blue-900 hover:text-purple-500 ${currentPath.startsWith('/students') ? 'font-bold text-blue-600' : ''}`}>
            Mentee
          </Link>
          <Link to="/mentors" className={`text-blue-900 hover:text-purple-500 ${currentPath.startsWith('/mentors') ? 'font-bold text-blue-600' : ''}`}>
            Mentors
          </Link>
          <Link to="/scholarships" className={`text-blue-900 hover:text-purple-500 ${currentPath.startsWith('/scholarships') ? 'font-bold text-blue-600' : ''}`}>
            Scholarship
          </Link>
          <Link to="/loans" className={`text-blue-900 hover:text-purple-500 ${currentPath.startsWith('/loans') ? 'font-bold text-blue-600' : ''}`}>
            Loans
          </Link>
          <Link to="/connect" className={`text-blue-900 hover:text-purple-500 ${currentPath.startsWith('/connect') ? 'font-bold text-blue-600' : ''}`}>
            Connect Now
          </Link>
        </div>

        {/* Desktop Auth Buttons / Profile */}
        <div className="hidden gap-2 items-center md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <div 
                className="flex gap-2 items-center px-3 py-2 text-blue-800 bg-blue-50 rounded-full border border-blue-200 cursor-pointer"
                onClick={toggleProfileMenu}
                onMouseEnter={() => setIsProfileMenuOpen(true)}
              >
                <div className="flex justify-center items-center w-8 h-8 text-white bg-blue-600 rounded-full">
                  {userData?.profile_image ? (
                    <img src={userData.profile_image} alt="Profile" className="object-cover w-full h-full rounded-full" />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span className="font-medium uppercase">{userData?.First_Name || userData?.Last_Name || "Profile"}</span>
              </div>

              {/* Profile Dropdown */}
              <div 
                className={`absolute right-0 top-12 w-56 bg-white shadow-lg rounded-md overflow-hidden z-40 transition-opacity ${isProfileMenuOpen ? 'opacity-100' : 'invisible opacity-0'}`}
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{userData?.name || userData?.username}</p>
                  <p className="text-sm text-gray-500 truncate">{userData?.Email_Address || userData?.Phone_Number}</p>
                </div>
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">My Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Dashboard</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50">Settings</Link>
                  {!userData?.Expertise && <button onClick={openMentorRegistration} className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-blue-50">Join as Mentor</button>}
                  {!userData?.Requirements && <button onClick={openMenteeRegistration} className="block px-4 py-2 w-full text-left text-gray-700 hover:bg-blue-50">Join as Mentee</button>}
                  <button onClick={handleLogout} className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-50">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Button variant="outline" className="text-blue-600 border-blue-800 hover:bg-purple-500 hover:text-white" onClick={() => setLoginModalOpen(true)}>Login</Button>
              <Button className="bg-violet-500 hover:bg-violet-600">
                <Link to="/signup">SignUp</Link>
              </Button>
            </>
          )}
        </div>
        {/* {isMentorRegistrationOpen && (
          <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
            <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
              <button
                onClick={() => setIsMentorRegistrationOpen(false)}
                className="absolute top-4 right-4 text-gray-600"
              >
                <X size={24} />
              </button>
              <MentorRegistrationForm />
            </div>
          </div>
        )}
        {isMenteeRegistrationOpen && (
          <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
            <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
              <button
                onClick={() => setIsMentorRegistrationOpen(false)}
                className="absolute top-4 right-4 text-gray-600"
              >
                <X size={24} />
              </button>
              <MenteeRegistrationForm />
            </div>
          </div>
        )} */}

        {/* Mobile Hamburger Button */}
        <button className="text-blue-800 md:hidden focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex absolute right-0 left-0 top-16 z-50 flex-col px-4 py-4 bg-white shadow-md md:hidden">
          <div className="flex flex-col mb-6 space-y-4">
            <Link to="/" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath === '/' ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Home</Link>
            <Link to="/students" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/students') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Mentee</Link>
            <Link to="/mentors" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/mentors') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Mentors</Link>
            <Link to="/scholarships" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/scholarships') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Scholarship providers</Link>
            <Link to="/loans" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/loans') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Loans</Link>
            <Link to="/connect" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/connect') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Connect Now</Link>
          </div>

          {/* Mobile Auth Buttons / Profile */}
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <div className="p-3 rounded-md border">
                <div className="flex gap-2 items-center mb-3">
                  <div className="flex justify-center items-center w-8 h-8 text-white bg-blue-600 rounded-full">
                    <User size={16} />
                  </div>
                  <span className="font-medium text-blue-800 uppercase">{userData?.First_Name || userData?.Last_Name || "Profile"}</span>
                </div>
                <div className="flex flex-col pt-2 space-y-2 border-t">
                  <Link to="/profile" className="py-2 text-gray-700" onClick={toggleMenu}>My Profile</Link>
                  <Link to="/dashboard" className="py-2 text-gray-700" onClick={toggleMenu}>Dashboard</Link>
                  <button onClick={handleLogout} className="py-2 text-left text-red-600">Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="w-full text-blue-600 border-blue-800 hover:bg-purple-500 hover:text-white" onClick={() => { setLoginModalOpen(true); toggleMenu(); }}>Login</Button>
                <Button className="w-full bg-violet-500 hover:bg-violet-600" onClick={toggleMenu}>
                  <Link to="/signup">SignUp</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <LoginPage open={loginModalOpen} onOpenChange={setLoginModalOpen} onLoginSuccess={handleLoginSuccess} />
    </header>
  );
};

export default Navbar;
