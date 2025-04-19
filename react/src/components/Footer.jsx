import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaHandHoldingMedical } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-purple-700 to-indigo-700 relative overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Column 1: Logo and description */}
                    <div>
                        <div className="flex items-center">
                            <FaHandHoldingMedical className="w-8 h-8 text-white" />
                            <h3 className="ml-3 text-xl font-bold text-white">
                                HEAL
                            </h3>
                        </div>
                        <p className="mt-4 text-base text-purple-100 max-w-md">
                            Health Enhancement and Access Link - A health
                            information system for smarter healthcare, designed
                            for barangay health centers across the Philippines.
                        </p>
                        <p className="mt-2 text-sm text-purple-200">
                            Manila Central University, College of Nursing
                            <br />
                            Nursing Informatics (2nd Semester SY 2024-2025)
                        </p>
                    </div>

                    {/* Column 2: Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-purple-200 tracking-wider uppercase">
                            Contact Information
                        </h3>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-purple-200 mt-0.5 flex-shrink-0" />
                                <span className="ml-3 text-purple-100">
                                    Manila Central University
                                    <br />
                                    EDSA, Caloocan City, Philippines
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-purple-200 flex-shrink-0" />
                                <a
                                    href="mailto:heal@mcu.edu.ph"
                                    className="ml-3 text-purple-100 hover:text-white transition duration-150 ease-in-out"
                                >
                                    heal@mcu.edu.ph
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-purple-200 flex-shrink-0" />
                                <span className="ml-3 text-purple-100">
                                    +63 (2) 8531 4000
                                </span>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <p className="text-sm font-semibold text-purple-200">
                                Team Members
                            </p>
                            <p className="text-sm text-purple-100 mt-1">
                                Georgia Marta E. Diaz, Thea Kim M. Castuciano,
                                Irish Hazel N. Cruz, Sean Thomas M. Cubarde,
                                Joshua N. Dela Cruz, Troy Gideon C. Dela Cruz,
                                John Amos Delantar
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-8 border-t border-purple-500 pt-6">
                    <div className="text-center">
                        <p className="text-sm text-purple-200">
                            &copy; {currentYear} HEAL Information System. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
