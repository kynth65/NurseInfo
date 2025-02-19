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
    User,
} from "lucide-react";
import { useState } from "react";

export default function GuestLayout() {
    const { user, token } = useStateContext();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

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
            path: "/patients",
            name: "Patients",
            icon: <UserPlus className="w-6 h-6" />,
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
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-lg transition-all duration-300 ${
                    isCollapsed ? "w-20" : "w-64"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        {!isCollapsed && (
                            <h2 className="text-xl font-semibold text-gray-800">
                                NurseInfo
                            </h2>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-5 h-5" />
                            ) : (
                                <ChevronLeft className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 mb-1 transition-colors
                                        ${
                                            isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                        }
                                    `}
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
                    {/* User Info */}
                    <div className="p-4 border-t">
                        <Link to="/profile">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                {!isCollapsed && (
                                    <div className="ml-3">
                                        <p className="font-medium text-sm">
                                            {user?.name || "User"}
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
            </div>
            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
