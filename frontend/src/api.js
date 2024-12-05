// Example: src/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Function to fetch user data
export const fetchUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "GET",
      credentials: "include", // If using cookies
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
