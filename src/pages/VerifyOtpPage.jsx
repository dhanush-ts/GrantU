"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchWithAuth } from "@/api"
import OTPInput from "@/constants/OTP_Ui"
import { useAuth } from "@/context/AuthContext"
import { Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const navigate = useNavigate()
  const { verifyUser } = useAuth()

  // Timer for resend button
  useEffect(() => {
    let interval
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !isVerifying) {
      handleVerify()
    }
  }, [otp])

  const handleVerify = async () => {
    if (otp.length !== 6) return

    console.log("OTP being sent:", otp)
    setError("")
    setMessage("")
    setIsVerifying(true)

    try {
      const res = await fetchWithAuth(`/auth/register-verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ otp }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "OTP verification failed")

      setMessage("OTP Verified Successfully!")
      verifyUser()
      setTimeout(() => navigate("/"), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
  setIsResending(true)
  setError("")
  setMessage("")

  try {
    const res = await fetchWithAuth(`/auth/resend-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || "Failed to resend OTP")

    setMessage("OTP sent successfully!")
    setResendTimer(60) // 60 second cooldown
    setTimeout(() => setMessage(""), 3000)
  } catch (err) {
    setError(err.message)
  } finally {
    setIsResending(false)
  }
}

  return (
    <div className="flex justify-center items-center px-4 mx-auto max-w-7xl min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
              <p className="text-sm text-gray-600 mt-2">Enter the 6-digit code sent to your email address</p>
            </div>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <OTPInput length={6} setOtpInParent={setOtp} isLoading={isVerifying} />

            {/* Loading indicator */}
            {isVerifying && (
              <div className="flex items-center justify-center space-x-2 text-indigo-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Verifying...</span>
              </div>
            )}
          </div>

          {/* Messages */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {message && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          {/* Resend Section */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">{"Didn't receive the code?"}</p>
            <Button
              variant="outline"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || isResending}
              className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : resendTimer > 0 ? (
                `Resend in ${resendTimer}s`
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>

          {/* Manual Verify Button (backup) */}
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyOtpPage
