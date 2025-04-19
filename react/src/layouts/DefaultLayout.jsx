import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Link, useLocation } from "react-router-dom";
import {
    Package,
    Calendar,
    Syringe,
    Users,
    Activity,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    UserPlus,
    Home,
    User,
    ClipboardCheck,
    Menu as MenuIcon,
    X,
    Heart, // Importing an icon for the title
} from "lucide-react";
import { FaHandHoldingMedical } from "react-icons/fa";

import { useState, useEffect } from "react";

export default function DefaultLayout() {
    const { user, token } = useStateContext();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const mobileWidth = window.innerWidth < 768;
            setIsMobileView(mobileWidth);

            if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                setIsCollapsed(true);
            } else if (window.innerWidth >= 1024) {
                setIsCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setShowMobileSidebar(false);
    }, [location.pathname]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <LayoutDashboard className="w-6 h-6" />,
            description: "Overview and analytics",
        },
        {
            path: "/families",
            name: "Families",
            icon: <Home className="w-6 h-6" />,
            description: "Manage family units",
        },
        {
            path: "/patients",
            name: "Patients",
            icon: <User Plus className="w-6 h-6" />,
            description: "Manage patient records",
        },
        {
            path: "/inventory",
            name: "Inventory",
            icon: <Package className="w-6 h-6" />,
            description: "Manage medicine inventory",
        },
        {
            path: "/events",
            name: "Events",
            icon: <Calendar className="w-6 h-6" />,
            description: "Schedule and manage events",
        },
        {
            path: "/vaccination",
            name: "Vaccination",
            icon: <Syringe className="w-6 h-6" />,
            description: "Track vaccination records",
        },
        {
            path: "/queue",
            name: "Queue",
            icon: <Users className="w-6 h-6" />,
            description: "Manage patient queue",
        },
        {
            path: "/sickness",
            name: "Sickness Tally",
            icon: <Activity className="w-6 h-6" />,
            description: "Track health conditions",
        },
        {
            path: "/risk-assessment",
            name: "Risk Assessment",
            icon: <ClipboardCheck className="w-6 h-6" />,
            description: "Health risk screening",
        },
    ];

    const DesktopSidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-600 to-purple-800">
                <div className="flex items-center">
                    <FaHandHoldingMedical className="w-8 h-8 text-white" />{" "}
                    {/* Heart icon */}
                    {!isCollapsed && (
                        <h2 className="text-xl font-semibold text-white ml-2">
                            HEAL
                        </h2>
                    )}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-purple-400"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5 text-white" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 text-white" />
                    )}
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 mb-1 transition-colors ${
                                isActive
                                    ? "bg-purple-50 text-purple-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center">
                                {item.icon}
                                {!isCollapsed && (
                                    <div className="ml-3">
                                        <p className="font-medium">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Link to="/profile">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        {!isCollapsed && (
                            <div className="ml-3">
                                <p className="font-medium text-sm">
                                    {user?.name || "User  "}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Barangay Health Worker
                                </p>
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );

    const MobileSidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
                <FaHandHoldingMedical className="w-8 h-8 text-purple-700" />{" "}
                <h2 className="text-xl font-semibold text-gray-800">HEAL</h2>
                <button
                    onClick={() => setShowMobileSidebar(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 mb-1 transition-colors ${
                                isActive
                                    ? "bg-purple-50 text-purple-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center">
                                {item.icon}
                                <div className="ml-3">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <Link to="/profile">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                            {user?.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="ml-3">
                            <p className="font-medium text-sm">
                                {user?.name || "User  "}
                            </p>
                            <p className="text-xs text-gray-500">
                                Barangay Health Worker
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {isMobileView && (
                <div className="bg-white shadow-md w-full flex items-center p-4 justify-between z-20">
                    <div className="flex items-center">
                        <button
                            onClick={() =>
                                setShowMobileSidebar(!showMobileSidebar)
                            }
                            className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors mr-4"
                        >
                            {showMobileSidebar ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <MenuIcon className="w-6 h-6" />
                            )}
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">
                            NurseInfo
                        </h2>
                    </div>
                </div>
            )}

            <div className="flex flex-1 h-0 overflow-hidden">
                {isMobileView && (
                    <div
                        className={`fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity duration-300 ${
                            showMobileSidebar
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        }`}
                        onClick={() => setShowMobileSidebar(false)}
                    >
                        <div
                            className={`absolute top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 w-64 transform ${
                                showMobileSidebar
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MobileSidebarContent />
                        </div>
                    </div>
                )}

                {!isMobileView && (
                    <div
                        className={`bg-white shadow-lg transition-all duration-300 flex-shrink-0 ${
                            isCollapsed ? "w-20" : "w-64"
                        }`}
                    >
                        <DesktopSidebarContent />
                    </div>
                )}

                <div className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-4 md:p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
