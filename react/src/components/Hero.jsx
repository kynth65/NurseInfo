import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Clipboard, Shield } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative bg-white overflow-hidden">
            {/* Background pattern */}
            <div className="hidden lg:block lg:absolute lg:inset-0">
                <svg
                    className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
                    width="640"
                    height="784"
                    fill="none"
                    viewBox="0 0 640 784"
                >
                    <defs>
                        <pattern
                            id="purple-pattern"
                            x="118"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect
                                x="0"
                                y="0"
                                width="4"
                                height="4"
                                className="text-purple-100"
                                fill="currentColor"
                            />
                        </pattern>
                    </defs>
                    <rect
                        y="72"
                        width="640"
                        height="640"
                        className="text-gray-50"
                        fill="currentColor"
                    />
                    <rect
                        x="118"
                        width="404"
                        height="784"
                        fill="url(#purple-pattern)"
                    />
                </svg>
            </div>

            <div className="relative pt-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
                <main className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">
                                Transforming Healthcare
                            </span>
                            <span className="block text-purple-600">
                                in Every Barangay
                            </span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl lg:mx-0">
                            Empowering healthcare workers with digital solutions
                            to improve patient care, streamline operations, and
                            enhance community health monitoring across the
                            Philippines.
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/signup"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                                >
                                    Get Started
                                </Link>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <Link
                                    to="/about"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
                                >
                                    Learn More{" "}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Feature cards */}
                <div className="mt-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={
                                <Clipboard className="h-8 w-8 text-purple-500" />
                            }
                            title="Streamlined Records"
                            description="Digitize patient records for easy access, improving continuity of care across multiple visits and providers."
                        />
                        <FeatureCard
                            icon={<Users className="h-8 w-8 text-purple-500" />}
                            title="Community Health Monitoring"
                            description="Track community health trends, identify outbreaks early, and coordinate targeted interventions."
                        />
                        <FeatureCard
                            icon={
                                <Shield className="h-8 w-8 text-purple-500" />
                            }
                            title="Secure & Compliant"
                            description="Built with data privacy and security in mind, fully compliant with healthcare regulations."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition duration-150 ease-in-out">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-50 rounded-md p-3">
                        {icon}
                    </div>
                    <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">
                        {title}
                    </h3>
                </div>
                <p className="mt-3 text-base text-gray-500">{description}</p>
            </div>
        </div>
    );
}
