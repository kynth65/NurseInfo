// src/components/inventory/MedicineList.jsx
import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Plus, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useStateContext } from "../../context/ContextProvider";
import TransactionHistory from "./TransactionHistory";
import { Link } from "react-router-dom";
import Loading from "../Loading";

export default function MedicineList() {
    const { token } = useStateContext(); // Add this
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(null);
    const [showHistory, setShowHistory] = useState(null);
    const [newMedicine, setNewMedicine] = useState({
        name: "",
        description: "",
        minimum_stock: 0,
    });
    const [transaction, setTransaction] = useState({
        quantity: 0,
        reason: "",
        type: "in",
    });

    const loadMedicines = async () => {
        if (!token) return; // Don't load if no token
        setLoading(true);
        try {
            const response = await axiosClient.get("/medicines");
            setMedicines(response.data.medicines);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load medicines");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMedicine = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/medicines", newMedicine);
            setMedicines([...medicines, response.data.medicine]);
            setShowAddForm(false);
            setNewMedicine({ name: "", description: "", minimum_stock: 0 });
        } catch (err) {
            setError("Failed to add medicine");
        }
    };

    const handleTransaction = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/inventory-transactions", {
                medicine_id: showTransactionForm,
                ...transaction,
            });

            // Show warning if present
            if (response.data.warning) {
                alert(response.data.warning);
            }

            setMedicines(
                medicines.map((med) =>
                    med.id === showTransactionForm
                        ? { ...med, current_stock: response.data.current_stock }
                        : med
                )
            );
            setShowTransactionForm(null);
            setTransaction({ quantity: 0, reason: "", type: "in" });
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to process transaction"
            );
        }
    };

    const handleDelete = async (medicineId) => {
        if (window.confirm("Are you sure you want to delete this medicine?")) {
            try {
                await axiosClient.delete(`/medicines/${medicineId}`);
                setMedicines(medicines.filter((med) => med.id !== medicineId));
            } catch (err) {
                setError("Failed to delete medicine");
            }
        }
    };

    useEffect(() => {
        if (token) {
            loadMedicines();
        }
    }, [token]);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            {" "}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Medicine Inventory</h1>
                    <div className="flex gap-2">
                        <Link
                            to="/inventory/history"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            History
                        </Link>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Medicine
                        </button>
                    </div>
                </div>

                {/* Add Medicine Form */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold mb-4">
                                Add New Medicine
                            </h2>
                            <form onSubmit={handleAddMedicine}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newMedicine.name}
                                        onChange={(e) =>
                                            setNewMedicine({
                                                ...newMedicine,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={newMedicine.description}
                                        onChange={(e) =>
                                            setNewMedicine({
                                                ...newMedicine,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Minimum Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={newMedicine.minimum_stock}
                                        onChange={(e) =>
                                            setNewMedicine({
                                                ...newMedicine,
                                                minimum_stock: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Medicine List */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {medicines.map((medicine) => (
                        <div
                            key={medicine.id}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">
                                        ID:{medicine.id}
                                    </div>

                                    <h3 className="font-bold">
                                        {medicine.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {medicine.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div
                                        className={`font-bold ${
                                            medicine.current_stock <
                                            medicine.minimum_stock
                                                ? "text-red-600"
                                                : ""
                                        }`}
                                    >
                                        {medicine.current_stock}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        in stock
                                        {medicine.current_stock <
                                            medicine.minimum_stock && (
                                            <div className="text-red-500">
                                                Below minimum stock (
                                                {medicine.minimum_stock})
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setShowTransactionForm(medicine.id);
                                        setTransaction({
                                            ...transaction,
                                            type: "in",
                                        });
                                    }}
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Stock
                                </button>
                                <button
                                    onClick={() => {
                                        setShowTransactionForm(medicine.id);
                                        setTransaction({
                                            ...transaction,
                                            type: "out",
                                        });
                                    }}
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded"
                                >
                                    <MinusCircle className="w-4 h-4" />
                                    Take Stock
                                </button>

                                <button
                                    onClick={() => setShowHistory(medicine.id)}
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                >
                                    View History
                                </button>

                                <button
                                    onClick={() => handleDelete(medicine.id)}
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Transaction Form */}
                {showTransactionForm && (
                    <div className="fixed inset-0 bg- bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold mb-4">
                                {transaction.type === "in" ? "Add" : "Take"}{" "}
                                Stock
                            </h2>
                            <form onSubmit={handleTransaction}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={transaction.quantity}
                                        onChange={(e) =>
                                            setTransaction({
                                                ...transaction,
                                                quantity: parseInt(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Reason
                                    </label>
                                    <textarea
                                        value={transaction.reason}
                                        onChange={(e) =>
                                            setTransaction({
                                                ...transaction,
                                                reason: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowTransactionForm(null)
                                        }
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Transaction History Modal */}
                {showHistory && (
                    <TransactionHistory
                        medicineId={showHistory}
                        onClose={() => setShowHistory(null)}
                    />
                )}
            </div>
        </>
    );
}
