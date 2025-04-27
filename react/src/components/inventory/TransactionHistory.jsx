// src/components/inventory/TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import Loading from "../Loading";

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

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Blurry transparent backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] overflow-hidden relative z-10 flex flex-col">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto p-4">
                    <div className="space-y-3">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="border rounded-lg p-4"
                            >
                                <div className="flex items-start">
                                    <div className="mr-3 mt-1">
                                        {transaction.type === "in" ? (
                                            <ArrowUpRight className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium">
                                                {transaction.type === "in"
                                                    ? "Added"
                                                    : "Removed"}{" "}
                                                {transaction.quantity} units
                                            </span>
                                            <span className="text-sm text-gray-500 ml-2">
                                                {new Date(
                                                    transaction.created_at
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">
                                            Reason: {transaction.reason}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            By:{" "}
                                            {transaction.user?.name ||
                                                "Unknown user"}
                                        </div>
                                    </div>
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
        </div>
    );
}
