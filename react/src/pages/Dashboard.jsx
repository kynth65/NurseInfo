import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Activity, Users, Syringe, Package, AlertCircle } from "lucide-react";

export default function Dashboard() {
    // Mock data for the chart
    const data = Array.from({ length: 12 }, (_, i) => ({
        name: `Month ${i + 1}`,
        patients: Math.floor(Math.random() * 500),
        visits: Math.floor(Math.random() * 300),
    }));

    return (
        <div className="p-6 space-y-8">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Patients */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Total Patients
                            </p>
                            <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">2,856</h2>
                            <span className="text-sm font-medium text-green-500">
                                +5%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Weekly Appointments */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Weekly Appointments
                            </p>
                            <Activity className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">432</h2>
                            <span className="text-sm font-medium text-green-500">
                                +3%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vaccination Status */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Vaccinations This Week
                            </p>
                            <Syringe className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">156</h2>
                            <span className="text-sm font-medium text-green-500">
                                +12%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Inventory Status */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Low Stock Items
                            </p>
                            <Package className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">8</h2>
                            <span className="text-sm font-medium text-red-500">
                                Alert
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Disease Tally Card */}
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-purple-500" />
                            Common Diseases This Month
                        </h3>
                        <div className="space-y-3">
                            {[
                                {
                                    name: "Influenza A",
                                    count: 187,
                                    trend: "+12%",
                                },
                                {
                                    name: "Upper Respiratory Infection",
                                    count: 145,
                                    trend: "-3%",
                                },
                                {
                                    name: "Gastroenteritis",
                                    count: 98,
                                    trend: "+5%",
                                },
                            ].map((disease) => (
                                <div
                                    key={disease.name}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                >
                                    <span className="font-medium">
                                        {disease.name}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-600">
                                            {disease.count} cases
                                        </span>
                                        <span
                                            className={
                                                disease.trend.startsWith("+")
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }
                                        >
                                            {disease.trend}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Card */}
                <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg shadow-sm">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Upcoming Events</h3>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Staff Meeting",
                                    date: "Today",
                                    time: "09:00 AM",
                                },
                                {
                                    title: "Vaccination Drive",
                                    date: "Tomorrow",
                                    time: "02:00 PM",
                                },
                                {
                                    title: "Pediatric Clinic",
                                    date: "Feb 20",
                                    time: "10:00 AM",
                                },
                                {
                                    title: "Medical Training",
                                    date: "Feb 22",
                                    time: "11:00 AM",
                                },
                            ].map((event, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b border-purple-500/30 pb-2 last:border-0"
                                >
                                    <div>
                                        <h4 className="font-medium">
                                            {event.title}
                                        </h4>
                                        <p className="text-sm text-purple-200">
                                            {event.time}
                                        </p>
                                    </div>
                                    <span className="text-sm text-purple-200">
                                        {event.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Visits Chart */}
                <div className="bg-white p-4">
                    <h3 className="text-lg font-medium">Patient Visits</h3>
                    <p className="text-sm text-green-500">
                        +4% more than last month
                    </p>
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Line
                                    type="monotone"
                                    dataKey="patients"
                                    stroke="#7C3AED"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Vaccination Progress */}
                <div className="bg-white p-4">
                    <h3 className="text-lg font-medium">
                        Vaccination Progress
                    </h3>
                    <p className="text-sm text-purple-600">
                        Target: 500 this month
                    </p>
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Line
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#7C3AED"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
