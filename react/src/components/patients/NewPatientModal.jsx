import { useState } from "react";
import axiosClient from "../../axios-client";

export default function NewPatientModal({ onClose, onSave }) {
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
        // Medical History
        past_illnesses: "",
        family_history: "",
        allergies: "",
        current_medications: "",
        previous_surgeries: "",
        previous_hospitalizations: "",
        immunization_history: "",
        // Lifestyle Information
        smoking_history: "",
        alcohol_consumption: "",
        exercise_habits: "",
        diet_restrictions: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/patients", formData);
            onSave(response.data.patient);
        } catch (err) {
            console.error("Failed to create patient:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-100 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div>
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

                    {/* Medical History Section */}
                    <div className="col-span-2 mt-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Medical History
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Past Illnesses
                                </label>
                                <textarea
                                    value={formData.past_illnesses}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            past_illnesses: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Family History
                                </label>
                                <textarea
                                    value={formData.family_history}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            family_history: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Allergies
                                </label>
                                <textarea
                                    value={formData.allergies}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            allergies: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Current Medications
                                </label>
                                <textarea
                                    value={formData.current_medications}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            current_medications: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Previous Surgeries
                                </label>
                                <textarea
                                    value={formData.previous_surgeries}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            previous_surgeries: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Previous Hospitalizations
                                </label>
                                <textarea
                                    value={formData.previous_hospitalizations}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            previous_hospitalizations:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Immunization History
                                </label>
                                <textarea
                                    value={formData.immunization_history}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            immunization_history:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lifestyle Information Section */}
                    <div className="col-span-2 mt-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Lifestyle Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Smoking History
                                </label>
                                <select
                                    value={formData.smoking_history}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            smoking_history: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Option</option>
                                    <option value="never">Never Smoked</option>
                                    <option value="former">
                                        Former Smoker
                                    </option>
                                    <option value="current">
                                        Current Smoker
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Alcohol Consumption
                                </label>
                                <select
                                    value={formData.alcohol_consumption}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            alcohol_consumption: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Option</option>
                                    <option value="never">Never</option>
                                    <option value="occasional">
                                        Occasional
                                    </option>
                                    <option value="moderate">Moderate</option>
                                    <option value="frequent">Frequent</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Exercise Habits
                                </label>
                                <select
                                    value={formData.exercise_habits}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            exercise_habits: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Option</option>
                                    <option value="sedentary">Sedentary</option>
                                    <option value="light">
                                        Light Exercise
                                    </option>
                                    <option value="moderate">
                                        Moderate Exercise
                                    </option>
                                    <option value="active">Very Active</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Diet Restrictions
                                </label>
                                <textarea
                                    value={formData.diet_restrictions}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            diet_restrictions: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
