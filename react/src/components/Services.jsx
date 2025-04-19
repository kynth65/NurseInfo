import React from "react";
import {
    FileText,
    Activity,
    Clock,
    Link,
    BarChart2,
    Shield,
    Check,
    Zap,
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
                            HEAL - Health Enhancement and Access Link
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            A Health Information System for Smarter Healthcare
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
                            Transforming barangay health centers with a modern,
                            efficient platform that addresses the local
                            challenges of record keeping and healthcare delivery
                            in the Philippines.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Service 1 */}
                            <ServiceCard
                                icon={
                                    <FileText className="h-8 w-8 text-purple-600" />
                                }
                                title="Digital Patient Records"
                                features={[
                                    "Secure storage of medical histories and records",
                                    "Consultations and treatment plans",
                                    "Immunization records tracking",
                                ]}
                            />

                            {/* Service 2 */}
                            <ServiceCard
                                icon={
                                    <Zap className="h-8 w-8 text-purple-600" />
                                }
                                title="Quick and Easy Access"
                                features={[
                                    "Instant retrieval of patient information",
                                    "Reduced waiting times for patients",
                                    "Improved service delivery efficiency",
                                ]}
                            />

                            {/* Service 3 */}
                            <ServiceCard
                                icon={
                                    <Activity className="h-8 w-8 text-purple-600" />
                                }
                                title="Automated Disease Tracking"
                                features={[
                                    "Real-time disease tracking and categorization",
                                    "Early outbreak detection capabilities",
                                    "Implementation of preventive measures",
                                ]}
                            />

                            {/* Service 4 */}
                            <ServiceCard
                                icon={
                                    <Link className="h-8 w-8 text-purple-600" />
                                }
                                title="DOH Integration"
                                features={[
                                    "Seamless transfer of health data to DOH",
                                    "Support for better disease surveillance",
                                    "Enhanced national health reporting",
                                ]}
                            />

                            {/* Service 5 */}
                            <ServiceCard
                                icon={
                                    <BarChart2 className="h-8 w-8 text-purple-600" />
                                }
                                title="Health Data Analytics"
                                features={[
                                    "Monitor community health trends",
                                    "Identify common illnesses",
                                    "Support data-driven decision making",
                                ]}
                            />

                            {/* Service 6 */}
                            <ServiceCard
                                icon={
                                    <Clock className="h-8 w-8 text-purple-600" />
                                }
                                title="Scalable Solution"
                                features={[
                                    "Adapts and expands as community grows",
                                    "Ensures sustained efficiency over time",
                                    "Supports increasing healthcare demands",
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

                    {/* Benefits */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                            Key Benefits
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
                                                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Streamlined Local Processes
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Automating data entry and retrieval
                                            tailored to the Philippine barangay
                                            context, reducing manual processes
                                            and paperwork
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
                                                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">
                                            Enhanced Accuracy and Responsiveness
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Providing reliable, real-time access
                                            to patient records for effective
                                            community health management and
                                            emergency response
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
                                            Empowered Health Workers
                                        </h4>
                                        <p className="mt-2 text-gray-600">
                                            Enabling community health workers to
                                            focus more on patient care by
                                            reducing administrative workload
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section
                    <div className="mt-16">
                        <div className="bg-purple-700 rounded-lg shadow-xl overflow-hidden">
                            <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16 md:flex md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                                        Ready to transform healthcare in your
                                        barangay?
                                    </h2>
                                    <p className="mt-3 max-w-3xl text-lg leading-6 text-purple-100">
                                        Implement HEAL in your barangay health
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
                    </div> */}
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
