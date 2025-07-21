import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaHandHoldingMedical } from "react-icons/fa";
import PhilPENPdfGenerator from "./PhilPENpdfGenerator";
import axiosClient from "../../axios-client";
import Loading from "../Loading"; // Make sure you have this component

const RiskAssessment = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isNewAssessment =
        new URLSearchParams(location.search).get("new") === "true";
    const [viewExisting, setViewExisting] = useState(false);
    const [existingAssessment, setExistingAssessment] = useState(null);

    // Add loading state for patient data
    const [loading, setLoading] = useState(patientId ? true : false);
    const [patient, setPatient] = useState(null);

    // Add states for saving assessment
    const [pdfBlob, setPdfBlob] = useState(null);
    const [savingAssessment, setSavingAssessment] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Add view state to switch between form and PDF preview
    const [currentView, setCurrentView] = useState("form");

    const [formData, setFormData] = useState({
        // Patient Information
        healthFacility: "",
        assessmentDate: "",
        patientName: "",
        age: "",
        sex: "",
        birthdate: "",
        phicNo: "",
        civilStatus: "",
        religion: "",
        contactNo: "",
        address: "",
        disabilityIDCard: "",
        employmentStatus: "",
        employmentType: "",
        ethnicity: "",

        // Red Flags
        chestPain: "",
        difficultyBreathing: "",
        lossOfConsciousness: "",
        slurredSpeech: "",
        facialAsymmetry: "",
        weakness: "",
        disoriented: "",
        chestRetractions: "",
        seizure: "",
        selfHarm: "",
        agitatedBehavior: "",
        eyeInjury: "",
        severeInjuries: "",

        // Past Medical History
        historyHypertension: "",
        historyHeartDisease: "",
        historyDiabetes: "",
        historyCancer: "",
        historyCOPD: "",
        historyAsthma: "",
        historyAllergies: "",
        historyMental: "",
        historyVision: "",
        historySurgical: "",
        historyThyroid: "",
        historyKidney: "",

        // Family History
        familyHypertension: "",
        familyStroke: "",
        familyHeartDisease: "",
        familyDiabetes: "",
        familyAsthma: "",
        familyCancer: "",
        familyKidney: "",
        familyPrematureCoronary: "",
        familyTB: "",
        familyMental: "",
        familyCOPD: "",

        // NCD Risk Factors
        tobaccoUse: "",
        tobaccoExposure: "",
        formerTobaccoUser: "",
        currentTobaccoUser: "",
        alcoholConsumption: "",
        alcoholFrequency: "",
        physicalActivity: "",

        // Nutrition and Dietary Assessment
        highFatFood: "",
        highSugarFood: "",

        // Measurements
        weight: "",
        height: "",
        bmi: "",
        waistCircumference: "",
        bloodPressure: "",

        // Risk Screening
        bloodSugar: "",
        fbsResult: "",
        rbsResult: "",
        dmSymptoms: {
            polyphagia: false,
            polydipsia: false,
            polyuria: false,
        },

        // Lipid Profile
        totalCholesterol: "",
        hdl: "",
        ldl: "",
        vldl: "",
        triglyceride: "",

        // Urinalysis
        protein: "",
        ketones: "",

        // Respiratory Assessment
        breathlessness: false,
        chronicCough: false,
        sputumProduction: false,
        chestTightness: false,
        wheezing: false,
        pefrResult: "",

        // Management
        lifestyleModification: "",
        medications: {
            antiHypertensives: "",
            oralHypoglycemic: "",
        },
        followUpDate: "",
        remarks: "",
    });

    // Form validation state
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            if (name.includes(".")) {
                const [parent, child] = name.split(".");
                setFormData({
                    ...formData,
                    [parent]: {
                        ...formData[parent],
                        [child]: checked,
                    },
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: checked,
                });
            }
        } else {
            if (name.includes(".")) {
                const [parent, child] = name.split(".");
                setFormData({
                    ...formData,
                    [parent]: {
                        ...formData[parent],
                        [child]: value,
                    },
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        }

        // Clear error for this field when user types
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    // Calculate BMI whenever weight or height changes
    useEffect(() => {
        if (formData.weight && formData.height) {
            const heightInMeters = parseFloat(formData.height) / 100;
            const bmi = (
                parseFloat(formData.weight) /
                (heightInMeters * heightInMeters)
            ).toFixed(2);
            setFormData((prev) => ({
                ...prev,
                bmi: bmi,
            }));
        }
    }, [formData.weight, formData.height]);

    useEffect(() => {
        const loadPatient = async () => {
            if (!patientId) return;

            try {
                setLoading(true);

                // Get URL search params to check if we're creating a new assessment
                const urlParams = new URLSearchParams(window.location.search);
                const isNewAssessment = urlParams.get("new") === "true";

                // Get patient data
                const response = await axiosClient.get(
                    `/patients/${patientId}`
                );
                const patientData = response.data.patient;
                setPatient(patientData);

                // Check if patient has existing assessment (if we're not explicitly creating a new one)
                if (!isNewAssessment) {
                    try {
                        const assessmentCheck = await axiosClient.get(
                            `/patients/${patientId}/risk-assessment/check`
                        );

                        if (
                            assessmentCheck.data.has_assessment &&
                            assessmentCheck.data.latest_assessment
                        ) {
                            const existingData =
                                assessmentCheck.data.latest_assessment;

                            // If existing assessment has form data, use it
                            if (existingData.form_data) {
                                // Important: Convert any date fields that might be in the form_data
                                if (existingData.form_data.assessmentDate) {
                                    existingData.form_data.assessmentDate =
                                        new Date(
                                            existingData.form_data.assessmentDate
                                        )
                                            .toISOString()
                                            .substring(0, 10);
                                }

                                if (existingData.form_data.birthdate) {
                                    existingData.form_data.birthdate = new Date(
                                        existingData.form_data.birthdate
                                    )
                                        .toISOString()
                                        .substring(0, 10);
                                }

                                // Set existing assessment data for view mode
                                setExistingAssessment(existingData);

                                // Update form data with existing assessment data
                                setFormData(existingData.form_data);

                                // Go directly to PDF view
                                setViewExisting(true);
                                setCurrentView("pdf");
                                return; // Skip the pre-filling below since we already have all data
                            }
                        }
                    } catch (error) {
                        console.error(
                            "Error checking for existing assessments:",
                            error
                        );
                        // Continue with normal flow if we can't check for existing assessments
                    }
                }

                // Pre-fill patient information (only if we're not using existing assessment data)
                setFormData((prev) => ({
                    ...prev,
                    assessmentDate: new Date().toISOString().substring(0, 10), // Set today as default
                    patientName: patientData.full_name,
                    age: patientData.age || "",
                    sex:
                        patientData.gender === "male"
                            ? "Male"
                            : patientData.gender === "female"
                            ? "Female"
                            : "",
                    birthdate: patientData.date_of_birth
                        ? new Date(patientData.date_of_birth)
                              .toISOString()
                              .substring(0, 10)
                        : "",
                    civilStatus: patientData.civil_status || "",
                    contactNo: patientData.contact_number || "",
                    address: patientData.address || "",

                    // Pre-fill medical history if available
                    historyHypertension: patientData.past_illnesses
                        ?.toLowerCase()
                        .includes("hypertension")
                        ? "Yes"
                        : "",
                    historyDiabetes: patientData.past_illnesses
                        ?.toLowerCase()
                        .includes("diabetes")
                        ? "Yes"
                        : "",
                    historyAllergies: patientData.allergies ? "Yes" : "",

                    // Pre-fill lifestyle information
                    tobaccoUse: patientData.smoking_history
                        ?.toLowerCase()
                        .includes("never")
                        ? "Q1"
                        : patientData.smoking_history
                              ?.toLowerCase()
                              .includes("former")
                        ? "Q3"
                        : patientData.smoking_history
                        ? "Q4"
                        : "",
                    alcoholConsumption: patientData.alcohol_consumption
                        ? "Yes"
                        : "Never",
                }));
            } catch (error) {
                console.error("Error loading patient data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPatient();
    }, [patientId]);

    // Validate form fields
    const validateForm = () => {
        const errors = {};
        const requiredFields = [
            "patientName",
            "age",
            "sex",
            "birthdate",
            "contactNo",
            "address",
        ];

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                errors[field] = `${field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())} is required`;
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before generating PDF
        if (!validateForm()) {
            // If validation fails, scroll to the first error
            const firstErrorField = Object.keys(formErrors)[0];
            const errorElement = document.getElementsByName(firstErrorField)[0];
            if (errorElement) {
                errorElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            return;
        }

        // Switch to PDF preview
        setCurrentView("pdf");
    };

    const handleSaveAssessment = async (pdfBlob) => {
        if (!pdfBlob || !patientId) {
            console.error("Missing PDF blob or patient ID!");
            return;
        }

        try {
            setSavingAssessment(true);
            console.log("Starting save with PDF blob size:", pdfBlob.size);

            // Create FormData object for file upload
            const formDataToSend = new FormData();
            formDataToSend.append("patient_id", patientId);

            // Log form data before stringifying
            console.log("Form data being saved:", formData);

            const formDataJson = JSON.stringify(formData);
            formDataToSend.append("form_data", formDataJson);

            formDataToSend.append(
                "assessment_date",
                formData.assessmentDate || new Date().toISOString()
            );

            // Create a File object from the Blob
            const pdfFile = new File(
                [pdfBlob],
                `risk_assessment_${patientId}.pdf`,
                { type: "application/pdf" }
            );
            formDataToSend.append("pdf_file", pdfFile);

            console.log("Sending request to server");

            // Send to server
            const response = await axiosClient.post(
                "/risk-assessments",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Server response:", response.data);
            setSaveSuccess(true);

            // Navigate back to patient view after successful save
            setTimeout(() => {
                navigate(`/patients/${patientId}`);
            }, 2000);
        } catch (error) {
            console.error("Error saving risk assessment:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            alert(
                "Failed to save: " +
                    (error.response?.data?.message || error.message)
            );
        } finally {
            setSavingAssessment(false);
        }
    };

    // Helper for radio button groups
    const RadioGroup = ({ name, value, onChange }) => (
        <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name={name}
                    value="Yes"
                    checked={value === "Yes"}
                    onChange={onChange}
                    className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name={name}
                    value="No"
                    checked={value === "No"}
                    onChange={onChange}
                    className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-2 text-gray-700">No</span>
            </label>
        </div>
    );

    const handleBack = () => {
        if (viewExisting) {
            // If viewing an existing assessment, go back to patient view
            navigate(`/patients/${patientId}`);
        } else {
            // Otherwise go back to form
            setCurrentView("form");
        }
    };

    return (
        <>
            {currentView === "form" ? (
                <div className="bg-gray-50 min-h-screen">
                    {/* Header Section */}
                    <div className="py-6 border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center space-x-3">
                                <FaHandHoldingMedical className="h-6 w-6 text-purple-600" />
                                <h1 className="text-xl font-semibold text-gray-800">
                                    PhilPEN Risk Assessment Form
                                </h1>
                            </div>
                            <p className="mt-1 text-center text-gray-500 text-sm">
                                Adults ≥20 years old
                            </p>
                            <p className="mt-1 text-center text-purple-600 font-medium">
                                Patient:{" "}
                                {patient?.full_name || formData.patientName}
                            </p>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Form Header */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name of Health Facility
                                        </label>
                                        <input
                                            type="text"
                                            name="healthFacility"
                                            value={formData.healthFacility}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Assessment
                                        </label>
                                        <input
                                            type="date"
                                            name="assessmentDate"
                                            value={formData.assessmentDate}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* I. PATIENT'S INFORMATION */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        I. PATIENT'S INFORMATION
                                    </h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Patient Name (SURNAME, Given
                                                Name, Middle Name)*
                                            </label>
                                            <input
                                                type="text"
                                                name="patientName"
                                                value={formData.patientName}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.patientName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            />
                                            {formErrors.patientName && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.patientName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Age*
                                            </label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.age
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            />
                                            {formErrors.age && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.age}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Sex*
                                            </label>
                                            <select
                                                name="sex"
                                                value={formData.sex}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.sex
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </select>
                                            {formErrors.sex && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.sex}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Birthdate*
                                            </label>
                                            <input
                                                type="date"
                                                name="birthdate"
                                                value={formData.birthdate}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.birthdate
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            />
                                            {formErrors.birthdate && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.birthdate}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                PHIC No.
                                            </label>
                                            <input
                                                type="text"
                                                name="phicNo"
                                                value={formData.phicNo}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Civil Status
                                            </label>
                                            <select
                                                name="civilStatus"
                                                value={formData.civilStatus}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="">Select</option>
                                                <option value="Single">
                                                    Single
                                                </option>
                                                <option value="Married">
                                                    Married
                                                </option>
                                                <option value="Widowed">
                                                    Widowed
                                                </option>
                                                <option value="Separated">
                                                    Separated
                                                </option>
                                                <option value="Divorced">
                                                    Divorced
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Religion
                                            </label>
                                            <input
                                                type="text"
                                                name="religion"
                                                value={formData.religion}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact No.*
                                            </label>
                                            <input
                                                type="text"
                                                name="contactNo"
                                                value={formData.contactNo}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.contactNo
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            />
                                            {formErrors.contactNo && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.contactNo}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Patient's Address*
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows="2"
                                                className={`block w-full px-4 py-2 border ${
                                                    formErrors.address
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500`}
                                            ></textarea>
                                            {formErrors.address && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {formErrors.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Persons with Disability ID Card
                                                No., if applicable
                                            </label>
                                            <input
                                                type="text"
                                                name="disabilityIDCard"
                                                value={
                                                    formData.disabilityIDCard
                                                }
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Employment Status
                                            </label>
                                            <div className="flex flex-wrap gap-4 mt-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="employmentStatus"
                                                        value="Employed"
                                                        checked={
                                                            formData.employmentStatus ===
                                                            "Employed"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Employed
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="employmentStatus"
                                                        value="Unemployed"
                                                        checked={
                                                            formData.employmentStatus ===
                                                            "Unemployed"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Unemployed
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="employmentStatus"
                                                        value="Self-employed"
                                                        checked={
                                                            formData.employmentStatus ===
                                                            "Self-employed"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Self-employed
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Employment Type
                                            </label>
                                            <div className="flex gap-4 mt-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="employmentType"
                                                        value="IP"
                                                        checked={
                                                            formData.employmentType ===
                                                            "IP"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        IP
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="employmentType"
                                                        value="Non-IP"
                                                        checked={
                                                            formData.employmentType ===
                                                            "Non-IP"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Non-IP
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ethnicity
                                            </label>
                                            <input
                                                type="text"
                                                name="ethnicity"
                                                value={formData.ethnicity}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* II. ASSESS FOR RED FLAGS */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        II. ASSESS FOR RED FLAGS
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.1 Chest Pain
                                            </label>
                                            <RadioGroup
                                                name="chestPain"
                                                value={formData.chestPain}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.2 Difficulty of Breathing
                                            </label>
                                            <RadioGroup
                                                name="difficultyBreathing"
                                                value={
                                                    formData.difficultyBreathing
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.3 Loss of Consciousness
                                            </label>
                                            <RadioGroup
                                                name="lossOfConsciousness"
                                                value={
                                                    formData.lossOfConsciousness
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.4 Slurred Speech
                                            </label>
                                            <RadioGroup
                                                name="slurredSpeech"
                                                value={formData.slurredSpeech}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.5 Facial Asymmetry
                                            </label>
                                            <RadioGroup
                                                name="facialAsymmetry"
                                                value={formData.facialAsymmetry}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.6 Weakness/Numbness on arm of
                                                left on one side of the body
                                            </label>
                                            <RadioGroup
                                                name="weakness"
                                                value={formData.weakness}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.7 Disoriented as to time,
                                                place and person
                                            </label>
                                            <RadioGroup
                                                name="disoriented"
                                                value={formData.disoriented}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.8 Chest Retractions
                                            </label>
                                            <RadioGroup
                                                name="chestRetractions"
                                                value={
                                                    formData.chestRetractions
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.9 Seizure or Convulsion
                                            </label>
                                            <RadioGroup
                                                name="seizure"
                                                value={formData.seizure}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.10 Act of self-harm or suicide
                                            </label>
                                            <RadioGroup
                                                name="selfHarm"
                                                value={formData.selfHarm}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.11 Agitated and/or aggressive
                                                behavior
                                            </label>
                                            <RadioGroup
                                                name="agitatedBehavior"
                                                value={
                                                    formData.agitatedBehavior
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.12 Eye Injury/Foreign Body on
                                                the eye
                                            </label>
                                            <RadioGroup
                                                name="eyeInjury"
                                                value={formData.eyeInjury}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                2.13 Severe Injuries
                                            </label>
                                            <RadioGroup
                                                name="severeInjuries"
                                                value={formData.severeInjuries}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <p className="text-sm text-yellow-700">
                                            If YES to ANY, REFER IMMEDIATELY to
                                            a Physician for further management
                                            and/or referral to the next level of
                                            care.
                                        </p>
                                        <p className="text-sm text-yellow-700 mt-2">
                                            If ALL answers are NO, proceed to
                                            Part III.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* III. PAST MEDICAL HISTORY */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        III. PAST MEDICAL HISTORY
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.1 Hypertension
                                            </label>
                                            <RadioGroup
                                                name="historyHypertension"
                                                value={
                                                    formData.historyHypertension
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.2 Heart Diseases
                                            </label>
                                            <RadioGroup
                                                name="historyHeartDisease"
                                                value={
                                                    formData.historyHeartDisease
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.3 Diabetes
                                            </label>
                                            <RadioGroup
                                                name="historyDiabetes"
                                                value={formData.historyDiabetes}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.4 Cancer
                                            </label>
                                            <RadioGroup
                                                name="historyCancer"
                                                value={formData.historyCancer}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.5 COPD
                                            </label>
                                            <RadioGroup
                                                name="historyCOPD"
                                                value={formData.historyCOPD}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.6 Asthma
                                            </label>
                                            <RadioGroup
                                                name="historyAsthma"
                                                value={formData.historyAsthma}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.7 Allergies
                                            </label>
                                            <RadioGroup
                                                name="historyAllergies"
                                                value={
                                                    formData.historyAllergies
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.8 Mental, Neurological, and
                                                Substance-Abuse Disorders
                                            </label>
                                            <RadioGroup
                                                name="historyMental"
                                                value={formData.historyMental}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.9 Vision Problems
                                            </label>
                                            <RadioGroup
                                                name="historyVision"
                                                value={formData.historyVision}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.10 Previous Surgical History
                                            </label>
                                            <RadioGroup
                                                name="historySurgical"
                                                value={formData.historySurgical}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.11 Thyroid Disorders
                                            </label>
                                            <RadioGroup
                                                name="historyThyroid"
                                                value={formData.historyThyroid}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                3.12 Kidney Disorders
                                            </label>
                                            <RadioGroup
                                                name="historyKidney"
                                                value={formData.historyKidney}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* IV. FAMILY HISTORY */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        IV. FAMILY HISTORY
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.1 Hypertension
                                            </label>
                                            <RadioGroup
                                                name="familyHypertension"
                                                value={
                                                    formData.familyHypertension
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.2 Stroke
                                            </label>
                                            <RadioGroup
                                                name="familyStroke"
                                                value={formData.familyStroke}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.3 Heart Disease
                                            </label>
                                            <RadioGroup
                                                name="familyHeartDisease"
                                                value={
                                                    formData.familyHeartDisease
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.4 Diabetes Mellitus
                                            </label>
                                            <RadioGroup
                                                name="familyDiabetes"
                                                value={formData.familyDiabetes}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.5 Asthma
                                            </label>
                                            <RadioGroup
                                                name="familyAsthma"
                                                value={formData.familyAsthma}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.6 Cancer
                                            </label>
                                            <RadioGroup
                                                name="familyCancer"
                                                value={formData.familyCancer}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.7 Kidney Disease
                                            </label>
                                            <RadioGroup
                                                name="familyKidney"
                                                value={formData.familyKidney}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-red-500">
                                                4.8 1st degree relative with
                                                premature coronary disease or
                                                vascular disease (includes
                                                "Heart Attack")
                                            </label>
                                            <RadioGroup
                                                name="familyPrematureCoronary"
                                                value={
                                                    formData.familyPrematureCoronary
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-red-500">
                                                4.9 Family members having TB in
                                                the last 5 years
                                            </label>
                                            <RadioGroup
                                                name="familyTB"
                                                value={formData.familyTB}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.10 Mental, Neurological and
                                                Substance Abuse Disorder
                                            </label>
                                            <RadioGroup
                                                name="familyMental"
                                                value={formData.familyMental}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between pr-4">
                                            <label className="text-sm font-medium text-gray-700">
                                                4.11 COPD
                                            </label>
                                            <RadioGroup
                                                name="familyCOPD"
                                                value={formData.familyCOPD}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* V. NCD RISK FACTORS */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        V. NCD RISK FACTORS
                                    </h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* 5.1 Tobacco Use */}
                                    <div className="border-b pb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">
                                            5.1 Tobacco Use
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="tobaccoQ1"
                                                    name="tobaccoUse"
                                                    value="Q1"
                                                    checked={
                                                        formData.tobaccoUse ===
                                                        "Q1"
                                                    }
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-purple-600"
                                                />
                                                <label
                                                    htmlFor="tobaccoQ1"
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    Q1 Never Used (proceed to
                                                    Q2)
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="tobaccoQ2"
                                                    name="tobaccoUse"
                                                    value="Q2"
                                                    checked={
                                                        formData.tobaccoUse ===
                                                        "Q2"
                                                    }
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-purple-600"
                                                />
                                                <label
                                                    htmlFor="tobaccoQ2"
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    Q2 Exposure to secondhand
                                                    smoke
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="tobaccoQ3"
                                                    name="tobaccoUse"
                                                    value="Q3"
                                                    checked={
                                                        formData.tobaccoUse ===
                                                        "Q3"
                                                    }
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-purple-600"
                                                />
                                                <label
                                                    htmlFor="tobaccoQ3"
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    Q3 Former tobacco user
                                                    (stopped smoking more than 1
                                                    year)
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="tobaccoQ4"
                                                    name="tobaccoUse"
                                                    value="Q4"
                                                    checked={
                                                        formData.tobaccoUse ===
                                                        "Q4"
                                                    }
                                                    onChange={handleChange}
                                                    className="form-radio h-4 w-4 text-purple-600"
                                                />
                                                <label
                                                    htmlFor="tobaccoQ4"
                                                    className="ml-2 text-sm text-gray-700"
                                                >
                                                    Q4 Current tobacco user
                                                    (currently smoking or
                                                    stopped smoking 1year)
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                            <p className="text-sm text-blue-700">
                                                If YES to Q2-Q4, follow the
                                                tobacco cessation protocol (5As)
                                                and use Form 1: Tobacco
                                                Cessation Referral Protocol, if
                                                needed.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 5.2 Alcohol Intake */}
                                    <div className="border-b pb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">
                                            5.2 Alcohol Intake
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="mb-4">
                                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                                    Q1. Do you consume alcohol?
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="alcoholConsumption"
                                                            value="Never"
                                                            checked={
                                                                formData.alcoholConsumption ===
                                                                "Never"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Never Consumed
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="alcoholConsumption"
                                                            value="Yes"
                                                            checked={
                                                                formData.alcoholConsumption ===
                                                                "Yes"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Yes, drinks alcohol
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="text-sm font-medium text-gray-700 block mb-2">
                                                    Q2. Do you drink 5 or more
                                                    standard drinks for men, and
                                                    4 or more for women (in one
                                                    sitting/occasion) in the
                                                    past year?
                                                </label>
                                                <RadioGroup
                                                    name="alcoholFrequency"
                                                    value={
                                                        formData.alcoholFrequency
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                            <p className="text-sm text-blue-700">
                                                If NO, congratulate the patient.
                                                The patient is at a lower risk
                                                of drinking alcohol.
                                            </p>
                                            <p className="text-sm text-blue-700 mt-2">
                                                If YES, proceed using AUDIT
                                                SCREENING TOOL (Form 2) to
                                                assess alcohol consumption and
                                                alcohol problems.
                                            </p>
                                            <p className="text-sm text-blue-700 mt-2">
                                                If YES, provide brief advice
                                                and/or extended brief advice.
                                                The patient is on the higher
                                                risk category level of drinking
                                                or in harmful use of alcohol.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 5.3 Physical Activity */}
                                    <div>
                                        <h3 className="text-md font-medium text-gray-800 mb-4">
                                            5.3 Physical Activity
                                        </h3>
                                        <div className="mb-4">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                Does the patient do at least 2.5
                                                hours a week of
                                                moderate-intensity physical
                                                activity?
                                            </label>
                                            <RadioGroup
                                                name="physicalActivity"
                                                value={
                                                    formData.physicalActivity
                                                }
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                                            <p className="text-sm text-blue-700">
                                                If NO or patient does not reach
                                                the recommended hours/week of
                                                moderate-intensity physical
                                                activity, give lifestyle
                                                modification advice following
                                                Annex 1: Healthy Lifestyle
                                                Module.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 5.4 Nutrition and Dietary Assessment */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6 space-y-6">
                                    <h3 className="text-md font-medium text-gray-800 mb-4">
                                        5.4 Nutrition and Dietary Assessment
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-1">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                Q1. Does the patient eat high
                                                fat, high salt food
                                                (processed/fast food such as
                                                instant noodles, burgers, fries,
                                                dried fish), "ihaw-ihaw/fried
                                                (e.g. isaw, barbecue, liver,
                                                chicken skin) and high sugar
                                                food and drinks (e.g.
                                                chocolates, cakes, pastries,
                                                softdrinks) weekly?
                                            </label>
                                            <RadioGroup
                                                name="highFatFood"
                                                value={formData.highFatFood}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                If YES to the question, give
                                                lifestyle modification advice
                                                following Annex 2: Nutrition
                                                Practice Guidelines for Health
                                                Professionals in the Primary
                                                Care Screening
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                5.5 Weight (kg)
                                            </label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                5.6 Height (cm)
                                            </label>
                                            <input
                                                type="number"
                                                name="height"
                                                value={formData.height}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                5.7 Body Mass Index (wt
                                                [kgs]²/ht.[cm] x 10,000)
                                            </label>
                                            <input
                                                type="text"
                                                name="bmi"
                                                value={formData.bmi}
                                                readOnly
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                5.8 Waist Circumference (cm): F
                                                &lt;80cm M &lt;90
                                            </label>
                                            <input
                                                type="number"
                                                name="waistCircumference"
                                                value={
                                                    formData.waistCircumference
                                                }
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            5.9 Blood Pressure (mmHg)
                                        </label>
                                        <input
                                            type="text"
                                            name="bloodPressure"
                                            value={formData.bloodPressure}
                                            onChange={handleChange}
                                            placeholder="e.g., 120/80"
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* VI. RISK SCREENING */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        VI. RISK SCREENING
                                    </h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* 6.1 Hypertension/Diabetes/Hypercholesterolemia/Renal Diseases */}
                                    <div className="border-b pb-6">
                                        <h3 className="text-md font-medium text-gray-800 mb-4">
                                            6.1
                                            Hypertension/Diabetes/Hypercholesterolemia/Renal
                                            Diseases
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Blood Sugar (write NA if not
                                                    applicable)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="bloodSugar"
                                                    value={formData.bloodSugar}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    FBS Result
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fbsResult"
                                                    value={formData.fbsResult}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    RBS Result
                                                </label>
                                                <input
                                                    type="text"
                                                    name="rbsResult"
                                                    value={formData.rbsResult}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CHECK if DM clinical symptoms
                                                are present:
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="dmSymptoms.polyuria"
                                                        checked={
                                                            formData.dmSymptoms
                                                                .polyuria
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Polyuria
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Lipid Profile
                                                </label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            Total Cholesterol:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="totalCholesterol"
                                                            value={
                                                                formData.totalCholesterol
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            HDL:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="hdl"
                                                            value={formData.hdl}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            LDL:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="ldl"
                                                            value={formData.ldl}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            VLDL:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="vldl"
                                                            value={
                                                                formData.vldl
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            Triglyceride:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="triglyceride"
                                                            value={
                                                                formData.triglyceride
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Date Taken
                                                </label>
                                                <input
                                                    type="date"
                                                    name="lipidProfileDate"
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Urinalysis/Urine Dipstick
                                                    Test
                                                </label>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            Protein:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="protein"
                                                            value={
                                                                formData.protein
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-gray-500">
                                                            Ketones:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="ketones"
                                                            value={
                                                                formData.ketones
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Date Taken
                                                </label>
                                                <input
                                                    type="date"
                                                    name="urinalysisDate"
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6.2 Chronic Respiratory Diseases (Asthma and COPD) */}
                                    <div>
                                        <h3 className="text-md font-medium text-gray-800 mb-4">
                                            6.2 Chronic Respiratory Diseases
                                            (Asthma and COPD)
                                        </h3>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CHECK all applicable:
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="breathlessness"
                                                        checked={
                                                            formData.breathlessness
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Breathlessness (or a
                                                        "need for air")
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="chronicCough"
                                                        checked={
                                                            formData.chronicCough
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Chronic cough
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="sputumProduction"
                                                        checked={
                                                            formData.sputumProduction
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Sputum (mucous)
                                                        production
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="chestTightness"
                                                        checked={
                                                            formData.chestTightness
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Chest tightness*
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="wheezing"
                                                        checked={
                                                            formData.wheezing
                                                        }
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Wheezing*
                                                    </span>
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                * These symptoms may be episodic
                                                or seasonal, vary over time and
                                                intensity and are worse during
                                                night and early morning
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                                                <p className="text-sm text-blue-700">
                                                    If YES to any of the
                                                    symptoms, obtain peak
                                                    expiratory flow rate (PEFR).
                                                    Give inhaled salbutamol,
                                                    then repeat after 15
                                                    minutes.
                                                </p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Result:
                                                </label>
                                                <div className="space-y-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="pefrResult"
                                                            value="asthma"
                                                            checked={
                                                                formData.pefrResult ===
                                                                "asthma"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            ≥20% change from
                                                            baseline (consider
                                                            Probable Asthma)
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="pefrResult"
                                                            value="copd"
                                                            checked={
                                                                formData.pefrResult ===
                                                                "copd"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            &lt;20% change from
                                                            baseline (consider
                                                            Probable COPD)
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* VII. MANAGEMENT */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 px-6 py-3">
                                    <h2 className="text-lg font-medium text-white">
                                        VII. MANAGEMENT
                                    </h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Lifestyle Modification
                                            </label>
                                            <div className="space-y-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="lifestyleModification"
                                                        value="Yes"
                                                        checked={
                                                            formData.lifestyleModification ===
                                                            "Yes"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        Yes
                                                    </span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="lifestyleModification"
                                                        value="No"
                                                        checked={
                                                            formData.lifestyleModification ===
                                                            "No"
                                                        }
                                                        onChange={handleChange}
                                                        className="form-radio h-4 w-4 text-purple-600"
                                                    />
                                                    <span className="ml-2 text-gray-700">
                                                        No
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Medications:
                                        </label>
                                        <div className="ml-4 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <span className="text-gray-700 mr-2">
                                                        a.
                                                    </span>
                                                    <span className="text-gray-700">
                                                        Anti-Hypertensives
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="medications.antiHypertensives"
                                                            value="Yes"
                                                            checked={
                                                                formData
                                                                    .medications
                                                                    .antiHypertensives ===
                                                                "Yes"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Yes
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="medications.antiHypertensives"
                                                            value="No"
                                                            checked={
                                                                formData
                                                                    .medications
                                                                    .antiHypertensives ===
                                                                "No"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            No
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <span className="text-gray-700 mr-2">
                                                        b.
                                                    </span>
                                                    <span className="text-gray-700">
                                                        Oral Hypoglycemic
                                                        Agents/Insulin
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="medications.oralHypoglycemic"
                                                            value="Yes"
                                                            checked={
                                                                formData
                                                                    .medications
                                                                    .oralHypoglycemic ===
                                                                "Yes"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            Yes
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="medications.oralHypoglycemic"
                                                            value="No"
                                                            checked={
                                                                formData
                                                                    .medications
                                                                    .oralHypoglycemic ===
                                                                "No"
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="form-radio h-4 w-4 text-purple-600"
                                                        />
                                                        <span className="ml-2 text-gray-700">
                                                            No
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Follow-up:
                                        </label>
                                        <input
                                            type="date"
                                            name="followUpDate"
                                            value={formData.followUpDate}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Remarks:
                                        </label>
                                        <textarea
                                            name="remarks"
                                            value={formData.remarks}
                                            onChange={handleChange}
                                            rows="3"
                                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="mt-6 px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                                >
                                    Generate Assessment PDF
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <PhilPENPdfGenerator
                    formData={formData}
                    onBack={handleBack}
                    setPdfBlob={setPdfBlob}
                    onSave={viewExisting ? null : handleSaveAssessment}
                    isSaving={savingAssessment}
                    saveSuccess={saveSuccess}
                    viewExisting={viewExisting}
                    patientId={patientId}
                />
            )}
        </>
    );
};

export default RiskAssessment;
