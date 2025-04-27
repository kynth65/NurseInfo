<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        // Add family to the eager loading to display family info in patient table
        $patients = Patient::with(['visits', 'family'])->get();
        return response()->json([
            'patients' => $patients
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'civil_status' => 'required|string',
            'contact_number' => 'required|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_number' => 'required|string',
            'address' => 'required|string',
            'email' => 'nullable|email',
            'occupation' => 'nullable|string',
            'blood_type' => 'nullable|string',
            'smoking_history' => 'nullable|string',
            'alcohol_consumption' => 'nullable|string',
            'exercise_habits' => 'nullable|string',
            'diet_restrictions' => 'nullable|string',
            'past_illnesses' => 'nullable|string',
            'family_history' => 'nullable|string',
            'allergies' => 'nullable|string',
            'current_medications' => 'nullable|string',
            'previous_surgeries' => 'nullable|string',
            'previous_hospitalizations' => 'nullable|string',
            'immunization_history' => 'nullable|string',
            'family_id' => 'nullable|exists:families,id', // Allow setting family during creation
        ]);

        $patient = Patient::create($validated);

        return response()->json([
            'patient' => $patient->load(['visits', 'family']) // Load relationships for the response
        ], 201);
    }

    public function show(Patient $patient)
    {
        // Add family to the eager loading
        return response()->json([
            'patient' => $patient->load(['visits', 'family'])
        ]);
    }

    public function update(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'civil_status' => 'required|string',
            'contact_number' => 'required|string',
            'emergency_contact_name' => 'required|string',
            'emergency_contact_number' => 'required|string',
            'address' => 'required|string',
            'email' => 'nullable|email',
            'occupation' => 'nullable|string',
            'blood_type' => 'nullable|string',
            'smoking_history' => 'nullable|string',
            'alcohol_consumption' => 'nullable|string',
            'exercise_habits' => 'nullable|string',
            'diet_restrictions' => 'nullable|string',
            'past_illnesses' => 'nullable|string',
            'family_history' => 'nullable|string',
            'allergies' => 'nullable|string',
            'current_medications' => 'nullable|string',
            'previous_surgeries' => 'nullable|string',
            'previous_hospitalizations' => 'nullable|string',
            'immunization_history' => 'nullable|string',
            'family_id' => 'nullable|exists:families,id', // Allow updating family during edit
        ]);

        $patient->update($validated);

        return response()->json([
            'patient' => $patient->load(['visits', 'family']) // Load relationships for the response
        ]);
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json([
            'message' => 'Patient deleted successfully'
        ]);
    }

    public function latestVisit(Patient $patient)
    {
        $latestVisit = $patient->visits()->latest()->first();
        return response()->json([
            'visit' => $latestVisit
        ]);
    }

    public function updateFamily(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'family_id' => 'nullable|exists:families,id',
        ]);

        $patient->update(['family_id' => $validated['family_id']]);
        return response()->json([
            'patient' => $patient->load('family.patients')
        ]);
    }
     // Get the latest risk assessment for a patient
     public function getRiskAssessment(Patient $patient)
     {
         $riskAssessment = $patient->getLatestRiskAssessment();
         
         return response()->json([
             'risk_assessment' => $riskAssessment
         ]);
     }

      // Store a new risk assessment for a patient
    public function storeRiskAssessment(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'form_data' => 'required|array',
            'pdf_file' => 'required|file|mimes:pdf',
            'assessment_date' => 'required|date'
        ]);
        
        // Store the PDF file
        $pdfPath = $request->file('pdf_file')->store('risk-assessments', 'public');
        
        // Create the risk assessment record
        $riskAssessment = $patient->riskAssessments()->create([
            'form_data' => $validated['form_data'],
            'pdf_path' => $pdfPath,
            'assessment_date' => $validated['assessment_date']
        ]);
        
        return response()->json([
            'risk_assessment' => $riskAssessment
        ], 201);
    }
     // Download a risk assessment PDF
     public function downloadRiskAssessment(RiskAssessment $riskAssessment)
     {
         if (!Storage::disk('public')->exists($riskAssessment->pdf_path)) {
             return response()->json([
                 'message' => 'PDF file not found'
             ], 404);
         }
         
         return Storage::disk('public')->download($riskAssessment->pdf_path);
     }

    public function getFamilyMembers(Patient $patient)
    {
        if (!$patient->family_id) {
            return response()->json([
                'family_members' => []
            ]);
        }

        $familyMembers = $patient->familyMembers();
        return response()->json([
            'family_members' => $familyMembers
        ]);
    }
}