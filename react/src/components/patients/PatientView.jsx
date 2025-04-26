import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { Plus, Download, Users, UserPlus } from "lucide-react";
import { format } from "date-fns";
import NewVisitForm from "./NewVisitForm";
import Loading from "../Loading";
import html2pdf from "html2pdf.js";
import { SelectFamilyModal } from "../families/SelectFamilyModal";

export default function PatientView() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [visits, setVisits] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewVisitForm, setShowNewVisitForm] = useState(false);
    const [showFamilyModal, setShowFamilyModal] = useState(false);

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

            // If patient has a family, load family members
            if (patientRes.data.patient.family_id) {
                loadFamilyMembers(patientRes.data.patient.family_id);
            }
        } catch (err) {
            console.error("Failed to load data:", err);
        } finally {
            setLoading(false);
        }
    };

    const loadFamilyMembers = async (familyId) => {
        try {
            const response = await axiosClient.get(`/families/${familyId}`);
            // Filter out current patient from family members
            const members = response.data.family.patients.filter(
                (member) => member.id !== parseInt(id)
            );
            setFamilyMembers(members);
        } catch (err) {
            console.error("Failed to load family members:", err);
        }
    };

    const handleAddToFamily = async (familyId) => {
        try {
            await axiosClient.patch(`/patients/${id}/family`, {
                family_id: familyId,
            });
            loadPatientAndVisits();
            setShowFamilyModal(false);
        } catch (err) {
            console.error("Failed to add patient to family:", err);
        }
    };

    const handleRemoveFromFamily = async () => {
        if (
            !confirm(
                "Are you sure you want to remove this patient from their family?"
            )
        )
            return;

        try {
            await axiosClient.patch(`/patients/${id}/family`, {
                family_id: null,
            });
            loadPatientAndVisits();
        } catch (err) {
            console.error("Failed to remove patient from family:", err);
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
                        ${
                            patient.family_id
                                ? `<tr>
                                <td style="padding: 5px;"><strong>Family Number:</strong></td>
                                <td style="padding: 5px;" colspan="3">${
                                    patient.family
                                        ? patient.family.family_number
                                        : "Not available"
                                }</td>
                            </tr>`
                                : ""
                        }
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
        <div className="p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with patient name and buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-xl uppercase sm:text-2xl font-bold">
                        {patient.full_name}
                    </h1>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => generatePDF()}
                            className="bg-violet-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">
                                Download PDF
                            </span>
                            <span className="sm:hidden">PDF</span>
                        </button>
                        <button
                            onClick={() => setShowNewVisitForm(true)}
                            className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">New Visit</span>
                            <span className="sm:hidden">Visit</span>
                        </button>
                        {!patient.family_id ? (
                            <button
                                onClick={() => setShowFamilyModal(true)}
                                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                            >
                                <Users className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    Add to Family
                                </span>
                                <span className="sm:hidden">Add Family</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleRemoveFromFamily}
                                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                            >
                                <Users className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    Remove from Family
                                </span>
                                <span className="sm:hidden">Remove</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Patient Information Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {/* Personal Information */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            {patient.family_id && (
                                <div className="col-span-1 sm:col-span-2">
                                    <p className="text-sm text-gray-600">
                                        Family
                                    </p>
                                    <div className="flex items-center">
                                        <Link
                                            to={`/families/${patient.family_id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            {patient.family
                                                ? patient.family.family_number
                                                : "Family #" +
                                                  patient.family_id}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
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
                                <p className="break-words">{patient.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
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
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
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

                {/* Family Members Section - Only show if patient has a family */}
                {patient.family_id && familyMembers.length > 0 && (
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Family Members
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {familyMembers.map((member) => (
                                <Link
                                    key={member.id}
                                    to={`/patients/${member.id}`}
                                    className="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="font-medium">
                                        {member.full_name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {format(
                                            new Date(member.date_of_birth),
                                            "MMM d, yyyy"
                                        )}{" "}
                                        • {member.gender}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Visits History */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Visit History
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Date
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Vital Signs
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Present Illness
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Diagnosis
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {visits.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-3 sm:px-6 py-4 text-center text-gray-500"
                                        >
                                            No visits recorded
                                        </td>
                                    </tr>
                                ) : (
                                    visits.map((visit) => (
                                        <tr key={visit.id}>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                {format(
                                                    new Date(visit.created_at),
                                                    "MMM d, yyyy"
                                                )}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
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
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                {visit.present_illness}
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                {visit.diagnosis}
                                            </td>
                                        </tr>
                                    ))
                                )}
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

            {/* Family Modal */}
            {showFamilyModal && (
                <SelectFamilyModal
                    onClose={() => setShowFamilyModal(false)}
                    onSelectFamily={handleAddToFamily}
                />
            )}
        </div>
    );
}
