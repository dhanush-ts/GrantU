// import Navbar from './components/header/Navbar';
// import LandingPage from './pages/LandingPage';
// import SignupPage from './pages/SignupPage';
// import Mentee from './pages/MenteePage';
// import Mentor from './pages/MentorPage';
// import Scholarship from './pages/Scholarship';
// import About from './pages/static/About';
// import Contact from './pages/static/Contact';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import ProfilePage from './pages/Profile';
// import VerifyOtpPage from './pages/VerifyOtpPage';

// const App = () => {
//  const [userData, setUserData] = useState(null); 
//   return (
  
//     <Router>
//     <div className="min-h-screen flex flex-col">
//       <Navbar userData={userData} setUserData={setUserData} />
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<LandingPage data={userData} />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/students" element={<Mentee userData={userData} setUserData={setUserData} />} />
//           <Route path="/mentors" element={<Mentor userData={userData} setUserData={setUserData} />} />
//           <Route path="/scholarships" element={<Scholarship />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/verify-otp" element={<VerifyOtpPage />} />
//           {/* <Route path="/login" element={<LoginPage />} /> */}
//         </Routes>
//       </main>
//     </div>
//   </Router>
//   );
// };

// export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [userData, setUserData] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <Router>
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLoginSuccess={(data) => setUserData(data)}
      />

      <div className="min-h-screen flex flex-col">
        <Navbar userData={userData} setUserData={setUserData} onOpenLogin={() => setLoginModalOpen(true)} />
        
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
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
