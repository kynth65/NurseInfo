import { useState } from "react";
import axiosClient from "../../axios-client";

export default function NewVisitForm({ patientId, onClose, onSave }) {
    const [formData, setFormData] = useState({
        blood_pressure: "",
        heart_rate: "",
        temperature: "",
        respiratory_rate: "",
        weight: "",
        height: "",
        present_illness: "",
        symptoms: "",
        diagnosis: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const calculateBMI = () => {
        if (formData.weight && formData.height) {
            const heightInMeters = formData.height / 100;
            return (
                formData.weight /
                (heightInMeters * heightInMeters)
            ).toFixed(1);
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const bmi = calculateBMI();
            const dataToSubmit = {
                ...formData,
                bmi,
            };

            await axiosClient.post(
                `/patients/${patientId}/visits`,
                dataToSubmit
            );
            onSave();
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: "Failed to create visit record" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-100 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">New Visit Record</h2>

                {errors.general && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Blood Pressure
                            </label>
                            <input
                                type="text"
                                value={formData.blood_pressure}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        blood_pressure: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.blood_pressure
                                        ? "border-red-500"
                                        : ""
                                }`}
                                placeholder="120/80"
                                required
                            />
                            {errors.blood_pressure && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.blood_pressure}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Heart Rate (bpm)
                            </label>
                            <input
                                type="number"
                                value={formData.heart_rate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        heart_rate: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.heart_rate ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.heart_rate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.heart_rate}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Temperature (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.temperature}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        temperature: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.temperature ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.temperature && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.temperature}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Respiratory Rate
                            </label>
                            <input
                                type="number"
                                value={formData.respiratory_rate}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        respiratory_rate: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.respiratory_rate
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {errors.respiratory_rate && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.respiratory_rate}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.weight}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        weight: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.weight ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.weight && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.weight}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Height (cm)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.height}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        height: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.height ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {errors.height && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.height}
                                </p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <div className="p-3 bg-gray-50 rounded">
                                <p className="text-sm font-medium">
                                    Calculated BMI:
                                </p>
                                <p className="text-lg">
                                    {calculateBMI() ||
                                        "Enter weight and height"}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Present Illness
                            </label>
                            <textarea
                                value={formData.present_illness}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        present_illness: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.present_illness
                                        ? "border-red-500"
                                        : ""
                                }`}
                                rows={3}
                                required
                            />
                            {errors.present_illness && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.present_illness}
                                </p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Symptoms
                            </label>
                            <textarea
                                value={formData.symptoms}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        symptoms: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.symptoms ? "border-red-500" : ""
                                }`}
                                rows={3}
                                required
                            />
                            {errors.symptoms && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.symptoms}
                                </p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Nursing Diagnosis
                            </label>
                            <textarea
                                value={formData.diagnosis}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        diagnosis: e.target.value,
                                    })
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.diagnosis ? "border-red-500" : ""
                                }`}
                                rows={3}
                                required
                            />
                            {errors.diagnosis && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.diagnosis}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Visit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
