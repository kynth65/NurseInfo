import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import axiosClient from "../../axios-client";
import Loading from "../Loading";

export default function FamilyForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [family, setFamily] = useState({
        family_number: "",
        family_name: "",
        notes: "",
    });
    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            loadFamily();
        }
    }, [id]);

    const loadFamily = async () => {
        try {
            const response = await axiosClient.get(`/families/${id}`);
            setFamily(response.data.family);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load family");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFamily({ ...family, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (isEditMode) {
                await axiosClient.put(`/families/${id}`, family);
            } else {
                await axiosClient.post("/families", family);
            }
            navigate("/families");
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                `Failed to ${isEditMode ? "update" : "create"} family`;
            setError(errorMessage);
            setSaving(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">
                    {isEditMode ? "Edit Family" : "Create New Family"}
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Family Number *
                        </label>
                        <input
                            type="text"
                            name="family_number"
                            value={family.family_number}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Family Name
                        </label>
                        <input
                            type="text"
                            name="family_name"
                            value={family.family_name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={family.notes}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/families")}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        >
                            {saving ? (
                                "Saving..."
                            ) : (
                                <>
                                    {!isEditMode && (
                                        <Plus className="w-4 h-4 mr-2" />
                                    )}
                                    {isEditMode
                                        ? "Update Family"
                                        : "Create Family"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
