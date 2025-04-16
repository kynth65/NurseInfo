import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { Plus } from "lucide-react";
import Loading from "../Loading";
import { AddPatientToFamilyModal } from "./AddPatientToFamilyModal";

export function FamilyView() {
    const { id } = useParams();
    const [family, setFamily] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);

    useEffect(() => {
        loadFamily();
    }, [id]);

    const loadFamily = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/families/${id}`);
            setFamily(response.data.family);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load family");
        } finally {
            setLoading(false);
        }
    };

    const handleRemovePatient = async (patientId) => {
        if (
            !confirm(
                "Are you sure you want to remove this patient from the family?"
            )
        )
            return;

        try {
            await axiosClient.post(`/families/${id}/remove-patient`, {
                patient_id: patientId,
            });
            loadFamily();
        } catch (err) {
            setError("Failed to remove patient");
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!family) return <div>Family not found</div>;

    return (
        <div className="p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Family: {family.family_number}
                        </h1>
                        {family.family_name && (
                            <p className="text-gray-600">
                                {family.family_name}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddPatientModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add Patient to Family
                    </button>
                </div>

                {family.notes && (
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
                        <h2 className="text-lg font-semibold mb-2">Notes</h2>
                        <p>{family.notes}</p>
                    </div>
                )}

                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Family Members
                    </h2>
                    {family.patients && family.patients.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date of Birth
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gender
                                        </th>
                                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {family.patients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <Link
                                                    to={`/patients/${patient.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    {patient.full_name}
                                                </Link>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                {new Date(
                                                    patient.date_of_birth
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap capitalize">
                                                {patient.gender}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    to={`/patients/${patient.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-2 sm:mr-3 cursor-pointer"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleRemovePatient(
                                                            patient.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No patients in this family
                        </p>
                    )}
                </div>
            </div>

            {showAddPatientModal && (
                <AddPatientToFamilyModal
                    familyId={id}
                    onClose={() => setShowAddPatientModal(false)}
                    onSave={() => {
                        loadFamily();
                        setShowAddPatientModal(false);
                    }}
                />
            )}
        </div>
    );
}
