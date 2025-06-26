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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { api } from '@/api';



const LoginModal = ({ open, onOpenChange, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError('');
    
    try {
      const response = await fetch(`${api}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error("Server returned an invalid response format");
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login success:", data);
      localStorage.setItem("token", data.token);
      window.location.reload();

      onLoginSuccess(data);
      onOpenChange(false);
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
          <DialogTitle className="text-center text-xl font-bold text-blue-800">LOGIN</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
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

          <div className="text-center text-sm mt-4">
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
