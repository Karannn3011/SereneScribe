import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../api/apiService"; // Adjust path as needed
import NavBar from "@/components/Landing/NavBar";
import regbgpc from "../assets/regbg.webp";
import regbgmob from "../assets/regbgpc.webp"
import { useBreakpoint } from "@/hook/useBreakpoint";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    api: ''
  });
  
  // New state for the loading spinner
  const [isLoading, setIsLoading] = useState(false);
  
      
const backgroundImage = isMobile ? regbgmob : regbgpc;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ username: '', email: '', password: '', api: '' }); // Reset errors

    if (password.length < 6) {
        setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters long." }));
        return; // Stop the submission
    }

    setIsLoading(true); // --- 2. START SPINNER ---
    try {
      await registerService(username, email, password);
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err.response?.data || "Registration failed. Please try again.";
      setErrors(prev => ({ ...prev, api: errorMessage }));
    } finally {
      setIsLoading(false); // --- 3. STOP SPINNER ---
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex bg-cover bg-no-repeat items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <form
          onSubmit={handleRegister}
          className="p-8 bg-white md:w-[30%] shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Your Account
          </h2>

          {errors.api.length > 0 && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{errors.api}</span>
            </div>
          )}

          <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="your_username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

           <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />

            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 mt-5 h-5 w-5 animate-spin" />
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
