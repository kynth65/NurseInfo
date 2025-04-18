import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";

export function NewFamilyModal({ onClose, onSave }) {
    const [family, setFamily] = useState({
        family_number: "",
        family_name: "",
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generatingNumber, setGeneratingNumber] = useState(true);

    // Function to generate a unique family number
    const generateFamilyNumber = () => {
        setGeneratingNumber(true);
        try {
            // Get the current year
            const currentYear = new Date().getFullYear();

            // Add timestamp for uniqueness (use last 6 digits)
            const timestamp = Date.now().toString().slice(-6);

            // Combine year + timestamp to create a numeric code
            const newFamilyNumber = `${currentYear}${timestamp}`;

            // Update the family state with the generated number
            setFamily((prev) => ({ ...prev, family_number: newFamilyNumber }));
        } catch (err) {
            console.error("Failed to generate family number:", err);
            setError("Failed to generate family number. Please try again.");
        } finally {
            setGeneratingNumber(false);
        }
    };

    // Generate family number when component mounts
    useEffect(() => {
        generateFamilyNumber();
    }, []);

    // Optionally regenerate a new number if needed
    const regenerateNumber = () => {
        generateFamilyNumber();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFamily({ ...family, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post("/families", family);
            onSave();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create family");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Add New Family
                            </h3>
                            {error && (
                                <div className="text-red-500 mb-4">{error}</div>
                            )}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Family Number
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                                    <input
                                        type="text"
                                        name="family_number"
                                        value={family.family_number}
                                        readOnly
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {generatingNumber ? (
                                        <span className="sm:ml-2 text-sm text-gray-500">
                                            Generating...
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={regenerateNumber}
                                            className="sm:ml-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                                        >
                                            Regenerate
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Auto-generated number in format:
                                    [Year][Timestamp]
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Family Name *
                                </label>
                                <input
                                    type="text"
                                    name="family_name"
                                    value={family.family_name}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={family.notes}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                disabled={loading || generatingNumber}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
