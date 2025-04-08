import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, Heart } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex-shrink-0 flex items-center"
                        >
                            <Heart className="h-8 w-8 text-purple-600" />
                            <span className="ml-2 text-xl font-bold text-gray-800">
                                HEAL
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="flex space-x-4">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/services">Services</NavLink>
                            <NavLink href="/about">About</NavLink>
                            <NavLink href="/contact">Contact</NavLink>
                        </div>
                    </div>

                    {/* Right side buttons */}
                    <div className="hidden sm:flex sm:items-center">
                        <Link
                            to="/login"
                            className="ml-4 px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        s{" "}
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                        >
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <MobileNavLink href="/">Home</MobileNavLink>
                        <MobileNavLink href="/services">Services</MobileNavLink>
                        <MobileNavLink href="/about">About</MobileNavLink>
                        <MobileNavLink href="/contact">Contact</MobileNavLink>
                        <div className="mt-4">
                            <Link
                                to="/login"
                                className="block w-full text-center px-4 py-2 rounded-md bg-purple-600 text-white text-base font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

// Desktop Navigation Link
function NavLink({ href, children }) {
    const isActive = window.location.pathname === href;
    return (
        <Link
            to={href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
        ${
            isActive
                ? "text-purple-700 bg-purple-50"
                : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
        }
      `}
        >
            {children}
        </Link>
    );
}

// Mobile Navigation Link
function MobileNavLink({ href, children }) {
    const isActive = window.location.pathname === href;
    return (
        <Link
            to={href}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out
        ${
            isActive
                ? "text-purple-700 bg-purple-50"
                : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
        }
      `}
        >
            {children}
        </Link>
    );
}
