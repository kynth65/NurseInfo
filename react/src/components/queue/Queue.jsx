import React, { useState } from "react";
import {
    Users,
    Clock,
    CheckCircle,
    UserPlus,
    Search,
    ChevronDown,
    ChevronUp,
    Filter,
    Bell,
} from "lucide-react";

export default function Queue() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Sample queue data
    const queueData = [
        {
            id: 1,
            name: "Maria Santos",
            age: 32,
            purpose: "General Checkup",
            status: "waiting",
            waitTime: 12,
            priority: "normal",
        },
        {
            id: 2,
            name: "Juan Cruz",
            age: 67,
            purpose: "Blood Pressure Monitoring",
            status: "waiting",
            waitTime: 8,
            priority: "elderly",
        },
        {
            id: 3,
            name: "Ana Rivera",
            age: 28,
            purpose: "Prenatal Checkup",
            status: "in-progress",
            waitTime: 0,
            priority: "prenatal",
        },
        {
            id: 4,
            name: "Pedro Reyes",
            age: 45,
            purpose: "Medication Refill",
            status: "waiting",
            waitTime: 20,
            priority: "normal",
        },
        {
            id: 5,
            name: "Sofia Lim",
            age: 4,
            purpose: "Immunization",
            status: "waiting",
            waitTime: 5,
            priority: "child",
        },
        {
            id: 6,
            name: "Gabriel Tan",
            age: 35,
            purpose: "Wound Dressing",
            status: "completed",
            waitTime: 0,
            priority: "normal",
        },
        {
            id: 7,
            name: "Camille Flores",
            age: 25,
            purpose: "Family Planning",
            status: "completed",
            waitTime: 0,
            priority: "normal",
        },
    ];

    // Filter the queue data based on search term and filter
    const filteredQueue = queueData.filter((patient) => {
        const matchesSearch =
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.purpose.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "waiting" && patient.status === "waiting") ||
            (filter === "in-progress" && patient.status === "in-progress") ||
            (filter === "completed" && patient.status === "completed") ||
            (filter === "priority" && patient.priority !== "normal");

        return matchesSearch && matchesFilter;
    });

    // Get counts for the stats
    const currentWaiting = queueData.filter(
        (p) => p.status === "waiting"
    ).length;
    const inProgress = queueData.filter(
        (p) => p.status === "in-progress"
    ).length;
    const completed = queueData.filter((p) => p.status === "completed").length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Patient Queue
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage patient waiting list and service flow
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                Currently Waiting
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {currentWaiting}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                In Progress
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {inProgress}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                                Completed Today
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {completed}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 max-w-md relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Search by name or purpose..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                onClick={() =>
                                    setShowFilterMenu(!showFilterMenu)
                                }
                            >
                                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                                Filter
                                {showFilterMenu ? (
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                ) : (
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                )}
                            </button>

                            {showFilterMenu && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${
                                                filter === "all"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => {
                                                setFilter("all");
                                                setShowFilterMenu(false);
                                            }}
                                        >
                                            All Patients
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${
                                                filter === "waiting"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => {
                                                setFilter("waiting");
                                                setShowFilterMenu(false);
                                            }}
                                        >
                                            Waiting
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${
                                                filter === "in-progress"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => {
                                                setFilter("in-progress");
                                                setShowFilterMenu(false);
                                            }}
                                        >
                                            In Progress
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${
                                                filter === "completed"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => {
                                                setFilter("completed");
                                                setShowFilterMenu(false);
                                            }}
                                        >
                                            Completed
                                        </button>
                                        <button
                                            className={`block px-4 py-2 text-sm w-full text-left ${
                                                filter === "priority"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => {
                                                setFilter("priority");
                                                setShowFilterMenu(false);
                                            }}
                                        >
                                            Priority Cases
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add to Queue
                        </button>
                    </div>
                </div>
            </div>

            {/* Queue Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="min-w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Queue #
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Patient
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Purpose
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Wait Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredQueue.map((patient) => (
                                <tr
                                    key={patient.id}
                                    className={
                                        patient.priority !== "normal"
                                            ? "bg-blue-50"
                                            : ""
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            #{patient.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {patient.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {patient.age} yrs old
                                                </div>
                                            </div>
                                            {patient.priority !== "normal" && (
                                                <span
                                                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        patient.priority ===
                                                        "elderly"
                                                            ? "bg-amber-100 text-amber-800"
                                                            : patient.priority ===
                                                              "child"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-purple-100 text-purple-800"
                                                    }`}
                                                >
                                                    {patient.priority}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {patient.purpose}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {patient.status === "waiting" ? (
                                            <div className="text-sm text-gray-500">
                                                {patient.waitTime} mins
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                -
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                patient.status === "waiting"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : patient.status ===
                                                      "in-progress"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {patient.status === "waiting"
                                                ? "Waiting"
                                                : patient.status ===
                                                  "in-progress"
                                                ? "In Progress"
                                                : "Completed"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {patient.status === "waiting" && (
                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                Start Service
                                            </button>
                                        )}
                                        {patient.status === "in-progress" && (
                                            <button className="text-green-600 hover:text-green-900 mr-3">
                                                Complete
                                            </button>
                                        )}
                                        <button className="text-gray-600 hover:text-gray-900">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredQueue.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        No patients in queue match your criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Queue Display Panel */}
            <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 text-white">
                    <h2 className="text-lg font-medium">Now Serving</h2>
                </div>
                <div className="bg-white p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        {queueData.filter((p) => p.status === "in-progress")
                            .length > 0 ? (
                            queueData
                                .filter((p) => p.status === "in-progress")
                                .map((patient) => (
                                    <div
                                        key={patient.id}
                                        className="bg-blue-50 p-4 rounded-lg"
                                    >
                                        <p className="text-3xl font-bold text-blue-700">
                                            #{patient.id}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Room: Consultation 1
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="col-span-3 py-8">
                                <p className="text-gray-500 text-center">
                                    No patients currently being served
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
