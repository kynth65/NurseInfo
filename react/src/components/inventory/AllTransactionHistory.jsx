import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { ArrowUpRight, ArrowDownRight, Search, ArrowLeft } from "lucide-react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function AllTransactionHistory() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const loadTransactions = async () => {
        try {
            const response = await axiosClient.get("/all-transactions");
            setTransactions(response.data.transactions);
            setLoading(false);
        } catch (err) {
            setError("Failed to load transaction history");
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.medicine?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.reason
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.user?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const handleBackToInventory = () => {
        navigate("/inventory");
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex items-center mb-4">
                    <button
                        onClick={handleBackToInventory}
                        className="bg-purple-600 cursor-pointer text-white px-3 py-2 rounded-lg flex items-center gap-2 mr-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold">Transaction History</h1>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by medicine name, reason, or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
            </div>

            {/* Desktop view - visible on medium screens and up */}
            <div className="hidden md:block bg-white rounded-lg shadow">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-gray-600 border-b">
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Medicine</div>
                    <div className="col-span-1">Type</div>
                    <div className="col-span-1">Quantity</div>
                    <div className="col-span-4">Reason</div>
                    <div className="col-span-2">User</div>
                </div>
                <div className="divide-y">
                    {filteredTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                        >
                            <div className="col-span-2 text-sm text-gray-500">
                                {new Date(
                                    transaction.created_at
                                ).toLocaleString()}
                            </div>
                            <div className="col-span-2 font-medium">
                                {transaction.medicine?.name}
                            </div>
                            <div className="col-span-1">
                                {transaction.type === "in" ? (
                                    <div className="flex items-center text-green-600">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        In
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-600">
                                        <ArrowDownRight className="w-4 h-4 mr-1" />
                                        Out
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1">
                                {transaction.quantity}
                            </div>
                            <div className="col-span-4 text-gray-600">
                                {transaction.reason}
                            </div>
                            <div className="col-span-2 text-gray-500">
                                {transaction.user?.name || "Unknown user"}
                            </div>
                        </div>
                    ))}
                    {filteredTransactions.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            No transactions found
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile view - visible on small screens only */}
            <div className="md:hidden space-y-4">
                {filteredTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-white rounded-lg shadow p-4"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">
                                {transaction.medicine?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {new Date(
                                    transaction.created_at
                                ).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                {transaction.type === "in" ? (
                                    <div className="flex items-center text-green-600">
                                        <ArrowUpRight className="w-4 h-4 mr-1" />
                                        In
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-600">
                                        <ArrowDownRight className="w-4 h-4 mr-1" />
                                        Out
                                    </div>
                                )}
                                <span className="ml-2">
                                    {transaction.quantity} units
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {transaction.user?.name || "Unknown user"}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500">Reason:</div>
                            <div className="text-gray-600">
                                {transaction.reason}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredTransactions.length === 0 && (
                    <div className="text-center bg-white rounded-lg shadow py-8 text-gray-500">
                        No transactions found
                    </div>
                )}
            </div>
        </div>
    );
}
