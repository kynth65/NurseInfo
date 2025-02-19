import React from "react";
import {
    FileText,
    Stethoscope,
    Package,
    Activity,
    Calendar,
    Users,
    Shield,
    Check,
} from "lucide-react";

import Navbar from "./Navbar";
export default function Services() {
    return (
        <>
            <Navbar />
            <div className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Barangay Health Information System
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Improve patient records, streamline services, and
                            enhance public health monitoring
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Service 1 */}
                            <ServiceCard
                                icon={
                                    <FileText className="h-8 w-8 text-purple-600" />
                                }
                                title="Patient Records Management"
                                features={[
                                    "Digital patient profiles (name, age, address, medical history)",
                                    "Immunization tracking (vaccination schedules and records)",
                                    "Maternal and child health monitoring",
                                ]}
                            />

                            {/* Service 2 */}
                            <ServiceCard
                                icon={
                                    <Stethoscope className="h-8 w-8 text-purple-600" />
                                }
                                title="Consultation & Treatment Logs"
                                features={[
                                    "Records for common barangay health services",
                                    "Doctor/nurse notes for each visit",
                                    "Referral system for serious cases (hospital transfers)",
                                ]}
                            />

                            {/* Service 3 */}
                            <ServiceCard
                                icon={
                                    <Package className="h-8 w-8 text-purple-600" />
                                }
                                title="Medicine & Supply Inventory"
                                features={[
                                    "Stock levels of essential medicines",
                                    "Automated alerts for low-stock supplies",
                                    "Dispensing records to track medicine distribution",
                                ]}
                            />

                            {/* Service 4 */}
                            <ServiceCard
                                icon={
                                    <Activity className="h-8 w-8 text-purple-600" />
                                }
                                title="Disease Surveillance & Reporting"
                                features={[
                                    "Logs for common illnesses (dengue, tuberculosis, measles)",
                                    "Automatic reports for the Department of Health (DOH)",
                                    "Early warning system for outbreaks",
                                ]}
                            />

                            {/* Service 5 */}
                            <ServiceCard
                                icon={
                                    <Calendar className="h-8 w-8 text-purple-600" />
                                }
                                title="Scheduling & Appointments"
                                features={[
                                    "Online appointment booking for consultations",
                                    "Reminders via SMS or mobile notifications",
                                ]}
                            />

                            {/* Service 6 */}
                            <ServiceCard
                                icon={
                                    <Users className="h-8 w-8 text-purple-600" />
                                }
                                title="Health Programs Management"
                                features={[
                                    "Monitoring for nutrition, family planning, deworming, TB-DOTS, etc.",
                                    "Attendance tracking for barangay health seminars",
                                ]}
                            />
                        </div>
                    </div>

                    {/* Security & Compliance */}
                    <div className="mt-16">
                        <div className="bg-purple-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="px-6 py-8 sm:p-10">
                                <div className="flex items-center">
                                    <Shield className="h-12 w-12 text-purple-600" />
                                    <h3 className="ml-4 text-2xl font-bold text-gray-900">
                                        Security & Compliance
                                    </h3>
                                </div>
                                <div className="mt-8 grid gap-6 md:grid-cols-2">
                                    <div className="flex">
                                        <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        <p className="ml-3 text-gray-700">
                                            Role-based access (only authorized
                                            staff can access patient records)
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        <p className="ml-3 text-gray-700">
                                            Compliance with Data Privacy Act of
                                            2012 (RA 10173)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Development Approach */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Development Approach
                        </h2>
                        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="px-6 py-8 sm:p-10 space-y-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Technology Stack
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Web-based or mobile app using PHP,
                                            Laravel, Python, or Firebase for a
                                            lightweight cloud solution
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Data Storage
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Secure database (MySQL, PostgreSQL)
                                            with backup options
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            User Interface
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Simple and user-friendly for
                                            barangay health workers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16">
                        <div className="bg-purple-700 rounded-lg shadow-xl overflow-hidden">
                            <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16 md:flex md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                                        Ready to improve healthcare delivery?
                                    </h2>
                                    <p className="mt-3 max-w-3xl text-lg leading-6 text-purple-100">
                                        Implement BHIS in your barangay health
                                        center today.
                                    </p>
                                </div>
                                <div className="mt-8 md:mt-0">
                                    <a
                                        href="#"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-700 bg-white hover:bg-purple-50 transition duration-150 ease-in-out"
                                    >
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ServiceCard({ icon, title, features }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="px-6 py-8">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                        {icon}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>
                <ul className="mt-6 space-y-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="ml-3 text-gray-600">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
