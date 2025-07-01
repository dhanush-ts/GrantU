import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const PassField = ({ password, setPassword = null, formData = null, isForm = false, handleInputChange = null }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {isForm ? (
        <Input
          name="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Set a Password"
          value={formData?.Password || ''}
          onChange={handleInputChange}
        />
      ) : (
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword?.(e.target.value)}
        />
      )}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};
