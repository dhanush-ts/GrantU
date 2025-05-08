import { useState } from "react";
import { X, Check } from "lucide-react";
import { api } from "@/api";

export default function MentorRegistrationForm() {
  const [expertise, setExpertise] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [organizationDetail, setOrganizationDetail] = useState("");
  const [inputValue, setInputValue] = useState("");

  const expertiseOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Product Management",
    "Digital Marketing"
  ];

  const filteredOptions = expertiseOptions.filter(
    option => !expertise.includes(option) && 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddExpertise = (option) => {
    setExpertise([...expertise, option]);
    setInputValue("");
  };
  
  const handleAddCustomExpertise = () => {
    if (inputValue && !expertise.includes(inputValue)) {
      setExpertise([...expertise, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveExpertise = (option) => {
    setExpertise(expertise.filter(item => item !== option));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // Reset states
    setError("");
    setIsSubmitting(true);
    
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please login first.');
      }
      
      const response = await fetch(`${api}/api/auth/mentor/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          Expertise: expertise,
          Years_of_Experience: yearsOfExperience,
          organization_detail: organizationDetail
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-600 text-center mb-6">Join as a Mentor</h2>
      <p className="text-center text-gray-600 mb-6">Start your journey with GrantU</p>
      
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
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomExpertise();
                  }
                }}
                placeholder="Search or add expertise..."
                className="w-full p-2 border border-gray-300 rounded-l focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomExpertise}
                className="bg-purple-600 text-white px-3 rounded-r hover:bg-purple-700"
              >
                <Check size={18} />
              </button>
            </div>
            {inputValue && filteredOptions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
                {filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleAddExpertise(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            {inputValue && filteredOptions.length === 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                <div className="p-2 hover:bg-purple-100 cursor-pointer" onClick={handleAddCustomExpertise}>
                  Add "{inputValue}"
                </div>
              </div>
            )}
          </div>
          
          {/* Selected expertise tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="inline-flex items-center bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveExpertise(item)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X size={14} />
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
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
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex justify-center items-center`}
        >
          {isSubmitting ? 'Registering...' : 'Register as Mentor'}
        </button>
        
        {/* Error message */}
        {error && (
          <div className="mt-3 text-red-600 text-center text-sm">
            {error}
          </div>
        )}
        
        {/* Success message */}
        {success && (
          <div className="mt-3 text-green-600 text-center text-sm">
            Registration successful! You are now registered as a mentor.
          </div>
        )}
      </div>
    </div>
  );
}