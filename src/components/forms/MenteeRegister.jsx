import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, fetchWithAuth } from "@/api";
import FieldOfInterestSelector from "@/constants/FieldOfInterestSelector";

export default function MenteeRegistrationForm() {
  const [requirements, setRequirements] = useState("I want to learn");
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!requirements.trim()) {
      setError("Please fill in your requirements.");
      return;
    }

    if (fieldOfInterest.length === 0) {
      setError("Please add at least one field of interest.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found. Please login first.");
      }

      const response = await fetchWithAuth(`/user/mentee/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Requirements: requirements,
          Field_of_Interest: fieldOfInterest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-600">
          Join as a Mentee
        </CardTitle>
        <CardDescription>
          Start your learning journey with GrantU
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-gray-700"
          >
            Requirements
          </label>
          <Textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>

        <FieldOfInterestSelector
          value={fieldOfInterest}
          onChange={setFieldOfInterest}
          placeholder="Search or add interest..."
          inputClassName="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          buttonClassName="h-11 w-12 border-purple-500 rounded-r-md hover:border-purple-600 focus:outline-none focus:ring-2 focus:ring"
        />

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register as Mentee"
          )}
        </Button>

        {error && (
          <Alert
            variant="destructive"
            className="text-red-600 bg-red-50 border-red-200"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200 text-green-700">
            <AlertDescription>
              Registration successful! You are now a mentee.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}