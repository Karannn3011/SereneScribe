import { loginService, getMe } from "@/api/apiService";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

// Define the shape of the user object
interface User {
  id: string;
  username: string;
  email: string;
}

// Define the type for the context value provided to consumers
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Simplified from User | null | undefined
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthLoading: boolean;
}

// Define the type for the AuthProvider's props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with an initial undefined value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create the provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await getMe(token);
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout(); // Clears all auth state if token is invalid
        }
      }
      setIsAuthLoading(false);
    };

    validateToken();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await loginService(email, password);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        isLoading,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
