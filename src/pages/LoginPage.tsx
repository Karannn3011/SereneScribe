import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '@/components/Landing/NavBar';
import { Loader2 } from 'lucide-react';
import loginbg from ".././assets/loginbg.webp"
import loginbgpc from ".././assets/loginbgpc.webp"
import { useBreakpoint } from '../hook/useBreakpoint';


const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isMobile } = useBreakpoint();

    
    const backgroundImage = isMobile ? loginbg : loginbgpc;

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        api: '' // For general login failure messages
    });

    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 2. Simple validation check
        const validationErrors = { email: '', password: '', api: '' };
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            validationErrors.email = 'Email address is required.';
        }
        if (!password) {
            formIsValid = false;
            validationErrors.password = 'Password is required.';
        }

        setErrors(validationErrors);

        // 3. If the form is not valid, stop here
        if (!formIsValid) {
            return;
        }

        // --- If validation passes, proceed with login ---
        const success = await login(email, password);

        if (success) {
            navigate('/dashboard');
        } else {
            // Set the API error from the context
            setErrors({ ...validationErrors, api: 'Login failed. Please check your credentials.' });
        }

    
        
    };

    return (
        <>
            <NavBar />
            <div className="bg-cover bg-no-repeat flex items-center px-4 justify-center min-h-screen bg-gray-100"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {errors.api && (
                            <p className="px-4 py-3 text-red-800 bg-red-100 border border-red-200 rounded-lg">
                                {errors.api}
                            </p>
                        )}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* 4. Conditionally render the email error message */}
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* 5. Conditionally render the password error message */}
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                // Add a class to change the cursor when disabled
                                className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                // Disable the button when isLoading is true
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex flex-row justify-center items-center">
                                        <Loader2 className="mr-2 mt-5 h-5 w-5 animate-spin" />
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default LoginPage;