import { toast } from "sonner";

// export const api = "http://localhost:8000/api";
export const api = "https://aibackend-preprod.grantu.education/api";

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  console.log(options.body)

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}${url}`, {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? options.body : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast(JSON.stringify(errorData));
    throw new Error(errorData.detail || "Request failed");
  }

  return response;
};