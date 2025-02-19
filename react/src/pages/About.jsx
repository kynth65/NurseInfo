import React from "react";
import Navbar from "../components/Navbar";
import {
    Heart,
    Users,
    Target,
    Clock,
    Check,
    Building,
    Award,
} from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                        Our Mission & Vision
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-purple-100">
                        Revolutionizing healthcare delivery in Filipino
                        communities through accessible technology
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Our Story
                        </h2>
                        <div className="prose prose-lg text-gray-600">
                            <p>
                                The Barangay Health Information System (BHIS)
                                was born from a critical need identified in
                                rural and underserved communities across the
                                Philippines. In 2020, amid the challenges of the
                                global pandemic, we witnessed firsthand how
                                paper-based records and fragmented systems
                                hindered effective healthcare delivery.
                            </p>
                            <p className="mt-4">
                                Our founding team of healthcare professionals
                                and technology experts came together with a
                                shared vision: to create a simple yet powerful
                                system that could transform how barangay health
                                workers track, manage, and deliver essential
                                services to their communities.
                            </p>
                            <p className="mt-4">
                                Today, BHIS operates in over 50 barangays
                                nationwide, supporting hundreds of healthcare
                                workers and impacting thousands of Filipino
                                families with improved health outcomes and more
                                efficient care delivery.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 relative">
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                                alt="Healthcare workers using digital tools"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-purple-100 w-24 h-24 rounded-lg transform rotate-12 z-0"></div>
                        <div className="absolute -top-6 -right-6 bg-indigo-100 w-16 h-16 rounded-full z-0"></div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900">
                            Our Core Values
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide our mission to improve
                            healthcare in every barangay
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CoreValueCard
                            icon={<Users className="h-8 w-8 text-purple-600" />}
                            title="Community-Centered"
                            description="We design our systems with the specific needs of Filipino communities in mind, ensuring cultural sensitivity and local relevance."
                        />
                        <CoreValueCard
                            icon={
                                <Target className="h-8 w-8 text-purple-600" />
                            }
                            title="Innovation with Purpose"
                            description="We leverage technology not for its own sake, but to solve real healthcare challenges faced by barangay health workers."
                        />
                        <CoreValueCard
                            icon={
                                <Building className="h-8 w-8 text-purple-600" />
                            }
                            title="Accessibility"
                            description="We create solutions that work in low-resource settings, with offline capabilities and minimal hardware requirements."
                        />
                        <CoreValueCard
                            icon={<Award className="h-8 w-8 text-purple-600" />}
                            title="Excellence"
                            description="We maintain the highest standards in our software development, data security, and technical support."
                        />
                        <CoreValueCard
                            icon={<Clock className="h-8 w-8 text-purple-600" />}
                            title="Sustainability"
                            description="We build systems that can be maintained and expanded with minimal external support, empowering local ownership."
                        />
                        <CoreValueCard
                            icon={<Heart className="h-8 w-8 text-purple-600" />}
                            title="Compassion"
                            description="We never forget that behind every data point is a real person whose health and wellbeing matter."
                        />
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
                        Our Impact
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard number="50+" label="Barangays Served" />
                        <StatCard
                            number="200+"
                            label="Health Workers Trained"
                        />
                        <StatCard
                            number="25,000+"
                            label="Patient Records Digitized"
                        />
                        <StatCard number="85%" label="Reduction in Paperwork" />
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Meet Our Team
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        A dedicated group of healthcare professionals,
                        developers, and community advocates
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TeamMember
                        name="Dr. Maria Santos"
                        role="Founder & Medical Director"
                        image="https://randomuser.me/api/portraits/women/32.jpg"
                        bio="Former rural physician with 15+ years of experience in public health programs"
                    />
                    <TeamMember
                        name="Juan Dela Cruz"
                        role="Lead Developer"
                        image="https://randomuser.me/api/portraits/men/45.jpg"
                        bio="Software engineer with expertise in healthcare information systems"
                    />
                    <TeamMember
                        name="Alicia Reyes"
                        role="Community Engagement Director"
                        image="https://randomuser.me/api/portraits/women/68.jpg"
                        bio="Former barangay health worker with deep understanding of local healthcare needs"
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Ready to transform healthcare in your barangay?
                    </h2>
                    <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
                        Join the growing network of communities benefiting from
                        BHIS
                    </p>
                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 shadow-md transition duration-150 ease-in-out"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CoreValueCard({ icon, title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200">
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-purple-50 rounded-md p-3">
                    {icon}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function StatCard({ number, label }) {
    return (
        <div className="text-center p-6">
            <p className="text-4xl font-bold text-purple-600">{number}</p>
            <p className="mt-2 text-gray-600 font-medium">{label}</p>
        </div>
    );
}

function TeamMember({ name, role, image, bio }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
            <div className="aspect-w-1 aspect-h-1">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-64"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="text-purple-600 font-medium">{role}</p>
                <p className="mt-3 text-gray-600">{bio}</p>
            </div>
        </div>
    );
}
