import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";

export function AddPatientToFamilyModal({ familyId, onClose, onSave }) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        try {
            const response = await axiosClient.get("/patients");
            // Filter patients that are not already in a family
            const availablePatients = response.data.patients.filter(
                (patient) =>
                    !patient.family_id ||
                    patient.family_id !== parseInt(familyId)
            );
            setPatients(availablePatients);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load patients");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPatientId) {
            setError("Please select a patient");
            return;
        }

        setLoading(true);
        try {
            await axiosClient.post(`/families/${familyId}/add-patient`, {
                patient_id: selectedPatientId,
            });
            onSave();
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to add patient to family"
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredPatients = patients.filter((patient) =>
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Add Patient to Family
                            </h3>
                            {error && (
                                <div className="text-red-500 mb-4">{error}</div>
                            )}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Search Patients
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search by name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="max-h-60 overflow-y-auto border rounded">
                                {loading ? (
                                    <div className="p-4 text-center">
                                        Loading patients...
                                    </div>
                                ) : filteredPatients.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No patients found
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {filteredPatients.map((patient) => (
                                            <li
                                                key={patient.id}
                                                onClick={() =>
                                                    setSelectedPatientId(
                                                        patient.id
                                                    )
                                                }
                                                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                                    selectedPatientId ===
                                                    patient.id
                                                        ? "bg-blue-50"
                                                        : ""
                                                }`}
                                            >
                                                <div className="font-medium">
                                                    {patient.full_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    DOB:{" "}
                                                    {new Date(
                                                        patient.date_of_birth
                                                    ).toLocaleDateString()}{" "}
                                                    | Gender: {patient.gender}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                disabled={loading || !selectedPatientId}
                            >
                                {loading ? "Adding..." : "Add to Family"}
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
