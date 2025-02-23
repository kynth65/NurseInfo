import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";
import {
    Syringe,
    Users,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    Filter,
    Download,
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    ChevronDown,
    Bell,
} from "lucide-react";

export default function VaccinationDashboard() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [notifications, setNotifications] = useState([
        "10 patients are due for their 2nd dose this week",
        "Vaccine stock for BCG is running low (10 doses remaining)",
        "Monthly vaccination report is ready for review",
    ]);

    // Sample data for charts and tables
    const vaccinationByTypeData = [
        { name: "BCG", count: 156, percentage: 85 },
        { name: "Hepatitis B", count: 142, percentage: 77 },
        { name: "DPT", count: 128, percentage: 70 },
        { name: "OPV", count: 134, percentage: 73 },
        { name: "Measles", count: 119, percentage: 65 },
        { name: "COVID-19", count: 98, percentage: 53 },
    ];

    const monthlyTrendsData = [
        { month: "Jan", vaccinations: 45 },
        { month: "Feb", vaccinations: 52 },
        { month: "Mar", vaccinations: 48 },
        { month: "Apr", vaccinations: 70 },
        { month: "May", vaccinations: 65 },
        { month: "Jun", vaccinations: 58 },
        { month: "Jul", vaccinations: 63 },
        { month: "Aug", vaccinations: 75 },
        { month: "Sep", vaccinations: 80 },
        { month: "Oct", vaccinations: 87 },
        { month: "Nov", vaccinations: 78 },
        { month: "Dec", vaccinations: 92 },
    ];

    const ageGroupData = [
        { name: "0-1 yr", value: 98 },
        { name: "1-5 yrs", value: 124 },
        { name: "5-12 yrs", value: 86 },
        { name: "12-18 yrs", value: 42 },
        { name: "Adults", value: 178 },
        { name: "Seniors", value: 62 },
    ];

    const COLORS = [
        "#8b5cf6",
        "#6366f1",
        "#a78bfa",
        "#c4b5fd",
        "#ddd6fe",
        "#ede9fe",
    ];

    const upcomingVaccinations = [
        {
            id: 1,
            name: "Maria Santos",
            age: "8 mos",
            vaccine: "Hepatitis B",
            dose: "2nd",
            date: "2023-10-22",
        },
        {
            id: 2,
            name: "Pedro Reyes",
            age: "4 yrs",
            vaccine: "DPT",
            dose: "Booster",
            date: "2023-10-23",
        },
        {
            id: 3,
            name: "Sophia Lim",
            age: "2 yrs",
            vaccine: "Measles",
            dose: "1st",
            date: "2023-10-23",
        },
        {
            id: 4,
            name: "Juan Dela Cruz",
            age: "1 yr",
            vaccine: "OPV",
            dose: "3rd",
            date: "2023-10-24",
        },
        {
            id: 5,
            name: "Ana Reyes",
            age: "6 mos",
            vaccine: "BCG",
            dose: "1st",
            date: "2023-10-25",
        },
    ];

    const vaccineInventory = [
        { id: 1, name: "BCG", available: 10, total: 50, expiry: "2024-03-15" },
        {
            id: 2,
            name: "Hepatitis B",
            available: 35,
            total: 50,
            expiry: "2024-04-22",
        },
        { id: 3, name: "DPT", available: 28, total: 40, expiry: "2024-02-18" },
        { id: 4, name: "OPV", available: 42, total: 60, expiry: "2024-05-10" },
        {
            id: 5,
            name: "Measles",
            available: 15,
            total: 30,
            expiry: "2024-01-30",
        },
        {
            id: 6,
            name: "COVID-19",
            available: 56,
            total: 100,
            expiry: "2023-12-25",
        },
    ];

    const recentVaccinations = [
        {
            id: 1,
            name: "Isabella Garcia",
            age: "9 mos",
            vaccine: "DPT",
            dose: "2nd",
            date: "2023-10-20",
            status: "Completed",
        },
        {
            id: 2,
            name: "Miguel Santos",
            age: "5 yrs",
            vaccine: "Measles",
            dose: "Booster",
            date: "2023-10-19",
            status: "Completed",
        },
        {
            id: 3,
            name: "Gabriel Lim",
            age: "1 yr",
            vaccine: "Hepatitis B",
            dose: "3rd",
            date: "2023-10-19",
            status: "Completed",
        },
        {
            id: 4,
            name: "Emilia Cruz",
            age: "6 mos",
            vaccine: "BCG",
            dose: "1st",
            date: "2023-10-18",
            status: "Completed",
        },
        {
            id: 5,
            name: "Santiago Reyes",
            age: "4 yrs",
            vaccine: "OPV",
            dose: "Booster",
            date: "2023-10-18",
            status: "Adverse Event",
        },
        {
            id: 6,
            name: "Sofia Mendoza",
            age: "8 mos",
            vaccine: "DPT",
            dose: "1st",
            date: "2023-10-17",
            status: "Completed",
        },
        {
            id: 7,
            name: "Mateo Robles",
            age: "3 yrs",
            vaccine: "Measles",
            dose: "1st",
            date: "2023-10-17",
            status: "Completed",
        },
    ];

    const patientDetails = {
        id: 1,
        name: "Maria Santos",
        dob: "2023-02-15",
        age: "8 months",
        gender: "Female",
        address: "123 Sampaguita St., Barangay 67, Manila",
        contact: "+63 919 555 7890",
        guardianName: "Elena Santos",
        guardianContact: "+63 919 555 7891",
        allergies: "None",
        medicalHistory: "Born full-term, no complications",
        vaccinationHistory: [
            {
                vaccine: "BCG",
                date: "2023-02-16",
                batch: "BC2023-056",
                administrator: "Nurse Reyes",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "Hepatitis B",
                date: "2023-02-16",
                batch: "HB2023-112",
                administrator: "Nurse Reyes",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "Hepatitis B",
                date: "2023-04-18",
                batch: "HB2023-205",
                administrator: "Nurse Cruz",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "DPT",
                date: "2023-04-18",
                batch: "DPT2023-078",
                administrator: "Nurse Cruz",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "OPV",
                date: "2023-04-18",
                batch: "OPV2023-089",
                administrator: "Nurse Cruz",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "DPT",
                date: "2023-06-20",
                batch: "DPT2023-156",
                administrator: "Nurse Lim",
                location: "Barangay Health Center",
                status: "Completed",
            },
            {
                vaccine: "OPV",
                date: "2023-06-20",
                batch: "OPV2023-165",
                administrator: "Nurse Lim",
                location: "Barangay Health Center",
                status: "Completed",
            },
        ],
        upcomingVaccinations: [
            { vaccine: "Hepatitis B", dueDate: "2023-10-22", dose: "2nd" },
            { vaccine: "DPT", dueDate: "2023-12-20", dose: "3rd" },
            { vaccine: "OPV", dueDate: "2023-12-20", dose: "3rd" },
            { vaccine: "Measles", dueDate: "2024-02-15", dose: "1st" },
        ],
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVaccinations = recentVaccinations.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.vaccine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleShowDetails = (patient) => {
        setSelectedPatient(patient);
        setShowDetailsModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Syringe className="h-8 w-8 text-purple-600" />
                            <h1 className="ml-2 text-2xl font-bold text-gray-900">
                                Vaccination Dashboard
                            </h1>
                        </div>
                        d{" "}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md ${
                            activeTab === "overview"
                                ? "text-purple-700 border-b-2 border-purple-500 bg-purple-50"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("schedule")}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md ${
                            activeTab === "schedule"
                                ? "text-purple-700 border-b-2 border-purple-500 bg-purple-50"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md ${
                            activeTab === "inventory"
                                ? "text-purple-700 border-b-2 border-purple-500 bg-purple-50"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab("records")}
                        className={`px-4 py-2 font-medium text-sm rounded-t-md ${
                            activeTab === "records"
                                ? "text-purple-700 border-b-2 border-purple-500 bg-purple-50"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Records
                    </button>
                </div>

                {/* Notification Panel */}
                <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                    <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
                        <div className="flex items-center">
                            <Bell className="h-5 w-5 text-purple-600 mr-2" />
                            <h2 className="text-lg font-medium text-gray-900">
                                Notifications
                            </h2>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <ul className="divide-y divide-gray-200">
                            {notifications.map((notification, index) => (
                                <li
                                    key={index}
                                    className="py-3 flex items-start"
                                >
                                    {index === 0 ? (
                                        <Calendar className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                                    ) : index === 1 ? (
                                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                    ) : (
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                    )}
                                    <p className="text-sm text-gray-600">
                                        {notification}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {activeTab === "overview" && (
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Total Vaccinations"
                                value="589"
                                change="+24%"
                                positive={true}
                                period="vs. last quarter"
                                icon={
                                    <Syringe className="h-12 w-12 text-purple-100" />
                                }
                                color="bg-purple-600"
                            />
                            <StatCard
                                title="Vaccinated Patients"
                                value="345"
                                change="+15%"
                                positive={true}
                                period="vs. last quarter"
                                icon={
                                    <Users className="h-12 w-12 text-blue-100" />
                                }
                                color="bg-blue-600"
                            />
                            <StatCard
                                title="Upcoming Appointments"
                                value="42"
                                change="-8%"
                                positive={false}
                                period="vs. last month"
                                icon={
                                    <Calendar className="h-12 w-12 text-indigo-100" />
                                }
                                color="bg-indigo-600"
                            />
                            <StatCard
                                title="Immunization Rate"
                                value="76%"
                                change="+3.2%"
                                positive={true}
                                period="vs. target"
                                icon={
                                    <CheckCircle className="h-12 w-12 text-green-100" />
                                }
                                color="bg-green-600"
                            />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Vaccination by Type
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="h-80">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <BarChart
                                                data={vaccinationByTypeData}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar
                                                    dataKey="count"
                                                    fill="#8b5cf6"
                                                    name="Number of Vaccinations"
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Vaccination by Age Group
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="h-80 flex items-center justify-center">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={ageGroupData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={true}
                                                    label={({
                                                        name,
                                                        percent,
                                                    }) =>
                                                        `${name}: ${(
                                                            percent * 100
                                                        ).toFixed(0)}%`
                                                    }
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {ageGroupData.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value) => [
                                                        `${value} patients`,
                                                        "Count",
                                                    ]}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Monthly Vaccination Trends
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="h-80">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={monthlyTrendsData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="vaccinations"
                                                stroke="#8b5cf6"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Recent Vaccinations */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Recent Vaccinations
                                </h2>
                                <button className="px-3 py-1 bg-purple-100 rounded-md text-purple-700 text-sm hover:bg-purple-200 transition duration-150 ease-in-out">
                                    View All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Patient
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Age
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vaccine
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dose
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentVaccinations
                                            .slice(0, 5)
                                            .map((vaccination) => (
                                                <tr
                                                    key={vaccination.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {vaccination.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.age}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                vaccination.vaccine
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.dose}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(
                                                                vaccination.date
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                vaccination.status ===
                                                                "Completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {vaccination.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleShowDetails(
                                                                    vaccination
                                                                )
                                                            }
                                                            className="text-purple-600 hover:text-purple-900"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "schedule" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Upcoming Vaccinations
                            </h2>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Schedule Vaccination
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Patient
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Age
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vaccine
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dose
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {upcomingVaccinations.map(
                                            (vaccination) => (
                                                <tr
                                                    key={vaccination.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {vaccination.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.age}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                vaccination.vaccine
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.dose}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(
                                                                vaccination.date
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button className="text-gray-600 hover:text-gray-900">
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleShowDetails(
                                                                    vaccination
                                                                )
                                                            }
                                                            className="text-purple-600 hover:text-purple-900"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Weekly Schedule
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-7 gap-4">
                                    {[
                                        "Sun",
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                    ].map((day, index) => (
                                        <div
                                            key={index}
                                            className="text-center"
                                        >
                                            <div className="font-medium text-gray-900 mb-2">
                                                {day}
                                            </div>
                                            <div
                                                className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                                                    index === 1 ||
                                                    index === 2 ||
                                                    index === 4
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {index + 22}
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">
                                                {index === 1
                                                    ? "3 appts"
                                                    : index === 2
                                                    ? "1 appt"
                                                    : index === 4
                                                    ? "2 appts"
                                                    : "No appts"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "inventory" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Vaccine Inventory
                            </h2>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Vaccine Stock
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vaccine Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Available Doses
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total Stock
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Expiry Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {vaccineInventory.map((vaccine) => (
                                            <tr
                                                key={vaccine.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {vaccine.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {vaccine.available}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {vaccine.total}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {vaccine.available < 15 ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Low Stock
                                                        </span>
                                                    ) : vaccine.available <
                                                      30 ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            Moderate
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Sufficient
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(
                                                            vaccine.expiry
                                                        ).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <button className="text-purple-600 hover:text-purple-900">
                                                        Update Stock
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Low Stock Alert
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-red-400" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">
                                                    Low Stock Warning
                                                </h3>
                                                <div className="mt-2 text-sm text-red-700">
                                                    <p>
                                                        The following vaccines
                                                        are running low:
                                                    </p>
                                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                                        <li>
                                                            BCG (10 doses
                                                            remaining)
                                                        </li>
                                                        <li>
                                                            Measles (15 doses
                                                            remaining)
                                                        </li>
                                                    </ul>
                                                    <button className="mt-3 inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                        Request Resupply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Expiring Soon
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <Clock className="h-5 w-5 text-yellow-400" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800">
                                                    Expiry Warning
                                                </h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>
                                                        The following vaccines
                                                        are expiring within 30
                                                        days:
                                                    </p>
                                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                                        <li>
                                                            COVID-19 (Expires:
                                                            Dec 25, 2023)
                                                        </li>
                                                    </ul>
                                                    <p className="mt-2">
                                                        Please prioritize usage
                                                        of these vaccines to
                                                        minimize wastage.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "records" && (
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Vaccination Records
                            </h2>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full"
                                        placeholder="Search records..."
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                        <Filter className="h-4 w-4 mr-2 text-gray-500" />
                                        Filter
                                    </button>
                                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                        <Download className="h-4 w-4 mr-2 text-gray-500" />
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Patient
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Age
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vaccine
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dose
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredVaccinations.map(
                                            (vaccination) => (
                                                <tr
                                                    key={vaccination.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {vaccination.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.age}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {
                                                                vaccination.vaccine
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {vaccination.dose}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(
                                                                vaccination.date
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                vaccination.status ===
                                                                "Completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {vaccination.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <button className="text-gray-600 hover:text-gray-900">
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleShowDetails(
                                                                    vaccination
                                                                )
                                                            }
                                                            className="text-purple-600 hover:text-purple-900"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-medium">1</span> to{" "}
                                    <span className="font-medium">
                                        {filteredVaccinations.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {recentVaccinations.length}
                                    </span>{" "}
                                    records
                                </div>
                                <div className="flex space-x-2">
                                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Previous
                                    </button>
                                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Vaccination Modal */}
            {showAddModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Schedule New Vaccination
                                    </h3>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                <form className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="patient"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Patient
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="patient"
                                                id="patient"
                                                className="block w-full pr-10 focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Search patient..."
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <Search className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="vaccine"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Vaccine
                                            </label>
                                            <select
                                                id="vaccine"
                                                name="vaccine"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">
                                                    Select a vaccine
                                                </option>
                                                <option value="BCG">BCG</option>
                                                <option value="Hepatitis B">
                                                    Hepatitis B
                                                </option>
                                                <option value="DPT">DPT</option>
                                                <option value="OPV">OPV</option>
                                                <option value="Measles">
                                                    Measles
                                                </option>
                                                <option value="COVID-19">
                                                    COVID-19
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dose"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Dose
                                            </label>
                                            <select
                                                id="dose"
                                                name="dose"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">
                                                    Select dose
                                                </option>
                                                <option value="1st">
                                                    1st Dose
                                                </option>
                                                <option value="2nd">
                                                    2nd Dose
                                                </option>
                                                <option value="3rd">
                                                    3rd Dose
                                                </option>
                                                <option value="Booster">
                                                    Booster
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="scheduled-date"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Scheduled Date
                                        </label>
                                        <input
                                            type="date"
                                            name="scheduled-date"
                                            id="scheduled-date"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="notes"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Notes
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows="3"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            placeholder="Any additional information..."
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Schedule
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient Details Modal */}
            {showDetailsModal && selectedPatient && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Patient Vaccination Details
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setShowDetailsModal(false)
                                        }
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Patient Name
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.name}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Date of Birth
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {new Date(
                                                    patientDetails.dob
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Age
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.age}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Gender
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.gender}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Contact Number
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.contact}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Guardian
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.guardianName}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Guardian Contact
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.guardianContact}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">
                                                Allergies
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {patientDetails.allergies}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-500">
                                        Address
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {patientDetails.address}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-md font-medium text-gray-900 mb-3">
                                        Vaccination History
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Vaccine
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Batch #
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Administrator
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {patientDetails.vaccinationHistory.map(
                                                    (record, index) => (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                                {record.vaccine}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(
                                                                    record.date
                                                                ).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {record.batch}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                                {
                                                                    record.administrator
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    {
                                                                        record.status
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-md font-medium text-gray-900 mb-3">
                                        Upcoming Vaccinations
                                    </h3>
                                    <div className="bg-purple-50 p-4 rounded-md">
                                        <ul className="space-y-3">
                                            {patientDetails.upcomingVaccinations.map(
                                                (vaccination, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center"
                                                    >
                                                        <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                                                        <span className="text-sm text-gray-900">
                                                            {
                                                                vaccination.vaccine
                                                            }{" "}
                                                            ({vaccination.dose}{" "}
                                                            dose) - Due on{" "}
                                                            {new Date(
                                                                vaccination.dueDate
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Record New Vaccination
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowDetailsModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, change, positive, period, icon, color }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`p-3 rounded-md ${color}`}>{icon}</div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {title}
                            </dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">
                                    {value}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                    <span
                        className={positive ? "text-green-600" : "text-red-600"}
                    >
                        {change}
                    </span>
                    <span className="text-gray-500 ml-1">{period}</span>
                </div>
            </div>
        </div>
    );
}
