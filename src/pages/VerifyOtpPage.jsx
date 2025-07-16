import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api, fetchWithAuth } from '@/api';
import OTPInput from '@/constants/OTP_Ui';
import { useAuth } from '@/context/AuthContext';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { verifyUser } = useAuth();

  const handleVerify = async () => {
    console.log("OTP being sent:", otp);
    setError('');
    try {
      const res = await fetchWithAuth(`${api}/api/auth/register-verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'OTP verification failed');

      setMessage('OTP Verified!');
      verifyUser();
      setTimeout(() => navigate('/'), 1500); // or your home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 mx-auto max-w-7xl min-h-screen bg-gradient-to-br from-purple-500 to-blue-400">
      <Card className="w-full max-w-md bg-white shadow-lg shadow-purple-500">
        <CardContent className="p-6 space-y-6">
          <img src="https://socialapps.tech/sites/default/files/nodeicon/plugins_email-verification-plugin.png" alt="email_img" className='mx-auto w-32'/>
          <h2 className="text-xl font-semibold text-center text-purple-800">Verify Your Email Address</h2>
          <p className="text-sm text-center text-gray-600">
            Enter the OTP sent to your email to complete signup.
          </p>
          {/* <Input 
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          /> */}
          <OTPInput
            length={6}
            setOtpInParent={setOtp}
          />

          <Button 
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleVerify}
          >
            Verify OTP
          </Button>


          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          {/* <Button 
            className="w-full text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleVerify}
          >
            Verify OTP
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpPage;
