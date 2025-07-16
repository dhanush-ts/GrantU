import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, fetchWithAuth } from "@/api";
import {
  getMatchingFields,
  getStandardizedField,
} from "@/constants/standardizeField";

export default function MenteeRegistrationForm() {
  const [requirements, setRequirements] = useState("I want to learn");
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddInterest = (option) => {
    const standardized = getStandardizedField(option);
    if (!fieldOfInterest.includes(standardized)) {
      setFieldOfInterest([...fieldOfInterest, standardized]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const handleAddCustomInterest = () => {
    if (inputValue.trim()) {
      const standardized = getStandardizedField(inputValue);
      if (!fieldOfInterest.includes(standardized)) {
        setFieldOfInterest([...fieldOfInterest, standardized]);
      }
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleRemoveInterest = (option) => {
    setFieldOfInterest(fieldOfInterest.filter((item) => item !== option));
  };

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

        <div className="space-y-2">
          <label
            htmlFor="fieldOfInterest"
            className="block text-sm font-medium text-gray-700"
          >
            Field of Interest
          </label>

          <div className="relative">
            <div className="flex">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setInputValue(val);
                  setSuggestions(val ? getMatchingFields(val) : []);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
                placeholder="Search or add interest..."
                className="rounded-r-none"
              />
              <Button
                type="button"
                onClick={handleAddCustomInterest}
                variant="default"
                className="bg-purple-600 rounded-l-none hover:bg-purple-700"
              >
                <Check className="w-4 h-4" />
              </Button>
            </div>

            {/* Dropdown Suggestion */}
            {suggestions.length > 0 && (
              <ul className="overflow-y-auto absolute z-10 mt-1 w-full max-h-48 bg-white rounded border border-gray-200 shadow">
                {suggestions.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleAddInterest(item)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {fieldOfInterest.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="text-purple-800 bg-purple-100 border-purple-200"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(item)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

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
          <Alert className="bg-green-50 border-green-200 text-">
            <AlertDescription>
              Registration successful! You are now a mentee.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
