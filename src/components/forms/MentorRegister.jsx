import { useState } from "react";
import { X, Check } from "lucide-react";
import { api, fetchWithAuth } from "@/api";
import { getMatchingFields, getStandardizedField } from "@/constants/standardizeField";

export default function MentorRegistrationForm() {
  const [expertise, setExpertise] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [organizationDetail, setOrganizationDetail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleAddExpertise = (option) => {
    const standardized = getStandardizedField(option);
    if (!expertise.includes(standardized)) {
      setExpertise([...expertise, standardized]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const handleAddCustomExpertise = () => {
    if (inputValue.trim()) {
      const standardized = getStandardizedField(inputValue);
      if (!expertise.includes(standardized)) {
        setExpertise([...expertise, standardized]);
      }
      setInputValue("");
      setSuggestions([]);
    }
  };

  const handleRemoveExpertise = (option) => {
    setExpertise(expertise.filter(item => item !== option));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please login first.");
      }

      const response = await fetchWithAuth(`/user/mentor/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          Expertise: expertise,
          Years_of_Experience: yearsOfExperience,
          organization_detail: organizationDetail
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
    <div className="p-6 mx-auto w-full max-w-md bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center text-purple-600">Join as a Mentor</h2>
      <p className="mb-6 text-center text-gray-600">Start your journey with GrantU</p>

      <div className="space-y-4">
        {/* Expertise Multiselect */}
        <div className="space-y-2">
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
            Expertise
          </label>
          <div className="relative">
            <div className="flex">
              <input
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
                    handleAddCustomExpertise();
                  }
                }}
                placeholder="Search or add expertise..."
                className="p-2 w-full rounded-l border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={handleAddCustomExpertise}
                className="px-3 text-white bg-purple-600 rounded-r hover:bg-purple-700"
              >
                <Check size={18} />
              </button>
            </div>

            {/* Dropdown Suggestion */}
            {suggestions.length > 0 && (
              <ul className="overflow-auto absolute z-10 mt-1 w-full max-h-60 bg-white rounded border border-gray-300 shadow-lg">
                {suggestions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleAddExpertise(option)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-purple-100"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected expertise tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2 py-1 text-sm text-purple-800 bg-purple-100 rounded"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveExpertise(item)}
                  className="ml-1 text-purple-600 hover:text-purple-800 group"
                >
                  <X size={14} className="group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
            type="text"
            id="yearsOfExperience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="p-2 w-full rounded border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Organization Detail */}
        <div>
          <label htmlFor="organizationDetail" className="block text-sm font-medium text-gray-700">
            Organization Detail
          </label>
          <input
            type="text"
            id="organizationDetail"
            value={organizationDetail}
            onChange={(e) => setOrganizationDetail(e.target.value)}
            className="p-2 w-full rounded border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex justify-center items-center`}
        >
          {isSubmitting ? "Registering..." : "Register as Mentor"}
        </button>

        {error && <div className="mt-3 text-sm text-center text-red-600">{error}</div>}
        {success && <div className="mt-3 text-sm text-center text-green-600">Registration successful! You are now registered as a mentor.</div>}
      </div>
    </div>
  );
}
