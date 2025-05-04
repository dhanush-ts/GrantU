import Navbar from './components/header/Navbar';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import Mentee from './pages/MenteePage';
import Mentor from './pages/MentorPage';
import Scholarship from './pages/Scholarship';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProfilePage from './pages/Profile';
const App = () => {
 const [userData, setUserData] = useState(null); 
  return (
  
    <Router>
    <div className="min-h-screen flex flex-col">
      <Navbar userData={userData} setUserData={setUserData} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage data={userData} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/students" element={<Mentee userData={userData} setUserData={setUserData} />} />
          <Route path="/mentors" element={<Mentor userData={userData} setUserData={setUserData} />} />
          <Route path="/scholarships" element={<Scholarship />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </main>
    </div>
  </Router>
  );
};

export default App;