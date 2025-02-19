import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { TrendingUp, Users, AlertCircle, Activity } from "lucide-react";

export default function SicknessTallyDashboard() {
    // Mock data for diseases
    const diseaseStats = {
        mostCommon: {
            name: "Influenza A",
            count: 245,
            increase: 12.5,
            lastMonth: 218,
        },
        totalCases: 856,
        activeMonitoring: 124,
        criticalCases: 15,
    };

    // Mock data for the trends chart
    const monthlyData = [
        { month: "Jan", cases: 150, severity: 3.2 },
        { month: "Feb", cases: 218, severity: 3.8 },
        { month: "Mar", cases: 245, severity: 4.1 },
        { month: "Apr", cases: 185, severity: 3.5 },
        { month: "May", cases: 198, severity: 3.6 },
        { month: "Jun", cases: 220, severity: 3.9 },
    ];

    // Mock data for disease distribution
    const diseaseDistribution = [
        { name: "Influenza A", cases: 245, percentage: 28.6 },
        { name: "COVID-19", cases: 178, percentage: 20.8 },
        { name: "Gastroenteritis", cases: 156, percentage: 18.2 },
        { name: "Bronchitis", cases: 142, percentage: 16.6 },
        { name: "UTI", cases: 135, percentage: 15.8 },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Disease Surveillance Dashboard
                </h1>
                <p className="text-gray-600">
                    Real-time monitoring of disease occurrences and trends
                </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Most Common Disease */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">
                            Most Common Disease
                        </span>
                        <TrendingUp className="text-green-500 h-5 w-5" />
                    </div>
                    <div className="mb-1">
                        <h3 className="text-xl font-bold">
                            {diseaseStats.mostCommon.name}
                        </h3>
                        <span className="text-2xl font-bold text-gray-800">
                            {diseaseStats.mostCommon.count}
                        </span>
                        <span className="text-sm text-green-500 ml-2">
                            +{diseaseStats.mostCommon.increase}%
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        vs. last month ({diseaseStats.mostCommon.lastMonth}{" "}
                        cases)
                    </p>
                </div>

                {/* Total Cases */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">
                            Total Cases
                        </span>
                        <Users className="text-blue-500 h-5 w-5" />
                    </div>
                    <div className="mb-1">
                        <span className="text-2xl font-bold text-gray-800">
                            {diseaseStats.totalCases}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        All reported cases this month
                    </p>
                </div>

                {/* Active Monitoring */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">
                            Active Monitoring
                        </span>
                        <Activity className="text-yellow-500 h-5 w-5" />
                    </div>
                    <div className="mb-1">
                        <span className="text-2xl font-bold text-gray-800">
                            {diseaseStats.activeMonitoring}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Cases under observation
                    </p>
                </div>

                {/* Critical Cases */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">
                            Critical Cases
                        </span>
                        <AlertCircle className="text-red-500 h-5 w-5" />
                    </div>
                    <div className="mb-1">
                        <span className="text-2xl font-bold text-gray-800">
                            {diseaseStats.criticalCases}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Requiring immediate attention
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Trend Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                        Disease Occurrence Trend
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="cases"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Number of Cases"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="severity"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    name="Severity Index"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">
                        Disease Distribution
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={diseaseDistribution}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="cases"
                                    fill="#3b82f6"
                                    name="Number of Cases"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Disease List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Disease Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Disease
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cases
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Percentage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {diseaseDistribution.map((disease) => (
                                <tr key={disease.name}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {disease.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {disease.cases}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {disease.percentage}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                disease.percentage > 25
                                                    ? "bg-red-100 text-red-800"
                                                    : disease.percentage > 15
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {disease.percentage > 25
                                                ? "High"
                                                : disease.percentage > 15
                                                ? "Moderate"
                                                : "Low"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
