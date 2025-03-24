import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Plus, Search, Users, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { NewFamilyModal } from "./NewFamilyModal";

export default function FamilyList() {
    const [families, setFamilies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewFamilyModal, setShowNewFamilyModal] = useState(false);

    useEffect(() => {
        loadFamilies();
    }, []);

    const loadFamilies = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/families");
            setFamilies(response.data.families);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load families");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this family?")) return;

        try {
            await axiosClient.delete(`/families/${id}`);
            loadFamilies();
        } catch (err) {
            setError("Failed to delete family");
        }
    };

    const filteredFamilies = families.filter(
        (family) =>
            family.family_number
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (family.family_name &&
                family.family_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Family Units</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search families..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg"
                        />
                        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <button
                        onClick={() => setShowNewFamilyModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Family
                    </button>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Family Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Family Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Members
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFamilies.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No families found
                                </td>
                            </tr>
                        ) : (
                            filteredFamilies.map((family) => (
                                <tr key={family.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/families/${family.id}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            {family.family_number}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {family.family_name || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {family.patients?.length || 0} patients
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/families/${family.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            <Users className="w-5 h-5 inline" />
                                        </Link>
                                        <Link
                                            to={`/families/${family.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-900 mr-3"
                                        >
                                            <Edit className="w-5 h-5 inline" />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(family.id)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash className="w-5 h-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showNewFamilyModal && (
                <NewFamilyModal
                    onClose={() => setShowNewFamilyModal(false)}
                    onSave={() => {
                        loadFamilies();
                        setShowNewFamilyModal(false);
                    }}
                />
            )}
        </div>
    );
}
