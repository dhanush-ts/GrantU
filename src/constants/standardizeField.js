import { FIELD_KEYWORDS_MAP } from "@/constants/fieldsOfInterest";

// Return list of matching standardized fields for input
export const getMatchingFields = (input) => {
  const lower = input.toLowerCase().trim();
  if (!lower) return [];

  const matches = [];

  for (const [standard, keywords] of Object.entries(FIELD_KEYWORDS_MAP)) {
    if (
      standard.toLowerCase().includes(lower) ||
      keywords.some(keyword => keyword.includes(lower))
    ) {
      matches.push(standard);
    }
  }

  return matches;
};

// Fallback when no match
export const getStandardizedField = (input) => {
  const lower = input.toLowerCase().trim();
  for (const [standard, keywords] of Object.entries(FIELD_KEYWORDS_MAP)) {
    if (
      standard.toLowerCase() === lower ||
      keywords.includes(lower)
    ) {
      return standard;
    }
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
};
