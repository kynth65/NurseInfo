import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function EditPatient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: "",
        date_of_birth: "",
        gender: "",
        civil_status: "",
        contact_number: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        address: "",
        email: "",
        occupation: "",
        blood_type: "",
    });

    useEffect(() => {
        loadPatient();
    }, []);

    const loadPatient = async () => {
        try {
            const response = await axiosClient.get(`/patients/${id}`);
            setFormData(response.data.patient);
        } catch (err) {
            console.error("Failed to load patient:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`/patients/${id}`, formData);
            navigate("/patients");
        } catch (err) {
            console.error("Failed to update patient:", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-white p-6 rounded-lg shadow"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        full_name: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date_of_birth: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Gender
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Civil Status
                            </label>
                            <select
                                value={formData.civil_status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        civil_status: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Civil Status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="widowed">Widowed</option>
                                <option value="divorced">Divorced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                value={formData.contact_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contact_number: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Emergency Contact Name
                            </label>
                            <input
                                type="text"
                                value={formData.emergency_contact_name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        emergency_contact_name: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Emergency Contact Number
                            </label>
                            <input
                                type="text"
                                value={formData.emergency_contact_number}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        emergency_contact_number:
                                            e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Address
                            </label>
                            <textarea
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                                rows={3}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Occupation (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.occupation}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        occupation: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Blood Type (Optional)
                            </label>
                            <select
                                value={formData.blood_type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        blood_type: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Blood Type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/patients")}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Update Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
