import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { getMatchingFields, getStandardizedField } from "@/constants/standardizeField";

export default function FieldOfInterestSelector({ 
  value = [], 
  onChange, 
  placeholder = "Search or add interest...",
  inputClassName = "",
  buttonClassName = "",
  dropdownClassName = "",
  badgeClassName = "",
  containerClassName = "",
  showLabel = true,
  labelText = "",
  labelClassName = ""
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      setSuggestions(getMatchingFields(inputValue));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleAdd = (val) => {
    const standardized = getStandardizedField(val);
    if (!value.includes(standardized)) {
      onChange([...value, standardized]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const handleRemove = (val) => {
    onChange(value.filter((item) => item !== val));
  };

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {showLabel && (
        <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {labelText}
        </label>
      )}
      
      <div className="relative">
        <div className="flex">
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd(inputValue);
              }
            }}
            className={`rounded-r-none ${inputClassName}`}
          />
          <Button
            type="button"
            onClick={() => handleAdd(inputValue)}
            className={`rounded-l-none bg-purple-600 hover:bg-purple-700 ${buttonClassName} py-5 px-3 border rounded-r-lg`}
          >
            <Check className="w-4 h-4" />
          </Button>
        </div>

        {suggestions.length > 0 && (
          <ul className={`absolute z-10 bg-white w-full border rounded shadow mt-1 max-h-40 overflow-y-auto ${dropdownClassName}`}>
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onClick={() => handleAdd(s)}
                className="px-3 py-2 text-sm hover:bg-purple-100 cursor-pointer"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className={`text-purple-800 bg-purple-100 border-purple-200 ${badgeClassName}`}
            >
              {item}
              <button
                onClick={() => handleRemove(item)}
                className="ml-1 text-purple-600 hover:text-purple-800 group"
              >
                <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

