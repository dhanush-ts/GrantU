import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { api, fetchWithAuth } from '@/api';
import { PassField } from '@/constants/PassField';
import { useAuth } from '@/context/AuthContext';



const LoginModal = ({ open, onOpenChange, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, verifyUser} = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError('');
    
    try {
      const response = await fetchWithAuth("/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

      const contentType = response.headers.get("Content-Type") || "";
      
      let data;
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else { 
        const text = await response.text();
        console.log(text);
        throw new Error("Server returned an invalid response format");
      }

      console.log("Login success:", data);
      localStorage.setItem("authToken", data.token);
      if(data.verified){
        verifyUser()
      }

      onLoginSuccess(data);
      onOpenChange(false);
      setIsAuthenticated(true);
      if(!data.verified){
        navigate('/verify-otp');
        return;
      }
      navigate('/scholarships');
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-blue-800">LOGIN</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {error && <div className="text-sm text-center text-red-500">{error}</div>}
          
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <div className="relative">
            {/* <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button> */}
            <PassField password={password} setPassword={setPassword} />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-1/2 text-white bg-blue-600 hover:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          <div className="text-xs text-center text-gray-500">
            By logging in, you agree to our{" "}
            <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
            <a href="#" className="text-blue-600">Privacy Policy</a>
          </div>

          <div className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600"
              onClick={() => onOpenChange(false)}
            >
              Create a new account
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
