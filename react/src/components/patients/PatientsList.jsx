import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Plus, Search } from "lucide-react";
import PatientTable from "./PatientTable";
import NewPatientModal from "./NewPatientModal";
import Loading from "../Loading";

export default function PatientsList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/patients/${id}`);
            loadPatients(); // Refresh the list
        } catch (err) {
            setError("Failed to delete patient");
        }
    };

    const loadPatients = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/patients");
            setPatients(response.data.patients);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load patients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const handleNewPatient = (newPatient) => {
        setPatients([...patients, newPatient]);
        setShowNewPatientModal(false);
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Patients</h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <button
                        onClick={() => setShowNewPatientModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add Patient
                    </button>
                </div>
            </div>

            <PatientTable
                patients={patients}
                searchTerm={searchTerm}
                onRefresh={loadPatients}
                onDelete={handleDelete}
            />

            {showNewPatientModal && (
                <NewPatientModal
                    onClose={() => setShowNewPatientModal(false)}
                    onSave={handleNewPatient}
                />
            )}
        </div>
    );
}
