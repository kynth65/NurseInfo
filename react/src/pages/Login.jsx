import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import Navbar from "../components/Navbar";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            const response = await axiosClient.post("/login", {
                email,
                password,
            });

            setUser(response.data.user);
            setToken(response.data.token);
            navigate("/dashboard");
        } catch (error) {
            const response = error.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({
                        email: [response.data.message],
                    });
                }
            } else {
                setErrors({
                    email: ["Server error. Please try again later."],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full">
                    {/* Login card */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Card header */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 md:py-10">
                            <h2 className="text-2xl font-bold text-white text-center">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-purple-100 text-center">
                                Sign in to your BHIS account
                            </p>
                        </div>

                        {/* Form section */}
                        <div className="px-6 py-8 md:px-8">
                            {errors && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6 text-sm">
                                    {Object.keys(errors).map((key) => (
                                        <p
                                            key={key}
                                            className="flex items-center"
                                        >
                                            <span className="mr-2">•</span>
                                            {errors[key][0]}
                                        </p>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="you@example.com"
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
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-purple-600 hover:text-purple-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
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
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="text-center text-sm text-gray-600">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/signup"
                                            className="font-medium text-purple-600 hover:text-purple-500 flex items-center justify-center space-x-1 mt-2"
                                        >
                                            <span>Create a new account</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative dots */}
                    <div className="hidden lg:block absolute top-0 right-0 mt-32 mr-32">
                        <div className="grid grid-cols-3 gap-1">
                            {Array(9)
                                .fill()
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 rounded-full bg-purple-200"
                                    ></div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
