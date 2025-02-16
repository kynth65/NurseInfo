import { Edit, Trash2, Eye } from "lucide-react";
import { format, differenceInYears } from "date-fns"; // Import differenceInYears
import { Link } from "react-router-dom"; // Import Link for edit navigation

export default function PatientTable({
    patients,
    searchTerm,
    onRefresh,
    onDelete,
}) {
    const calculateAge = (dateOfBirth) => {
        return differenceInYears(new Date(), new Date(dateOfBirth));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await axiosClient.delete(`/patients/${id}`);
                onRefresh();
            } catch (err) {
                console.error("Failed to delete patient:", err);
            }
        }
    };

    const filteredPatients = patients.filter(
        (patient) =>
            patient.full_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            patient.contact_number.includes(searchTerm)
    );

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Age/Gender
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Latest Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">
                                    {patient.full_name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {calculateAge(patient.date_of_birth)} /{" "}
                                {patient.gender}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>{patient.contact_number}</div>
                                <div className="text-sm text-gray-500">
                                    {patient.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {patient.latest_visit
                                    ? format(
                                          new Date(patient.latest_visit),
                                          "MMM d, yyyy"
                                      )
                                    : "No visits yet"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex gap-2">
                                    <Link
                                        to={`/patients/${patient.id}/view`}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to={`/patients/${patient.id}/edit`}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(patient.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
