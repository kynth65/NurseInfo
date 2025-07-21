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
    Bell,
    LogOut,
} from "lucide-react";
import { FaHandHoldingMedical } from "react-icons/fa";
import Header from "../components/Header"; // Import the Header component
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const location = useLocation();
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Mock notifications data
    useEffect(() => {
        const mockNotifications = [
            {
                id: 1,
                message: "New patient registration completed",
                time: "2 hours ago",
                read: false,
            },
            {
                id: 2,
                message: "Medicine inventory is running low",
                time: "5 hours ago",
                read: false,
            },
            {
                id: 3,
                message: "Scheduled vaccination event tomorrow",
                time: "1 day ago",
                read: true,
            },
            {
                id: 4,
                message: "System update completed successfully",
                time: "2 days ago",
                read: true,
            },
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter((n) => !n.read).length);
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        axios
            .post("/api/logout")
            .then(() => {
                setUser(null);
                setToken(null);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
        setUnreadCount(0);
    };

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
        setShowNotifications(false);
        setShowProfileMenu(false);
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
            icon: <UserPlus className="w-6 h-6" />,
            description: "Manage patient records",
        },
        {
            path: "/risk-assessment",
            name: "Risk Assessment",
            icon: <ClipboardCheck className="w-6 h-6" />,
            description: "Health risk screening",
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
        // {
        //     path: "/queue",
        //     name: "Queue",
        //     icon: <Users className="w-6 h-6" />,
        //     description: "Manage patient queue",
        // },
        {
            path: "/sickness",
            name: "Sickness Tally",
            icon: <Activity className="w-6 h-6" />,
            description: "Track health conditions",
        },
    ];

    const DesktopSidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-600 to-purple-800">
                <div className="flex items-center">
                    <FaHandHoldingMedical className="w-8 h-8 text-white" />
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
        </div>
    );

    const MobileSidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
                <FaHandHoldingMedical className="w-8 h-8 text-purple-700" />
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
                                {user?.name || "User"}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Mobile top navigation */}
            {isMobileView && (
                <div className="bg-white shadow-md w-full flex items-center p-2 py-4 justify-between z-20">
                    <div className="flex items-center">
                        <button
                            onClick={() =>
                                setShowMobileSidebar(!showMobileSidebar)
                            }
                            className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors mr-2"
                        >
                            {showMobileSidebar ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <MenuIcon className="w-5 h-5" />
                            )}
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">
                            HEAL
                        </h2>
                    </div>

                    {/* Mobile notifications and profile */}
                    <div className="flex items-center">
                        {/* Notifications */}
                        <div className="relative mr-2" ref={notificationRef}>
                            <button
                                className="p-2 rounded-full hover:bg-gray-100 relative"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfileMenu(false);
                                }}
                            >
                                <Bell className="w-5 h-5 text-gray-600" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                                    <div className="p-3 border-b flex justify-between items-center">
                                        <h3 className="font-medium">
                                            Notifications
                                        </h3>
                                        {unreadCount > 0 && (
                                            <button
                                                className="text-xs text-purple-600 hover:text-purple-800"
                                                onClick={markAllAsRead}
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map(
                                                (notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer flex items-start ${
                                                            !notification.read
                                                                ? "bg-purple-50"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id
                                                            )
                                                        }
                                                    >
                                                        <div className="w-full">
                                                            <p className="text-sm">
                                                                {
                                                                    notification.message
                                                                }
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {
                                                                    notification.time
                                                                }
                                                            </p>
                                                        </div>
                                                        {!notification.read && (
                                                            <span className="h-2 w-2 bg-purple-600 rounded-full mt-1"></span>
                                                        )}
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="p-4 text-center text-gray-500">
                                                No notifications
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 text-center border-t">
                                        <Link
                                            to="/notifications"
                                            className="text-sm text-purple-600 hover:text-purple-800"
                                        >
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative" ref={profileRef}>
                            <button
                                className="p-1 rounded-full hover:bg-gray-100"
                                onClick={() => {
                                    setShowProfileMenu(!showProfileMenu);
                                    setShowNotifications(false);
                                }}
                            >
                                <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white">
                                    {user?.name?.[0]?.toUpperCase() || "U"}
                                </div>
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 py-1">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm font-medium">
                                            {user?.name || ""}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() =>
                                            setShowProfileMenu(false)
                                        }
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        My Profile
                                    </Link>
                                    <div className="border-t my-1"></div>
                                    <button
                                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-1 h-0 overflow-hidden">
                {/* Mobile sidebar */}
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

                {/* Desktop sidebar */}
                {!isMobileView && (
                    <div
                        className={`bg-white shadow-lg transition-all duration-300 flex-shrink-0 ${
                            isCollapsed ? "w-20" : "w-64"
                        }`}
                    >
                        <DesktopSidebarContent />
                    </div>
                )}

                {/* Main content area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header component - only show on desktop */}
                    {!isMobileView && <Header />}

                    {/* Content area */}
                    <div className="flex-1 overflow-x-hidden overflow-y-auto">
                        <div className="p-4 md:p-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
