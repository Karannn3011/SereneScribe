import axios from "axios";

// =================================================================
// TYPE DEFINITIONS
// =================================================================

// Defines the shape of the User object received from the backend DTO
interface JournalEntry {
  id: string;
  text: string;
  mood: number;
  energy: number;
  stress: number;
  dominantEmotion: string;
  createdAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  number: number; // current page number
  size: number;
  totalElements: number;
}
// Defines the shape of the response from the /login endpoint
interface LoginResponse {
  token: string;
  user: User;
}

// Defines the shape of a new journal entry to be sent to the backend
interface NewEntryData {
  text: string;
  mood: number;
  energy: number;
  stress: number;
}

// =================================================================
// AXIOS INSTANCE
// =================================================================

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Your backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// =================================================================
// AUTHENTICATION API FUNCTIONS
// =================================================================

export const registerService = (
  username: string,
  email: string,
  password: string
) => {
  return apiClient.post("/auth/register", { username, email, password });
};

export const loginService = (email: string, password: string) => {
  return apiClient.post<LoginResponse>("/auth/login", { email, password });
};

export const getMe = (token: string) => {
  return apiClient.get<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =================================================================
// JOURNAL ENTRY API FUNCTIONS (PROTECTED)
// =================================================================

export const createEntry = (entryData: NewEntryData, token: string) => {
  return apiClient.post("/entries", entryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEntries = (token: string, page: number, size: number) => {
  return apiClient.get<Page<JournalEntry>>("/entries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page - 1, // Spring Boot pages are 0-indexed, UI is 1-indexed
      size,
    },
  });
};

export const deleteEntry = (entryId: string, token: string) => {
  return apiClient.delete(`/entries/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
