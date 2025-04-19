import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, User, LogOut, Settings, ChevronDown, X } from "lucide-react";

export default function Header() {
    const { user, setUser, setToken } = useStateContext();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    // Mock notifications data
    useEffect(() => {
        // This would normally be an API call
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

    return (
        <header className="bg-white shadow-sm py-2.5 px-4">
            <div className="max-w-full mx-auto flex justify-between items-center">
                <div className="flex-1"></div> {/* Spacer */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 relative"
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
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
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-3 border-b hover:bg-gray-50 cursor-pointer flex items-start ${
                                                    !notification.read
                                                        ? "bg-purple-50"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    markAsRead(notification.id)
                                                }
                                            >
                                                <div className="w-full">
                                                    <p className="text-sm">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                                {!notification.read && (
                                                    <span className="h-2 w-2 bg-purple-600 rounded-full mt-1"></span>
                                                )}
                                            </div>
                                        ))
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

                    {/* Profile Menu */}
                    <div className="relative" ref={profileRef}>
                        <button
                            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                                {user?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            <span className="hidden md:block text-sm font-medium">
                                {user?.name || "User"}
                            </span>
                            <ChevronDown className="h-4 w-4 text-gray-500 hidden md:block" />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 py-1">
                                <div className="px-4 py-3 border-b">
                                    <p className="text-sm font-medium">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() => setShowProfileMenu(false)}
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
        </header>
    );
}
