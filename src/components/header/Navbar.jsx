"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Link, useLocation } from "react-router-dom"
import LoginPage from "../../pages/LoginModal"
import { Menu, X, User, ChevronDown } from "lucide-react"
import MentorRegistrationForm from "../forms/MentorRegister"
import MenteeRegistrationForm from "../forms/MenteeRegister"
import { fetchWithAuth } from "@/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [registrationType, setRegistrationType] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { userData, setUserData, isAuthenticated, setIsAuthenticated, loginModalOpen, setLoginModalOpen } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentPath])

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken")

      if (token) {
        try {
          const response = await fetchWithAuth(`/user/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            credentials: "include",
          })

          if (response.ok) {
            const data = await response.json()
            setUserData(data)
            setIsAuthenticated(true)
          } else {
            console.error("Failed to fetch user profile")
            localStorage.removeItem("authToken")
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }
    }

    checkAuthStatus()
  }, [isAuthenticated])

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken")

      if (token) {
        try {
          const response = await fetchWithAuth(`/user/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            credentials: "include",
          })

          if (response.ok) {
            const data = await response.json()
            setUserData(data)
            setIsAuthenticated(true)
          } else {
            console.error("Failed to fetch user profile")
            localStorage.removeItem("authToken")
          }
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }
    }

    checkAuthStatus()
  }, [])

  const handleLoginSuccess = (data) => {
    setUserData(data.user)
  }

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
    setUserData(null)
    setIsProfileMenuOpen(false)
    navigate("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const openMentorRegistration = () => {
    setRegistrationType("mentor")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openMenteeRegistration = () => {
    setRegistrationType("mentee")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const closeRegistrationForm = () => {
    setRegistrationType(null)
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/students", label: "Mentee" },
    { to: "/mentors", label: "Mentors" },
    { to: "/scholarships", label: "Scholarship" },
    ...(isAuthenticated ? [{ to: "/connect", label: "Connect Now" }] : []),
  ]

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100"
            : "bg-white border-b border-purple-50"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-all duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M21 10C21 13.3137 18.3137 16 15 16C11.6863 16 9 13.3137 9 10C9 6.68629 11.6863 4 15 4C18.3137 4 21 6.68629 21 10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 8C3 5.79086 4.79086 4 7 4H15C17.2091 4 19 5.79086 19 8V16C19 18.2091 17.2091 20 15 20H7C4.79086 20 3 18.2091 3 16V8Z"
                    fill="currentColor"
                  />
                  <path d="M9 14H19V18C19 19.1046 18.1046 20 17 20H9V14Z" fill="currentColor" />
                  <path
                    d="M5 14C5 13.4477 5.44772 13 6 13H10C10.5523 13 11 13.4477 11 14V17C11 17.5523 10.5523 18 10 18H6C5.44772 18 5 17.5523 5 17V14Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">
                GrantU
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPath === link.to || (link.to !== "/" && currentPath.startsWith(link.to))
                      ? "text-purple-700 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-200 group"
                    onClick={toggleProfileMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-700 rounded-lg flex items-center justify-center">
                      {userData?.profile_image ? (
                        <img
                          src={userData.profile_image || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        <User size={16} className="text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-700">{userData?.First_Name || "Profile"}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)} />
                      <div className="absolute right-0 top-14 w-64 bg-white border border-purple-100 rounded-xl shadow-xl z-20 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
                          <p className="font-semibold text-gray-800">{userData?.name || userData?.username}</p>
                          <p className="text-sm text-gray-600 truncate">
                            {userData?.Email_Address || userData?.Phone_Number}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="block px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/settings"
                            className="block px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                          >
                            Settings
                          </Link>
                          {!userData?.Expertise && (
                            <button
                              onClick={openMentorRegistration}
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                            >
                              Join as Mentor
                            </button>
                          )}
                          {!userData?.Requirements && (
                            <button
                              onClick={openMenteeRegistration}
                              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-purple-50 transition-colors"
                            >
                              Join as Mentee
                            </button>
                          )}
                          <div className="border-t border-purple-100 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 font-medium px-6 py-2 bg-transparent"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Login
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-medium px-6 py-2 shadow-lg hover:shadow-purple-200">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-violet-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-700 rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M21 10C21 13.3137 18.3137 16 15 16C11.6863 16 9 13.3137 9 10C9 6.68629 11.6863 4 15 4C18.3137 4 21 6.68629 21 10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 8C3 5.79086 4.79086 4 7 4H15C17.2091 4 19 5.79086 19 8V16C19 18.2091 17.2091 20 15 20H7C4.79086 20 3 18.2091 3 16V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">
                GrantU
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-purple-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Profile Section (if authenticated) */}
          {isAuthenticated && (
            <div className="p-6 border-b border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center">
                  {userData?.profile_image ? (
                    <img
                      src={userData.profile_image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {userData?.First_Name || "User"} {userData?.Last_Name || ""}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{userData?.Email_Address || userData?.Phone_Number}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-purple-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-purple-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-purple-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 px-6 py-6">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentPath === link.to || (link.to !== "/" && currentPath.startsWith(link.to))
                      ? "text-purple-700 bg-gradient-to-r from-purple-100 to-violet-100"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Additional mobile links */}
              {/* <Link
                to="/scholarships"
                className="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarship Providers
              </Link> */}
              {/* <Link
                to="/loans"
                className="px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Loans
              </Link> */}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-purple-100 bg-gray-50">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                {!userData?.Expertise && (
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    onClick={() => {
                      openMentorRegistration()
                      setIsMenuOpen(false)
                    }}
                  >
                    Join as Mentor
                  </Button>
                )}
                {!userData?.Requirements && (
                  <Button
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    onClick={() => {
                      openMenteeRegistration()
                      setIsMenuOpen(false)
                    }}
                  >
                    Join as Mentee
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium bg-transparent"
                  onClick={() => {
                    setLoginModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-medium shadow-lg">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modals */}
      {registrationType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button
              onClick={closeRegistrationForm}
              className="absolute -top-2 -right-2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-10"
            >
              <X size={20} />
            </button>
            {registrationType === "mentee" && <MenteeRegistrationForm onClose={closeRegistrationForm} />}
            {registrationType === "mentor" && <MentorRegistrationForm onClose={closeRegistrationForm} />}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginPage open={loginModalOpen} onOpenChange={setLoginModalOpen} onLoginSuccess={handleLoginSuccess} />

      {/* Spacer for fixed header */}
      <div className="h-24 mb-3"></div>
    </>
  )
}

export default Navbar