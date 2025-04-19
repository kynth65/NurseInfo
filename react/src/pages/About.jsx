import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Users,
    Target,
    Clock,
    Check,
    Building,
    Award,
    FileText,
    Database,
    Shield,
    Activity,
    Heart,
} from "lucide-react";
import { FaHandHoldingMedical } from "react-icons/fa";

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
                        Transforming Healthcare in Every Barangay
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            About HEAL
                        </h2>
                        <div className="prose prose-lg text-gray-600">
                            <p>
                                HEAL (Health Enhancement and Access Link) is a
                                digitized Barangay Health Information System
                                designed to enhance healthcare services in local
                                communities across the Philippines. Our system
                                aims to modernize how barangay health centers
                                manage patient records, improving efficiency,
                                accuracy, and accessibility.
                            </p>
                            <p className="mt-4">
                                Barangay health centers in the Philippines play
                                a vital role in delivering accessible healthcare
                                to communities that can exceed 10,000 residents.
                                However, many centers still rely on manual
                                record keeping or outdated systems that create
                                administrative challenges, delays, and errors.
                            </p>
                            <p className="mt-4">
                                HEAL provides an automated and user-friendly
                                platform that allows health professionals to
                                easily store, access, and update patient records
                                in real time, supporting faster, smarter, and
                                more reliable healthcare services while
                                strengthening disease monitoring and public
                                health response.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 relative">
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                            <img
                                src="/api/placeholder/600/400"
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
                        <FaHandHoldingMedical className="h-12 w-12 text-purple-600 mx-auto mb-4" />
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
                            description="We create solutions that work in low-resource settings, with features designed specifically for the Philippine barangay context."
                        />
                        <CoreValueCard
                            icon={
                                <Shield className="h-8 w-8 text-purple-600" />
                            }
                            title="Data Security"
                            description="We maintain the highest standards in data security and privacy, ensuring compliance with healthcare regulations and protecting patient information."
                        />
                        <CoreValueCard
                            icon={<Clock className="h-8 w-8 text-purple-600" />}
                            title="Efficiency"
                            description="We streamline processes to reduce administrative workload, allowing health workers to focus more on patient care than paperwork."
                        />
                        <CoreValueCard
                            icon={
                                <FaHandHoldingMedical className="h-8 w-8 text-purple-600" />
                            }
                            title="Compassion"
                            description="We never forget that behind every data point is a real person whose health and wellbeing matter."
                        />
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="bg-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Database className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900">
                            Key Features
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            How HEAL transforms barangay healthcare delivery
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <FeatureCard
                            title="Digital Patient Records"
                            description="Secure and organized storage of medical histories, consultations, immunization records, and treatment plans."
                        />
                        <FeatureCard
                            title="Quick & Easy Access"
                            description="Health workers can retrieve patient information instantly, reducing waiting times and improving service delivery."
                        />
                        <FeatureCard
                            title="Efficient Data Management"
                            description="Eliminates the hassle of manual record-keeping, minimizing errors and paperwork."
                        />
                        <FeatureCard
                            title="Automated Disease Tallying"
                            description="Real-time tracking and categorization of diseases, allowing for early outbreak detection and preventive measures."
                        />
                        <FeatureCard
                            title="Seamless DOH Integration"
                            description="Smooth transfer of health data to the Department of Health for better disease surveillance and national health reporting."
                        />
                        <FeatureCard
                            title="Scalable System"
                            description="Designed to adapt and expand as the community grows, ensuring sustained efficiency."
                        />
                    </div>
                </div>
            </div>

            {/* Objectives */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900">
                        Our Objectives
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        The goals driving our mission to transform barangay
                        healthcare
                    </p>
                </div>

                <div className="space-y-6">
                    <Objective
                        number="01"
                        title="Improve Efficiency in Health Record Management"
                        description="Digitize patient records, reduce paperwork, and minimize errors in data entry and retrieval."
                    />
                    <Objective
                        number="02"
                        title="Enhance Accessibility and Accuracy of Health Information"
                        description="Provide barangay health workers with a reliable, real-time system for tracking patient histories, immunizations, and medical consultations."
                    />
                    <Objective
                        number="03"
                        title="Support Better Healthcare Delivery"
                        description="Enable faster decision-making, improve coordination between health workers and patients, and ensure timely medical interventions, especially in emergencies."
                    />
                    <Objective
                        number="04"
                        title="Strengthen National Health Surveillance"
                        description="Enable seamless transfer of health records from barangay health centers to the Department of Health, ensuring better monitoring of public health trends and disease outbreaks."
                    />
                </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
                        Expected Impact
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard number="85%" label="Reduction in Paperwork" />
                        <StatCard
                            number="50%"
                            label="Faster Patient Processing"
                        />
                        <StatCard
                            number="90%"
                            label="Improved Record Accuracy"
                        />
                        <StatCard number="100%" label="DOH Compliance" />
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
                        The dedicated nursing students behind HEAL
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <TeamMember
                        name="Georgia Marta E. Diaz"
                        role="Team Leader"
                        image="/api/placeholder/300/300"
                        bio="Project coordinator and lead system designer"
                    />
                    <TeamMember
                        name="Thea Kim M. Castuciano"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="User experience design and clinical workflow specialist"
                    />
                    <TeamMember
                        name="Irish Hazel N. Cruz"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="Data management and healthcare analytics expert"
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <TeamMember
                        name="Sean Thomas M. Cubarde"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="System architecture and integration specialist"
                    />
                    <TeamMember
                        name="Joshua N. Dela Cruz"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="Database design and security implementation"
                    />
                    <TeamMember
                        name="Troy Gideon C. Dela Cruz"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="Front-end development and user interface design"
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <TeamMember
                        name="John Amos Delantar"
                        role="Team Member"
                        image="/api/placeholder/300/300"
                        bio="Testing, quality assurance, and documentation"
                    />
                </div>
            </div>

            <Footer />
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

function FeatureCard({ title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200">
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-green-50 rounded-full p-2">
                    <Check className="h-6 w-6 text-green-600" />
                </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function Objective({ number, title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200">
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                    <span className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-800 text-xl font-bold">
                        {number}
                    </span>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
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
