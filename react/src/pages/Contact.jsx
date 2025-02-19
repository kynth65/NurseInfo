import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setStatus("success");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
                        Have questions about BHIS? We're here to help.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Our team is ready to answer your questions about
                            implementing the Barangay Health Information System
                            in your community.
                        </p>

                        <div className="space-y-6">
                            <ContactItem
                                icon={
                                    <Phone className="h-6 w-6 text-purple-600" />
                                }
                                title="Phone"
                                content={[
                                    "+63 (2) 8123 4567",
                                    "+63 917 123 4567 (Mobile)",
                                ]}
                            />

                            <ContactItem
                                icon={
                                    <Mail className="h-6 w-6 text-purple-600" />
                                }
                                title="Email"
                                content={["info@bhis.ph", "support@bhis.ph"]}
                            />

                            <ContactItem
                                icon={
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                }
                                title="Office Address"
                                content={[
                                    "BHIS Innovation Center",
                                    "123 Health Technology Avenue",
                                    "Quezon City, Metro Manila, Philippines",
                                ]}
                            />

                            <ContactItem
                                icon={
                                    <Clock className="h-6 w-6 text-purple-600" />
                                }
                                title="Operating Hours"
                                content={[
                                    "Monday - Friday: 8:00 AM - 5:00 PM",
                                    "Saturday: 9:00 AM - 12:00 PM",
                                    "Closed on Sundays and Holidays",
                                ]}
                            />
                        </div>

                        {/* Social Media */}
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Connect With Us
                            </h3>
                            <div className="flex space-x-4">
                                <SocialButton icon="facebook" />
                                <SocialButton icon="twitter" />
                                <SocialButton icon="linkedin" />
                                <SocialButton icon="youtube" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send us a Message
                            </h2>

                            {status === "success" ? (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start mb-6">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-green-800">
                                            Message Sent Successfully!
                                        </h3>
                                        <p className="mt-2 text-sm text-green-700">
                                            Thank you for contacting us. We'll
                                            get back to you within 24-48 hours.
                                        </p>
                                    </div>
                                </div>
                            ) : status === "error" ? (
                                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start mb-6">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-medium text-red-800">
                                            Something went wrong
                                        </h3>
                                        <p className="mt-2 text-sm text-red-700">
                                            Please try again or contact us
                                            directly via phone or email.
                                        </p>
                                    </div>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Juan Dela Cruz"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="juan@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="Please provide details about your inquiry..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white 
                  ${
                      loading
                          ? "bg-purple-400"
                          : "bg-purple-600 hover:bg-purple-700"
                  } 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out`}
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
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-96 bg-gray-200 mt-16">
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">
                            Interactive map would be displayed here
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactItem({ icon, title, content }) {
    return (
        <div className="flex">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <div className="mt-1 text-gray-600">
                    {content.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SocialButton({ icon }) {
    const getIcon = () => {
        switch (icon) {
            case "facebook":
                return (
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "twitter":
                return (
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                );
            case "linkedin":
                return (
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "youtube":
                return (
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <a
            href="#"
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition duration-150 ease-in-out"
        >
            {getIcon()}
        </a>
    );
}
