import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import "./PhilPENStyle.css"; // We'll create this style file next

const PhilPENPdfGenerator = ({
    formData,
    onBack,
    setPdfBlob,
    onSave,
    isSaving,
    saveSuccess,
}) => {
    // Ref for PDF generation
    const pdfContentRef = useRef(null);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "Not specified";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Handle PDF download
    const handleDownloadPDF = () => {
        // Show loading indicator or notify user
        const prevButton = document.activeElement;
        if (prevButton) prevButton.disabled = true;

        // Create a copy of the form to modify for PDF generation
        const printArea = pdfContentRef.current.cloneNode(true);

        // Set explicit font family on the printArea
        printArea.style.fontFamily =
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        printArea.style.color = "#000000";

        // Define a comprehensive color mapping for Tailwind colors
        const tailwindColorMap = {
            // Purple shades (since the form uses purple as the primary color)
            "text-purple-600": "#9333ea",
            "bg-purple-600": "#9333ea",
            "border-purple-600": "#9333ea",
            // Gray shades
            "text-gray-600": "#4b5563",
            "text-gray-500": "#6b7280",
            "bg-gray-200": "#e5e7eb",
            "bg-gray-100": "#f3f4f6",
            "bg-gray-50": "#f9fafb",
            "border-gray-300": "#d1d5db",
            "border-gray-200": "#e5e7eb",
            // Other potential colors
            "text-red-500": "#ef4444",
            "text-yellow-700": "#a16207",
            "bg-yellow-50": "#fefce8",
            "border-yellow-200": "#fef08a",
            "text-black": "#000000",
            "text-white": "#ffffff",
            "bg-white": "#ffffff",
        };

        // Apply color conversion
        const convertAllProblemColors = (element) => {
            // Convert class-based colors to inline styles
            Array.from(element.querySelectorAll("*")).forEach((el) => {
                Array.from(el.classList).forEach((cls) => {
                    Object.keys(tailwindColorMap).forEach((colorClass) => {
                        if (
                            cls === colorClass ||
                            el.classList.contains(colorClass)
                        ) {
                            if (colorClass.startsWith("text-")) {
                                el.style.color = tailwindColorMap[colorClass];
                            } else if (colorClass.startsWith("bg-")) {
                                el.style.backgroundColor =
                                    tailwindColorMap[colorClass];
                            } else if (colorClass.startsWith("border-")) {
                                el.style.borderColor =
                                    tailwindColorMap[colorClass];
                            }
                        }
                    });
                });

                // Handle specific components
                if (el.classList.contains("philpen-btn-primary")) {
                    el.style.backgroundColor = "#9333ea"; // Purple
                    el.style.color = "#ffffff";
                }

                if (el.classList.contains("philpen-section-title")) {
                    el.style.backgroundColor = "#9333ea";
                    el.style.color = "#ffffff";
                }

                if (el.classList.contains("philpen-label-cell")) {
                    el.style.backgroundColor = "#f9fafb"; // Gray-50
                }
            });
        };

        // Process input elements to convert to static content
        const processInputElements = (element) => {
            Array.from(
                element.querySelectorAll("input, select, textarea")
            ).forEach((input) => {
                let textContent = "";

                if (input.tagName === "SELECT") {
                    textContent =
                        input.options[input.selectedIndex]?.text || "";
                } else if (input.type === "checkbox") {
                    const span = document.createElement("span");
                    span.innerHTML = input.checked ? "☑" : "☐";
                    input.parentNode.replaceChild(span, input);
                    return; // Skip the rest for checkboxes
                } else if (input.type === "radio") {
                    const isChecked = input.checked;
                    if (!isChecked) {
                        // If it's not checked, remove it and its label
                        const label = input.closest("label");
                        if (label) {
                            label.style.display = "none";
                        } else {
                            input.style.display = "none";
                        }
                        return;
                    }
                    const span = document.createElement("span");
                    span.innerHTML = "☑ ";
                    span.style.marginRight = "5px";
                    input.parentNode.replaceChild(span, input);
                    return;
                } else if (input.tagName === "TEXTAREA") {
                    textContent = input.value || "N/A";
                } else {
                    textContent = input.value || "";
                }

                const span = document.createElement("span");
                span.style.fontSize = "10px";
                span.style.width = "100%";
                span.style.display = "inline-block";
                span.textContent = textContent;
                input.parentNode.replaceChild(span, input);
            });
        };

        // Apply color conversion and process inputs
        convertAllProblemColors(printArea);
        processInputElements(printArea);

        // Add direct styles to override any Tailwind styles
        const overrideStyles = document.createElement("style");
        overrideStyles.textContent = `
      .philpen-pdf-content * {
        color: #000000 !important;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      }
      .philpen-pdf-content .philpen-header-title h1,
      .philpen-pdf-content .philpen-header-title h2,
      .philpen-pdf-content .text-purple-600 {
        color: #9333ea !important;
      }
      .philpen-pdf-content .philpen-section-title,
      .philpen-pdf-content .bg-purple-600 {
        background-color: #9333ea !important;
        color: #ffffff !important;
      }
      .philpen-pdf-content .text-yellow-700 {
        color: #a16207 !important;
      }
      .philpen-pdf-content .bg-yellow-50 {
        background-color: #fefce8 !important;
      }
      .philpen-pdf-content .text-gray-500 {
        color: #6b7280 !important;
      }
      .philpen-pdf-content .philpen-label-cell {
        background-color: #f9fafb !important;
      }
    `;
        printArea.appendChild(overrideStyles);

        const medicalHistorySection = printArea.querySelector(
            ".past-medical-history-section"
        );
        if (medicalHistorySection) {
            medicalHistorySection.style.marginTop = "40px";
            medicalHistorySection.style.paddingTop = "90px";
        }

        const riskScreeningSection = printArea.querySelector(
            ".risk-screening-section"
        );
        if (riskScreeningSection) {
            riskScreeningSection.style.marginTop = "40px";
            riskScreeningSection.style.paddingTop = "110px";
        }
        // Create configuration for jsPDF
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `PhilPEN_Risk_Assessment_${
                formData.patientName.replace(/\s+/g, "_") || "FORM"
            }.pdf`,
            image: { type: "png", quality: 1.0 },
            html2canvas: {
                scale: 2,
                letterRendering: true,
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 15000,
                ignoreElements: (element) => {
                    return (
                        element.tagName === "STYLE" &&
                        element.textContent.includes("oklch")
                    );
                },
            },
            jsPDF: {
                unit: "mm",
                format: "legal",
                orientation: "portrait",
                compress: true,
            },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        // Use a try-catch block to handle any errors during PDF generation
        try {
            html2pdf()
                .from(printArea)
                .set(opt)
                .save()
                .then(() => {
                    // Re-enable button after PDF generation completes
                    if (prevButton) prevButton.disabled = false;
                })
                .catch((err) => {
                    console.error("PDF generation error:", err);
                    alert(
                        "There was an error generating the PDF. Please try again."
                    );
                    if (prevButton) prevButton.disabled = false;
                });
        } catch (err) {
            console.error("Error initiating PDF generation:", err);
            alert("Could not start PDF generation. Please try again.");
            if (prevButton) prevButton.disabled = false;
        }
    };

    // Helper function to render radio button values
    const renderRadioValue = (value) => {
        if (!value) return "Not specified";
        return value;
    };

    // Helper function to render checkbox values
    const renderCheckboxValues = (checkboxObj) => {
        if (!checkboxObj) return "None";
        const selectedItems = Object.keys(checkboxObj).filter(
            (key) => checkboxObj[key]
        );
        if (selectedItems.length === 0) return "None";
        return selectedItems.join(", ");
    };

    const addPageBreakClasses = (element) => {
        // Get all section headers
        const sections = element.querySelectorAll(".philpen-section-title");

        // Start from the third section (index 2) and add page-break class
        // This will ensure sections like PAST MEDICAL HISTORY start on a new page
        if (sections.length > 2) {
            for (let i = 2; i < sections.length; i++) {
                // Add a spacer div before the section to force a page break
                const spacer = document.createElement("div");
                spacer.className = "page-break-before";
                spacer.style.pageBreakBefore = "always";
                spacer.style.marginTop = "40px";
                spacer.style.height = "1px"; // Minimal height, just to create space

                // Insert the spacer before the section container
                const sectionContainer =
                    sections[i].closest(".philpen-section");
                if (sectionContainer && sectionContainer.parentNode) {
                    sectionContainer.parentNode.insertBefore(
                        spacer,
                        sectionContainer
                    );
                }
            }
        }
    };

    return (
        <div className="philpen-calculator font-sans w-full min-h-screen max-w-7xl bg-gray-50">
            <div className="flex flex-col justify-between mb-10 sm:flex-row gap-2">
                <h2 className="text-2xl font-bold">Assessment Preview</h2>
                <div className="flex gap-2">
                    <button
                        onClick={onBack}
                        className="philpen-btn philpen-btn-secondary inline-flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors"
                    >
                        Back to Form
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="philpen-btn philpen-btn-primary inline-flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="philpen-calculator bg-white rounded-lg shadow-md overflow-hidden">
                <div
                    id="pdfContent"
                    ref={pdfContentRef}
                    className="philpen-pdf-content p-8 bg-white"
                >
                    {/* Header */}
                    <div className="philpen-header-title text-center mb-8 pt-4">
                        <div className="philpen-logo-container mb-3">
                            <svg
                                width="60"
                                height="60"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto"
                            >
                                <path
                                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                    stroke="#9333EA"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M13.5 8.5C13.5 9.05228 13.0523 9.5 12.5 9.5C11.9477 9.5 11.5 9.05228 11.5 8.5C11.5 7.94772 11.9477 7.5 12.5 7.5C13.0523 7.5 13.5 7.94772 13.5 8.5Z"
                                    fill="#9333EA"
                                />
                                <path
                                    d="M12.5 16.5V10.5"
                                    stroke="#9333EA"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-purple-600 mb-3">
                            PhilPEN Risk Assessment Form
                        </h1>
                        <h2 className="text-base font-semibold text-purple-600 mb-4">
                            Adults ≥20 years old
                        </h2>
                    </div>

                    {/* Form Header */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            ASSESSMENT INFORMATION
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Health Facility:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.healthFacility || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Assessment Date:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formatDate(formData.assessmentDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* I. PATIENT'S INFORMATION */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            I. PATIENT'S INFORMATION
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Patient Name:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.patientName || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Age:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formData.age || "Not specified"}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Sex:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.sex || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Birthdate:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formatDate(formData.birthdate)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    PHIC No.:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.phicNo || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Civil Status:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formData.civilStatus || "Not specified"}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Religion:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.religion || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Contact No.:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.contactNo || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Patient's Address:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.address || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    PWD ID Card No. (if applicable):
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.disabilityIDCard || "N/A"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Employment Status:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.employmentStatus ||
                                        "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Employment Type:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.employmentType || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Ethnicity:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.ethnicity || "Not specified"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* II. ASSESS FOR RED FLAGS */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            II. ASSESS FOR RED FLAGS
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.1 Chest Pain:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.chestPain)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.2 Difficulty of Breathing:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.difficultyBreathing
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.3 Loss of Consciousness:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.lossOfConsciousness
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.4 Slurred Speech:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.slurredSpeech)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.5 Facial Asymmetry:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.facialAsymmetry)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.6 Weakness/Numbness:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.weakness)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.7 Disoriented:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.disoriented)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.8 Chest Retractions:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.chestRetractions
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.9 Seizure or Convulsion:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.seizure)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.10 Act of self-harm or suicide:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.selfHarm)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.11 Agitated behavior:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.agitatedBehavior
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.12 Eye Injury/Foreign Body:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.eyeInjury)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.13 Severe Injuries:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.severeInjuries)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700 text-sm">
                            <p>
                                If YES to ANY, REFER IMMEDIATELY to a Physician
                                for further management and/or referral to the
                                next level of care.
                            </p>
                            <p className="mt-1">
                                If ALL answers are NO, proceed to Part III.
                            </p>
                        </div>
                    </div>

                    {/* III. PAST MEDICAL HISTORY */}
                    <div className="mb-6 philpen-section past-medical-history-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            III. PAST MEDICAL HISTORY
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.1 Hypertension:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.historyHypertension
                                    )}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.2 Heart Diseases:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.historyHeartDisease
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.3 Diabetes:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.historyDiabetes)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.4 Cancer:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.historyCancer)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.5 COPD:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.historyCOPD)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.6 Asthma:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.historyAsthma)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.7 Allergies:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.historyAllergies
                                    )}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.8 Mental Disorders:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.historyMental)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.9 Vision Problems:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.historyVision)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.10 Surgical History:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.historySurgical)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.11 Thyroid Disorders:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.historyThyroid)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    3.12 Kidney Disorders:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.historyKidney)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IV. FAMILY HISTORY */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            IV. FAMILY HISTORY
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.1 Hypertension:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.familyHypertension
                                    )}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.2 Stroke:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.familyStroke)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.3 Heart Disease:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.familyHeartDisease
                                    )}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.4 Diabetes:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.familyDiabetes)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.5 Asthma:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.familyAsthma)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.6 Cancer:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.familyCancer)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.7 Kidney Disease:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.familyKidney)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.8 Premature Coronary:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.familyPrematureCoronary
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.9 TB History:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {renderRadioValue(formData.familyTB)}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.10 Mental Disorders:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.familyMental)}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    4.11 COPD:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.familyCOPD)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* V. NCD RISK FACTORS */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            V. NCD RISK FACTORS
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    5.1 Tobacco Use
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Tobacco Use Status:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.tobaccoUse === "Q1" &&
                                        "Never Used"}
                                    {formData.tobaccoUse === "Q2" &&
                                        "Exposure to secondhand smoke"}
                                    {formData.tobaccoUse === "Q3" &&
                                        "Former tobacco user (stopped smoking more than 1 year)"}
                                    {formData.tobaccoUse === "Q4" &&
                                        "Current tobacco user (currently smoking or stopped smoking 1year)"}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    5.2 Alcohol Intake
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Do you consume alcohol?
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.alcoholConsumption ||
                                        "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5+ drinks for men, 4+ for women in one
                                    sitting?
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.alcoholFrequency
                                    )}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    5.3 Physical Activity
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    2.5 hours/week of moderate activity?
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.physicalActivity
                                    )}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    5.4 Nutrition and Dietary Assessment
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    High fat, high salt food consumption:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(formData.highFatFood)}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5.5 Weight (kg):
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.weight || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5.6 Height (cm):
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.height || "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5.7 BMI:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.bmi || "Not calculated"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5.8 Waist Circumference (cm):
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.waistCircumference ||
                                        "Not specified"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    5.9 Blood Pressure (mmHg):
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.bloodPressure || "Not specified"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VI. RISK SCREENING */}
                    <div className="mb-6 philpen-section risk-screening-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            VI. RISK SCREENING
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    6.1
                                    Hypertension/Diabetes/Hypercholesterolemia/Renal
                                    Diseases
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Blood Sugar:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.bloodSugar || "N/A"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    FBS Result:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.fbsResult || "N/A"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    RBS Result:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.rbsResult || "N/A"}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    DM Clinical Symptoms:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.dmSymptoms.polyphagia ||
                                    formData.dmSymptoms.polydipsia ||
                                    formData.dmSymptoms.polyuria
                                        ? [
                                              formData.dmSymptoms.polyphagia &&
                                                  "Polyphagia",
                                              formData.dmSymptoms.polydipsia &&
                                                  "Polydipsia",
                                              formData.dmSymptoms.polyuria &&
                                                  "Polyuria",
                                          ]
                                              .filter(Boolean)
                                              .join(", ")
                                        : "None"}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    Lipid Profile
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Total Cholesterol:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formData.totalCholesterol || "N/A"}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    HDL:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.hdl || "N/A"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    LDL:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formData.ldl || "N/A"}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    VLDL:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.vldl || "N/A"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Triglyceride:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.triglyceride || "N/A"}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    Urinalysis/Urine Dipstick Test
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-4">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Protein:
                                </div>
                                <div className="philpen-grid-cell p-2 border-r border-b border-gray-200">
                                    {formData.protein || "N/A"}
                                </div>
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Ketones:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.ketones || "N/A"}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    6.2 Chronic Respiratory Diseases (Asthma and
                                    COPD)
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Respiratory Symptoms:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.breathlessness ||
                                    formData.chronicCough ||
                                    formData.sputumProduction ||
                                    formData.chestTightness ||
                                    formData.wheezing
                                        ? [
                                              formData.breathlessness &&
                                                  "Breathlessness",
                                              formData.chronicCough &&
                                                  "Chronic cough",
                                              formData.sputumProduction &&
                                                  "Sputum production",
                                              formData.chestTightness &&
                                                  "Chest tightness",
                                              formData.wheezing && "Wheezing",
                                          ]
                                              .filter(Boolean)
                                              .join(", ")
                                        : "None"}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    PEFR Result:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formData.pefrResult === "asthma" &&
                                        "≥20% change from baseline (Probable Asthma)"}
                                    {formData.pefrResult === "copd" &&
                                        "<20% change from baseline (Probable COPD)"}
                                    {!formData.pefrResult && "Not performed"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VII. MANAGEMENT */}
                    <div className="mb-6 philpen-section">
                        <h3 className="philpen-section-title font-medium mb-2 bg-purple-600 text-white p-2">
                            VII. MANAGEMENT
                        </h3>
                        <div className="philpen-info-table border border-gray-200 rounded-md overflow-hidden">
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Lifestyle Modification:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.lifestyleModification
                                    )}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200 font-medium">
                                    Medications
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Anti-Hypertensives:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.medications.antiHypertensives
                                    )}
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Oral Hypoglycemic Agents/Insulin:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {renderRadioValue(
                                        formData.medications.oralHypoglycemic
                                    )}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-2">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-r border-b border-gray-200">
                                    Date of Follow-up:
                                </div>
                                <div className="philpen-grid-cell p-2 border-b border-gray-200">
                                    {formatDate(formData.followUpDate)}
                                </div>
                            </div>

                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell philpen-label-cell p-2 border-b border-gray-200">
                                    Remarks:
                                </div>
                            </div>
                            <div className="philpen-grid-row grid grid-cols-1">
                                <div className="philpen-grid-cell p-2 border-b border-gray-200 min-h-16">
                                    {formData.remarks || "No remarks"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="philpen-footer mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border-t border-gray-400 pt-2 text-center">
                                <div className="h-10"></div>
                                <p className="text-sm font-medium">
                                    Healthcare Provider's Signature
                                </p>
                            </div>
                            <div className="border-t border-gray-400 pt-2 text-center">
                                <div className="h-10"></div>
                                <p className="text-sm font-medium">
                                    Date Signed
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-6 text-gray-500 text-xs">
                            <p>
                                PhilPEN Risk Assessment Form -{" "}
                                {formatDate(new Date())}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhilPENPdfGenerator;
