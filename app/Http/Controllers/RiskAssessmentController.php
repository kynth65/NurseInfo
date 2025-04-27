<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\RiskAssessment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RiskAssessmentController extends Controller
{
    // Store a new risk assessment
    public function store(Request $request)
    {
        \Log::info('Risk assessment store method called', [
            'has_patient_id' => $request->has('patient_id'),
            'has_form_data' => $request->has('form_data'),
            'has_pdf_file' => $request->hasFile('pdf_file'),
            'has_assessment_date' => $request->has('assessment_date'),
        ]);
        
        try {
            $validated = $request->validate([
                'patient_id' => 'required|exists:patients,id',
                'form_data' => 'required|json',
                'pdf_file' => 'required|file|mimes:pdf',
                'assessment_date' => 'required|date'
            ]);
            
            \Log::info('Validation passed');
            
            // Check if patient already has an assessment
            $patient = Patient::findOrFail($validated['patient_id']);
            if ($patient->hasRiskAssessment()) {
                \Log::info('Patient already has a risk assessment', ['patient_id' => $patient->id]);
                return response()->json([
                    'success' => false,
                    'message' => 'Patient already has a risk assessment'
                ], 400);
            }
            
            // Parse form data
            $formData = json_decode($validated['form_data'], true);
            $pdfPath = $request->file('pdf_file')->store('risk-assessments', 'public');
            
            \Log::info('PDF stored', ['path' => $pdfPath]);
            
            $riskAssessment = RiskAssessment::create([
                'patient_id' => $validated['patient_id'],
                'form_data' => $formData,
                'pdf_path' => $pdfPath,
                'assessment_date' => $validated['assessment_date']
            ]);
            
            \Log::info('Risk assessment created', ['id' => $riskAssessment->id]);
            
            return response()->json([
                'success' => true,
                'risk_assessment' => $riskAssessment
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating risk assessment', [
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
    
    // Get risk assessments for a patient
    public function getByPatient(Patient $patient)
    {
        $riskAssessments = $patient->riskAssessments()->latest()->get();
        
        return response()->json([
            'risk_assessments' => $riskAssessments
        ]);
    }
    
    // Get a specific risk assessment
    public function show(RiskAssessment $riskAssessment)
    {
        return response()->json([
            'risk_assessment' => $riskAssessment->load('patient')
        ]);
    }
    
    // Download a risk assessment PDF
    public function downloadPdf(RiskAssessment $riskAssessment)
    {
        if (!Storage::disk('public')->exists($riskAssessment->pdf_path)) {
            return response()->json([
                'message' => 'PDF file not found'
            ], 404);
        }
        
        return Storage::disk('public')->download(
            $riskAssessment->pdf_path, 
            'RiskAssessment_' . $riskAssessment->patient->full_name . '.pdf'
        );
    }
    
    // Check if a patient has any risk assessment
    public function checkPatientHasAssessment(Patient $patient)
    {
        $hasAssessment = $patient->hasRiskAssessment();
        $latestAssessment = null;
        
        if ($hasAssessment) {
            $latestAssessment = $patient->getLatestRiskAssessment();
        }
        
        return response()->json([
            'has_assessment' => $hasAssessment,
            'latest_assessment' => $latestAssessment
        ]);
    }
}