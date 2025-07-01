import { useRef, useState, useEffect } from 'react';

export default function OTPInput({ length = 6, setOtpInParent }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    const fullOtp = otp.join('');
    setOtpInParent?.(fullOtp); // Sync to parent when OTP changes
  }, [otp]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className="w-12 h-12 text-xl text-center rounded border"
        />
      ))}
    </div>
  );
}
