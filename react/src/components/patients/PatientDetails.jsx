import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function PatientDetails() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPatient();
    }, [id]);

    const loadPatient = async () => {
        try {
            const response = await axiosClient.get(`/patients/${id}`);
            setPatient(response.data.patient);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load patient");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">{patient.full_name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Personal Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="font-medium">
                                Date of Birth:
                            </label>
                            <p>{patient.date_of_birth}</p>
                        </div>
                        {/* Add all other personal information fields */}
                    </div>
                </div>

                {/* Medical History */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Medical History
                    </h2>
                    <div className="space-y-4">
                        {/* Add all medical history fields */}
                    </div>
                </div>

                {/* Lifestyle Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Lifestyle Information
                    </h2>
                    <div className="space-y-4">
                        {/* Add all lifestyle fields */}
                    </div>
                </div>

                {/* Visit History */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Visit History
                    </h2>
                    {/* Add visit history table or list */}
                </div>
            </div>
        </div>
    );
}
