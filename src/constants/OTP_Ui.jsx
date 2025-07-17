"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"


export default function OTPInput({ length = 6, setOtpInParent, isLoading = false }) {
  const [otp, setOtp] = useState(new Array(length).fill(""))
  const [activeIndex, setActiveIndex] = useState(0)
  const inputsRef = useRef([])

  useEffect(() => {
    const fullOtp = otp.join("")
    setOtpInParent?.(fullOtp)
  }, [otp, setOtpInParent])

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < length - 1) {
      setActiveIndex(index + 1)
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        setActiveIndex(index - 1)
        inputsRef.current[index - 1]?.focus()
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveIndex(index - 1)
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveIndex(index + 1)
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain")
    const pastedDigits = pastedData.replace(/\D/g, "").slice(0, length)

    if (pastedDigits.length > 0) {
      const newOtp = new Array(length).fill("")
      for (let i = 0; i < pastedDigits.length; i++) {
        newOtp[i] = pastedDigits[i]
      }
      setOtp(newOtp)

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedDigits.length, length - 1)
      setActiveIndex(nextIndex)
      inputsRef.current[nextIndex]?.focus()
    }
  }

  const handleFocus = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          ref={(el) => (inputsRef.current[index] = el)}
          disabled={isLoading}
          className={cn(
            "w-12 h-12 text-xl font-semibold text-center rounded-lg border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            "hover:border-indigo-300",
            activeIndex === index && "border-indigo-500 ring-2 ring-indigo-200",
            digit && "border-indigo-400 bg-indigo-50",
            isLoading && "opacity-50 cursor-not-allowed",
            !digit && !isLoading && "border-gray-300 bg-white",
          )}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}
