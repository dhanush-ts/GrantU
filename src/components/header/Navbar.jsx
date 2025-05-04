import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import LoginPage from "../../pages/LoginModal";
import { Menu, X, User } from 'lucide-react';
import MentorRegistrationForm from '../forms/MentorRegister';
import MenteeRegistrationForm from '../forms/MenteeRegister';

const Navbar = ({userData, setUserData}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userData, setUserData] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // const [isMentorRegistrationOpen, setIsMentorRegistrationOpen] = useState(false);
  // const [isMenteeRegistrationOpen, setIsMenteeRegistrationOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState(null); // 'mentor' | 'mentee' | null



  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        setIsAuthenticated(true);
        try {
          const response = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json"
            },
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            console.log("Fetched user profile:", data);
          } else {
            console.error("Failed to fetch user profile");
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setUserData(data.user);
    localStorage.setItem('authToken', data.token);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserData(null);
    setIsProfileMenuOpen(false);
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
    <header className="container max-w-7xl mx-auto px-4 py-4 relative">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
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
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="max-w-md w-full relative">
                <button 
                  onClick={closeRegistrationForm}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
                {registrationType === 'mentee' && <MenteeRegistrationForm onClose={closeRegistrationForm} />}
                {registrationType === 'mentor' && <MentorRegistrationForm onClose={closeRegistrationForm} />}
              </div>
            </div>
          )}


        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
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
        </div>

        {/* Desktop Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-800 cursor-pointer"
                onClick={toggleProfileMenu}
                onMouseEnter={() => setIsProfileMenuOpen(true)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {userData?.profile_image ? (
                    <img src={userData.profile_image} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span className="font-medium uppercase">{userData?.First_Name || userData?.Last_Name || "Profile"}</span>
              </div>

              {/* Profile Dropdown */}
              <div 
                className={`absolute right-0 top-12 w-56 bg-white shadow-lg rounded-md overflow-hidden z-10 transition-opacity ${isProfileMenuOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{userData?.name || userData?.username}</p>
                  <p className="text-sm text-gray-500 truncate">{userData?.Email_Address || userData?.Phone_Number}</p>
                </div>
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">My Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">Dashboard</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">Settings</Link>
                  {!userData?.Expertise && <button onClick={openMentorRegistration} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">Join as Mentor</button>}
                  {!userData?.Requirements && <button onClick={openMenteeRegistration} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700">Join as Mentee</button>}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Button variant="outline" className="border-blue-800 text-blue-600 hover:bg-purple-500 hover:text-white" onClick={() => setLoginModalOpen(true)}>Login</Button>
              <Button className="bg-violet-500 hover:bg-violet-600">
                <Link to="/signup">SignUp</Link>
              </Button>
            </>
          )}
        </div>
        {/* {isMentorRegistrationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
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
        <button className="md:hidden text-blue-800 focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 right-0 z-50 shadow-md py-4 px-4 flex flex-col">
          <div className="flex flex-col space-y-4 mb-6">
            <Link to="/" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath === '/' ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Home</Link>
            <Link to="/students" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/students') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Mentee</Link>
            <Link to="/mentors" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/mentors') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Mentors</Link>
            <Link to="/scholarships" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/scholarships') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Scholarship providers</Link>
            <Link to="/loans" className={`text-blue-900 hover:text-purple-500 py-2 ${currentPath.startsWith('/loans') ? 'font-bold text-blue-600' : ''}`} onClick={toggleMenu}>Loans</Link>
          </div>

          {/* Mobile Auth Buttons / Profile */}
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <div className="border rounded-md p-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                  <span className="font-medium text-blue-800 uppercase">{userData?.First_Name || userData?.Last_Name || "Profile"}</span>
                </div>
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Link to="/profile" className="text-gray-700 py-2" onClick={toggleMenu}>My Profile</Link>
                  <Link to="/dashboard" className="text-gray-700 py-2" onClick={toggleMenu}>Dashboard</Link>
                  <button onClick={handleLogout} className="text-left text-red-600 py-2">Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="border-blue-800 text-blue-600 hover:bg-purple-500 hover:text-white w-full" onClick={() => { setLoginModalOpen(true); toggleMenu(); }}>Login</Button>
                <Button className="bg-violet-500 hover:bg-violet-600 w-full" onClick={toggleMenu}>
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
