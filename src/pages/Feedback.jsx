"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, Heart, MessageCircle, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { api } from "@/api"

export const Feedback = () => {
  const params = useParams()
  const token = params?.id || ""

  const [feedbackData, setFeedbackData] = useState(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch(`${api}/user/feedback/${token}/`)
        if (response.ok) {
          const data = await response.json()
          setFeedbackData(data)
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchFeedbackData()
    }
  }, [token])

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`${api}/user/feedback/${token}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comments,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-purple-700 rounded-full"></div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-purple-700/20 shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-purple-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-700 fill-current" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground">
                Your feedback has been submitted successfully. We truly appreciate your time and insights!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-purple-700/20 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-purple-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-purple-700" />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-700">We Value Your Feedback</CardTitle>
          {feedbackData && (
            <div className="mt-4 space-y-2">
              <p className="text-lg text-foreground">
                Hi <span className="font-semibold text-purple-700">{feedbackData.mentee}</span>! 👋
              </p>
              <p className="text-muted-foreground text-balance">
                Your recent call with <span className="font-medium text-foreground">{feedbackData.mentor}</span> was
                amazing. We'd love to hear about your experience and how it went!
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-purple-800">How would you rate your overall experience?</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-all duration-200 hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors duration-200",
                      hoveredRating >= star || rating >= star ? "text-purple-600 fill-current" : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 5 && "Excellent! 🌟"}
                {rating === 4 && "Great! 😊"}
                {rating === 3 && "Good! 👍"}
                {rating === 2 && "Okay 👌"}
                {rating === 1 && "Could be better 🤔"}
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div className="space-y-3">
            <label htmlFor="comments" className="text-sm font-medium text-purple-700">
              Share your thoughts (optional)
            </label>
            <Textarea
              id="comments"
              placeholder="Tell us what went well, what could be improved, or any other thoughts you'd like to share..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[120px] resize-none border-input focus:border-purple-700 focus:ring-purple-700/20"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full h-12 font-medium bg-purple-700 hover:bg-purple-700/90 disabled:opacity-50 text-white disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Feedback
              </div>
            )}
          </Button>

          {rating === 0 && (
            <p className="text-center text-sm text-muted-foreground">Please select a rating to continue</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
