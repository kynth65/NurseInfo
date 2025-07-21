// src/components/inventory/MedicineList.jsx
import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Plus, MinusCircle, PlusCircle, Trash2, History } from "lucide-react";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("none");
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

    const sortedAndFilteredMedicines = medicines
        .filter(
            (medicine) =>
                medicine.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                medicine.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "high-low") {
                return b.current_stock - a.current_stock;
            } else if (sortOrder === "low-high") {
                return a.current_stock - b.current_stock;
            }
            return 0;
        });

    useEffect(() => {
        if (token) {
            loadMedicines();
        }
    }, [token]);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <div className="p-6">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            Medicine Inventory
                        </h1>
                        <div className="flex gap-2">
                            <Link
                                to="/inventory/history"
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                History
                            </Link>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-purple-600 text-white cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search medicines..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    🔍
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                Sort by stock:
                            </span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="none">Default</option>
                                <option value="high-low">
                                    Highest to Lowest
                                </option>
                                <option value="low-high">
                                    Lowest to Highest
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Add Medicine Form */}
                {showAddForm && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        {/* Blurry transparent backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowAddForm(false)}
                        ></div>

                        {/* Modal content */}
                        <div className="bg-white p-6 rounded-lg w-96 relative z-10">
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
                                        className="px-4 py-2 border rounded cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Medicine List */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedAndFilteredMedicines.map((medicine) => (
                        <div
                            key={medicine.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        {/* <div className="text-sm text-gray-400">
                                            ID:{medicine.id}
                                        </div> */}
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {medicine.name}
                                        </h3>
                                        <div className="text-sm font-medium text-gray-500">
                                            {medicine.description}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div
                                            className={`text-2xl font-bold ${
                                                medicine.current_stock <
                                                medicine.minimum_stock
                                                    ? "text-red-500"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {medicine.current_stock}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            in stock
                                        </div>
                                        {medicine.current_stock <
                                            medicine.minimum_stock && (
                                            <div className="text-sm text-red-500 mt-1">
                                                Below minimum (
                                                {medicine.minimum_stock})
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-3 mt-6">
                                    <button
                                        onClick={() => {
                                            setShowTransactionForm(medicine.id);
                                            setTransaction({
                                                ...transaction,
                                                type: "in",
                                            });
                                        }}
                                        className="p-2 rounded-lg cursor-pointer bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors duration-200"
                                        title="Add Stock"
                                    >
                                        <PlusCircle className="w-5 h-5 mx-auto" />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowTransactionForm(medicine.id);
                                            setTransaction({
                                                ...transaction,
                                                type: "out",
                                            });
                                        }}
                                        className="p-2 rounded-lg cursor-pointer bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors duration-200"
                                        title="Take Stock"
                                    >
                                        <MinusCircle className="w-5 h-5 mx-auto" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setShowHistory(medicine.id)
                                        }
                                        className="p-2 rounded-lg cursor-pointer bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                        title="View History"
                                    >
                                        <History className="w-5 h-5 mx-auto" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(medicine.id)
                                        }
                                        className="p-2 rounded-lg cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5 mx-auto" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {sortedAndFilteredMedicines.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No medicines found matching your search.
                    </div>
                )}

                {/* Transaction Form */}
                {showTransactionForm && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        {/* Blurry transparent backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowTransactionForm(null)}
                        ></div>

                        {/* Modal content */}
                        <div className="bg-white p-6 rounded-lg w-96 relative z-10">
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
                                        className="px-4 py-2 border rounded cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
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
