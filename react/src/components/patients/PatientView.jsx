import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import NewVisitForm from "./NewVisitForm";

export default function PatientView() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewVisitForm, setShowNewVisitForm] = useState(false);

    useEffect(() => {
        loadPatientAndVisits();
    }, [id]);

    const loadPatientAndVisits = async () => {
        try {
            const [patientRes, visitsRes] = await Promise.all([
                axiosClient.get(`/patients/${id}`),
                axiosClient.get(`/patients/${id}/visits`),
            ]);
            setPatient(patientRes.data.patient);
            setVisits(visitsRes.data.visits);
        } catch (err) {
            console.error("Failed to load data:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with patient name and add visit button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{patient.full_name}</h1>
                    <button
                        onClick={() => setShowNewVisitForm(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Visit
                    </button>
                </div>

                {/* Patient Information Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Personal Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Date of Birth
                                </p>
                                <p>
                                    {format(
                                        new Date(patient.date_of_birth),
                                        "MMM d, yyyy"
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Gender</p>
                                <p className="capitalize">{patient.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Civil Status
                                </p>
                                <p className="capitalize">
                                    {patient.civil_status}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Blood Type
                                </p>
                                <p>{patient.blood_type || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Contact Information
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Contact Number
                                </p>
                                <p>{patient.contact_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p>{patient.email || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p>{patient.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Medical History
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Past Illnesses
                                </p>
                                <p>
                                    {patient.past_illnesses || "None recorded"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Allergies
                                </p>
                                <p>{patient.allergies || "None recorded"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Current Medications
                                </p>
                                <p>
                                    {patient.current_medications ||
                                        "None recorded"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lifestyle Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Lifestyle Information
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Smoking History
                                </p>
                                <p>
                                    {patient.smoking_history || "Not specified"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Alcohol Consumption
                                </p>
                                <p>
                                    {patient.alcohol_consumption ||
                                        "Not specified"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    Exercise Habits
                                </p>
                                <p>
                                    {patient.exercise_habits || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visits History */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Visit History
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Vital Signs
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Present Illness
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Diagnosis
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {visits.map((visit) => (
                                    <tr key={visit.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {format(
                                                new Date(visit.created_at),
                                                "MMM d, yyyy"
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                BP: {visit.blood_pressure}
                                            </div>
                                            <div>
                                                HR: {visit.heart_rate} bpm
                                            </div>
                                            <div>
                                                Temp: {visit.temperature}°C
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {visit.present_illness}
                                        </td>
                                        <td className="px-6 py-4">
                                            {visit.diagnosis}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* New Visit Form Modal */}
            {showNewVisitForm && (
                <NewVisitForm
                    patientId={id}
                    onClose={() => setShowNewVisitForm(false)}
                    onSave={() => {
                        setShowNewVisitForm(false);
                        loadPatientAndVisits();
                    }}
                />
            )}
        </div>
    );
}
