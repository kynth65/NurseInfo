// src/components/inventory/TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TransactionHistory({ medicineId, onClose }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTransactions();
    }, [medicineId]);

    const loadTransactions = async () => {
        try {
            const response = await axiosClient.get(
                `/medicines/${medicineId}/transactions`
            );
            setTransactions(response.data.transactions);
            setLoading(false);
        } catch (err) {
            setError("Failed to load transaction history");
            setLoading(false);
        }
    };

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-3">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="border rounded-lg p-4 flex items-start gap-3"
                        >
                            {transaction.type === "in" ? (
                                <ArrowUpRight className="w-5 h-5 text-green-500 mt-1" />
                            ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-500 mt-1" />
                            )}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="font-medium">
                                        {transaction.type === "in"
                                            ? "Added"
                                            : "Removed"}{" "}
                                        {transaction.quantity} units
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-1">
                                    Reason: {transaction.reason}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    By:{" "}
                                    {transaction.user?.name || "Unknown user"}
                                </p>
                            </div>
                        </div>
                    ))}

                    {transactions.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                            No transactions found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
