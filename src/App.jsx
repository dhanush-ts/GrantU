import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import Mentee from './pages/MenteePage';
import Mentor from './pages/MentorPage';
import Scholarship from './pages/Scholarship';
import About from './pages/static/About';
import Contact from './pages/static/Contact';
import ProfilePage from './pages/Profile';
import VerifyOtpPage from './pages/VerifyOtpPage';
import LoginModal from './pages/LoginModal';
import { useAuth } from './context/AuthContext';
import MentorshipPlatform  from './pages/ConnectPage';
import robot from './assets/robot.json'
import { Player } from '@lottiefiles/react-lottie-player';
import ChatPopup from './components/home/ChatPopup';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from './api';


function App() {
  const { userData, setUserData, loginModalOpen, setLoginModalOpen, isVerified, isAuthenticated } = useAuth();
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLoginSuccess={(data) => setUserData(data)}
      />

      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

      <div onClick={() => setShowChat(true)} className="fixed bottom-10 right-10 w-14 h-14 md:bottom-20 md:right-20 z-40 cursor-pointer md:w-20 md:h-20">
        <Player
          autoplay
          loop
          src={robot}
          style={{ height: '200%', width: '200%' }}
        />
      </div>


      <div className="flex flex-col min-h-screen">
        <Navbar onOpenLogin={() => setLoginModalOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage data={userData} onOpenLogin={() => setLoginModalOpen(true)} />} />
            <Route path="/signup" element={<SignupPage onOpenLogin={() => setLoginModalOpen(true)} />} />
            <Route path="/students" element={<Mentee userData={userData} setUserData={setUserData} />} />
            <Route path="/mentors" element={<Mentor userData={userData} setUserData={setUserData} />} />
            <Route path="/scholarships" element={<Scholarship />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connect" element={<MentorshipPlatform />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;