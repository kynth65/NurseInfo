import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { Plus, Download } from "lucide-react";
import { format } from "date-fns";
import NewVisitForm from "./NewVisitForm";
import Loading from "../Loading";
import html2pdf from "html2pdf.js";

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
    const generatePDF = () => {
        // Create a new div for PDF content
        const pdfContent = document.createElement("div");
        pdfContent.innerHTML = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h1 style="font-size: 24px; margin-bottom: 20px;">${
                    patient.full_name
                } - Medical Record</h1>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 10px;">Personal Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 5px; width: 150px;"><strong>Date of Birth:</strong></td>
                            <td style="padding: 5px;">${format(
                                new Date(patient.date_of_birth),
                                "MMM d, yyyy"
                            )}</td>
                            <td style="padding: 5px; width: 150px;"><strong>Gender:</strong></td>
                            <td style="padding: 5px;">${patient.gender}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Civil Status:</strong></td>
                            <td style="padding: 5px;">${
                                patient.civil_status
                            }</td>
                            <td style="padding: 5px;"><strong>Blood Type:</strong></td>
                            <td style="padding: 5px;">${
                                patient.blood_type || "Not specified"
                            }</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 10px;">Contact Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 5px; width: 150px;"><strong>Contact Number:</strong></td>
                            <td style="padding: 5px;">${
                                patient.contact_number
                            }</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Email:</strong></td>
                            <td style="padding: 5px;">${
                                patient.email || "Not provided"
                            }</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Address:</strong></td>
                            <td style="padding: 5px;">${patient.address}</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 10px;">Medical History</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 5px; width: 150px;"><strong>Past Illnesses:</strong></td>
                            <td style="padding: 5px;">${
                                patient.past_illnesses || "None recorded"
                            }</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Allergies:</strong></td>
                            <td style="padding: 5px;">${
                                patient.allergies || "None recorded"
                            }</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Current Medications:</strong></td>
                            <td style="padding: 5px;">${
                                patient.current_medications || "None recorded"
                            }</td>
                        </tr>
                    </table>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 18px; margin-bottom: 10px;">Visit History</h2>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Date</th>
                                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Vital Signs</th>
                                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Present Illness</th>
                                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Diagnosis</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${visits
                                .map(
                                    (visit) => `
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${format(
                                        new Date(visit.created_at),
                                        "MMM d, yyyy"
                                    )}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd;">
                                        BP: ${visit.blood_pressure}<br>
                                        HR: ${visit.heart_rate} bpm<br>
                                        Temp: ${visit.temperature}°C
                                    </td>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${
                                        visit.present_illness
                                    }</td>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${
                                        visit.diagnosis
                                    }</td>
                                </tr>
                            `
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Configure PDF options
        const opt = {
            margin: 1,
            filename: `${patient.full_name}_medical_record.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        // Generate PDF
        html2pdf().from(pdfContent).set(opt).save();
    };

    if (loading) return <Loading />;
    if (!patient) return <div>Patient not found</div>;

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with patient name and add visit button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{patient.full_name}</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => generatePDF()}
                            className="bg-violet-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                        <button
                            onClick={() => setShowNewVisitForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            New Visit
                        </button>
                    </div>
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
