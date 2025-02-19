import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import {
    User,
    Phone,
    Mail,
    MapPin,
    Building,
    Clock,
    Award,
    BookOpen,
    Users,
    Calendar,
    Edit,
    Shield,
    Briefcase,
    LogOut,
} from "lucide-react";

export default function Profile() {
    const { user, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        axiosClient
            .post("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
                navigate("/");
            })
            .catch((err) => {
                console.error("Logout error:", err);
                // Force logout even if API fails
                setUser(null);
                setToken(null);
                navigate("/");
            });
    };

    // Use context data directly instead of API calls
    const profileData = {
        // Use user data from context
        id: user?.id || 1,
        name: user?.name || "Kynth Marcaida",
        email: user?.email || "kynth65@gmail.com",
        joined_date: "February 15, 2023",

        // Fictional data
        position: "Senior Barangay Health Worker",
        contact_number: "+63 919 876 5432",
        address: "123 Sampaguita St., Barangay Health Center",
        department: "Primary Healthcare",
        shift: "Weekdays (7AM - 4PM)",
        role: "Healthcare Coordinator",
        certifications: [
            "DOH Community Health Worker Certification",
            "Basic Life Support & First Aid",
            "COVID-19 Vaccination Administration",
            "Maternal & Child Health Monitoring",
        ],
        education: {
            degree: "Bachelor of Science in Nursing",
            school: "University of Santo Tomas",
            year: "2018",
        },
        emergency_contact: {
            name: "Maria Santos",
            relationship: "Sister",
            contact: "+63 917 123 4567",
        },
        bio: "Dedicated healthcare professional with 5+ years of experience serving in barangay health initiatives. Specializing in preventive care, community outreach, and health education programs.",
        statistics: {
            patients_served: 1876,
            vaccination_campaigns: 23,
            training_hours: 245,
            community_programs: 12,
        },
        skills: [
            "Patient Assessment",
            "Immunization",
            "Health Education",
            "Maternal Care",
            "Vital Signs Monitoring",
            "Community Outreach",
        ],
        areas_of_focus: [
            "Maternal and Child Health",
            "Immunization Programs",
            "Elderly Care",
            "Chronic Disease Management",
        ],
        languages: ["English", "Filipino", "Cebuano"],
        profile_photo: `https://randomuser.me/api/portraits/men/45.jpg`,
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
                            <div className="relative">
                                <img
                                    src={profileData.profile_photo}
                                    alt={profileData.name}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                                />
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-100">
                                    <Edit
                                        size={14}
                                        className="text-purple-600"
                                    />
                                </div>
                            </div>
                            <div className="md:ml-6 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-white">
                                    {profileData.name}
                                </h1>
                                <p className="text-purple-100">
                                    {profileData.position}
                                </p>
                                <div className="flex items-center justify-center md:justify-start mt-2 text-purple-200 text-sm">
                                    <Shield size={14} className="mr-1" />
                                    <span>
                                        BHW-{("000" + profileData.id).slice(-4)}
                                    </span>
                                </div>
                            </div>
                            <div className="md:ml-auto flex space-x-3">
                                <button className="bg-white text-purple-700 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-purple-50 transition">
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-md font-medium shadow-sm hover:bg-red-600 transition flex items-center"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 divide-x border-t">
                        <div className="p-4 text-center">
                            <p className="text-2xl font-bold text-purple-700">
                                {profileData.statistics.patients_served}
                            </p>
                            <p className="text-sm text-gray-500">Patients</p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-2xl font-bold text-purple-700">
                                {profileData.statistics.vaccination_campaigns}
                            </p>
                            <p className="text-sm text-gray-500">Campaigns</p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-2xl font-bold text-purple-700">
                                {profileData.statistics.training_hours}
                            </p>
                            <p className="text-sm text-gray-500">
                                Training Hours
                            </p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-2xl font-bold text-purple-700">
                                {profileData.statistics.community_programs}
                            </p>
                            <p className="text-sm text-gray-500">Programs</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-purple-600" />
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="text-gray-800">
                                            {profileData.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phone
                                        </p>
                                        <p className="text-gray-800">
                                            {profileData.contact_number}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Address
                                        </p>
                                        <p className="text-gray-800">
                                            {profileData.address}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Joined
                                        </p>
                                        <p className="text-gray-800">
                                            {profileData.joined_date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-purple-600" />
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {profileData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Languages
                            </h2>
                            <div className="space-y-3">
                                {profileData.languages.map(
                                    (language, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-gray-700">
                                                {language}
                                            </span>
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-purple-600 h-2 rounded-full"
                                                    style={{
                                                        width:
                                                            index === 0
                                                                ? "100%"
                                                                : index === 1
                                                                ? "90%"
                                                                : "75%",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Me */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                About Me
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {profileData.bio}
                            </p>

                            <h3 className="font-medium text-gray-700 mt-6 mb-3">
                                Areas of Focus
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {profileData.areas_of_focus.map(
                                    (area, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                            <span className="text-gray-700">
                                                {area}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Work Information */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                                Work Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Department
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        {profileData.department}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Position
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        {profileData.position}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Role
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        {profileData.role}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Work Schedule
                                    </p>
                                    <p className="text-gray-800 font-medium">
                                        {profileData.shift}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="font-medium text-gray-700 mb-3">
                                    Status
                                </h3>
                                <div className="flex items-center">
                                    <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-green-700 font-medium">
                                        Active
                                    </span>
                                    <span className="mx-2 text-gray-400">
                                        •
                                    </span>
                                    <span className="text-gray-500">
                                        Last active: Today, 10:45 AM
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Education and Certifications */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                                Education & Certifications
                            </h2>

                            <div className="mb-6">
                                <h3 className="font-medium text-gray-700 mb-3">
                                    Education
                                </h3>
                                <div className="pl-4 border-l-2 border-purple-200">
                                    <p className="font-medium text-gray-800">
                                        {profileData.education.degree}
                                    </p>
                                    <p className="text-gray-600">
                                        {profileData.education.school}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Class of {profileData.education.year}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700 mb-3">
                                    Certifications
                                </h3>
                                <div className="space-y-3">
                                    {profileData.certifications.map(
                                        (cert, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <Award className="w-4 h-4 text-purple-500 mt-1 mr-2 flex-shrink-0" />
                                                <div>
                                                    <p className="text-gray-800">
                                                        {cert}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        {new Date(
                                                            Date.now() -
                                                                Math.random() *
                                                                    3 *
                                                                    365 *
                                                                    24 *
                                                                    60 *
                                                                    60 *
                                                                    1000
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-purple-600" />
                                Emergency Contact
                            </h2>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <p className="font-medium text-gray-800">
                                    {profileData.emergency_contact.name}
                                </p>
                                <p className="text-gray-600">
                                    {profileData.emergency_contact.relationship}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    {profileData.emergency_contact.contact}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
