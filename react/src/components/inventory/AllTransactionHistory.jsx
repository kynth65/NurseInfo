// src/components/inventory/AllTransactionHistory.jsx
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import Loading from "../Loading";

export default function AllTransactionHistory() {
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

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
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

            <div className="bg-white rounded-lg shadow">
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
        </div>
    );
}
