import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import Navbar from "../components/Navbar";
import {
    User,
    Mail,
    Lock,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";

export default function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (passwordRef.current.value.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        const payload = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                console.error("Signup error:", error);
                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "An error occurred during signup";
                setError(message);

                // If there are validation errors, show the first one
                if (error.response?.data?.errors) {
                    const firstError = Object.values(
                        error.response.data.errors
                    )[0];
                    setError(
                        Array.isArray(firstError) ? firstError[0] : firstError
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full relative">
                    {/* Signup Card */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Card header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 md:py-10">
                            <h2 className="text-2xl font-bold text-white text-center">
                                Create Your Account
                            </h2>
                            <p className="mt-2 text-purple-100 text-center">
                                Join the BHIS healthcare community
                            </p>
                        </div>

                        {/* Form section */}
                        <div className="px-6 py-8 md:px-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            ref={usernameRef}
                                            type="text"
                                            id="username"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            id="email"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            id="password"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Minimum 8 characters"
                                            required
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Password must be at least 8 characters
                                        long
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CheckCircle className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            ref={confirmPasswordRef}
                                            type="password"
                                            id="confirmPassword"
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Re-enter password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        I agree to the{" "}
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-500"
                                        >
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:text-purple-500"
                                        >
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        loading
                                            ? "bg-purple-400 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    } transition duration-150 ease-in-out`}
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 flex items-center justify-center">
                                <ArrowLeft className="h-4 w-4 text-gray-500 mr-2" />
                                <p className="text-center text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium text-purple-600 hover:text-purple-500"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="hidden lg:block absolute -bottom-10 -left-10 w-20 h-20">
                        <div className="transform rotate-45 w-full h-full bg-purple-100 rounded-lg"></div>
                    </div>
                    <div className="hidden lg:block absolute -top-6 -right-6">
                        <div className="w-12 h-12 rounded-full bg-indigo-100"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
``;
