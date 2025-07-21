import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash, Users } from "lucide-react";

export default function PatientTable({
    patients,
    searchTerm,
    onRefresh,
    onDelete,
}) {
    const navigate = useNavigate();

    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            patient.full_name.toLowerCase().includes(searchLower) ||
            patient.contact_number.toLowerCase().includes(searchLower) ||
            (patient.email &&
                patient.email.toLowerCase().includes(searchLower)) ||
            (patient.family &&
                patient.family.family_number &&
                patient.family.family_number
                    .toLowerCase()
                    .includes(searchLower))
        );
    });

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    // Confirm deletion
    const confirmDelete = (e, id, name) => {
        e.stopPropagation(); // Stop event from bubbling up to the row click
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            onDelete(id);
        }
    };

    // Navigate to patient details
    const handleRowClick = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    // Handle family link click
    const handleFamilyClick = (e, familyId) => {
        e.stopPropagation(); // Prevent row click event
        navigate(`/families/${familyId}`);
    };

    return (
        <div className="bg-white shadow overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Demographics
                        </th>
                        <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </th>
                        <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Family
                        </th>
                        <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Visit
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="px-3 sm:px-6 py-4 text-center text-gray-500"
                            >
                                No patients found
                            </td>
                        </tr>
                    ) : (
                        filteredPatients.map((patient) => (
                            <tr
                                key={patient.id}
                                onClick={() => handleRowClick(patient.id)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                            >
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <span className="text-blue-600 font-medium">
                                        {patient.full_name}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {calculateAge(patient.date_of_birth)}{" "}
                                        years
                                    </div>
                                    <div className="text-sm text-gray-500 capitalize">
                                        {patient.gender}
                                    </div>
                                </td>
                                <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {patient.contact_number}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {patient.email || "No email"}
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    {patient.family_id ? (
                                        <button
                                            onClick={(e) =>
                                                handleFamilyClick(
                                                    e,
                                                    patient.family_id
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-900 flex items-center cursor-pointer"
                                        >
                                            <Users className="w-4 h-4 mr-1" />
                                            {patient.family &&
                                            patient.family.family_number
                                                ? patient.family.family_number
                                                : `Family #${patient.family_id}`}
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">
                                            No family
                                        </span>
                                    )}
                                </td>
                                <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    {patient.visits &&
                                    patient.visits.length > 0 ? (
                                        format(
                                            new Date(
                                                patient.visits[
                                                    patient.visits.length - 1
                                                ].created_at
                                            ),
                                            "MMM d, yyyy"
                                        )
                                    ) : (
                                        <span className="text-gray-500">
                                            No visits
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                                `/patients/${patient.id}/edit`
                                            );
                                        }}
                                        className="text-yellow-600 hover:text-yellow-900 mr-2 sm:mr-3 cursor-pointer"
                                    >
                                        <Edit className="w-4 h-4 sm:w-5 sm:h-5 inline" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            confirmDelete(
                                                e,
                                                patient.id,
                                                patient.full_name
                                            );
                                        }}
                                        className="text-red-600 hover:text-red-900 cursor-pointer"
                                    >
                                        <Trash className="w-4 h-4 sm:w-5 sm:h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
