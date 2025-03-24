import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import axiosClient from "../../axios-client";

export function SelectFamilyModal({ onClose, onSelectFamily }) {
    const [families, setFamilies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFamilyId, setSelectedFamilyId] = useState(null);
    const [showNewFamilyForm, setShowNewFamilyForm] = useState(false);
    const [newFamily, setNewFamily] = useState({
        family_number: "",
        family_name: "",
        notes: "",
    });

    useEffect(() => {
        loadFamilies();
    }, []);

    const loadFamilies = async () => {
        try {
            const response = await axiosClient.get("/families");
            setFamilies(response.data.families);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load families");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFamily = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosClient.post("/families", newFamily);
            setFamilies([...families, response.data.family]);
            setSelectedFamilyId(response.data.family.id);
            setShowNewFamilyForm(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create family");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectFamily = () => {
        if (!selectedFamilyId) {
            setError("Please select a family");
            return;
        }
        onSelectFamily(selectedFamilyId);
    };

    const filteredFamilies = families.filter(
        (family) =>
            family.family_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (family.family_name &&
                family.family_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {showNewFamilyForm
                                ? "Create New Family"
                                : "Select a Family"}
                        </h3>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}

                        {!showNewFamilyForm ? (
                            <>
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <input
                                            type="text"
                                            placeholder="Search families..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewFamilyForm(true)
                                            }
                                            className="bg-green-500 text-white p-2 rounded-lg flex items-center"
                                        >
                                            <UserPlus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="max-h-60 overflow-y-auto border rounded">
                                    {loading ? (
                                        <div className="p-4 text-center">
                                            Loading families...
                                        </div>
                                    ) : filteredFamilies.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            No families found
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {filteredFamilies.map((family) => (
                                                <li
                                                    key={family.id}
                                                    onClick={() =>
                                                        setSelectedFamilyId(
                                                            family.id
                                                        )
                                                    }
                                                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                                        selectedFamilyId ===
                                                        family.id
                                                            ? "bg-blue-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="font-medium">
                                                        {family.family_number}
                                                    </div>
                                                    {family.family_name && (
                                                        <div className="text-sm text-gray-500">
                                                            {family.family_name}
                                                        </div>
                                                    )}
                                                    <div className="text-sm text-gray-500">
                                                        {family.patients
                                                            ?.length || 0}{" "}
                                                        members
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleCreateFamily}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Family Number *
                                    </label>
                                    <input
                                        type="text"
                                        value={newFamily.family_number}
                                        onChange={(e) =>
                                            setNewFamily({
                                                ...newFamily,
                                                family_number: e.target.value,
                                            })
                                        }
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Family Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newFamily.family_name}
                                        onChange={(e) =>
                                            setNewFamily({
                                                ...newFamily,
                                                family_name: e.target.value,
                                            })
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Notes
                                    </label>
                                    <textarea
                                        value={newFamily.notes}
                                        onChange={(e) =>
                                            setNewFamily({
                                                ...newFamily,
                                                notes: e.target.value,
                                            })
                                        }
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewFamilyForm(false)
                                        }
                                        className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Creating..."
                                            : "Create Family"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    {!showNewFamilyForm && (
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleSelectFamily}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                disabled={loading || !selectedFamilyId}
                            >
                                Add to Family
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
