<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::with('visits')->get();
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
            'immunization_history' => 'nullable|string'
        ]);

        $patient = Patient::create($validated);

        return response()->json([
            'patient' => $patient
        ], 201);
    }

    public function show(Patient $patient)
    {
        return response()->json([
            'patient' => $patient->load('visits')
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
            'immunization_history' => 'nullable|string'
        ]);

        $patient->update($validated);

        return response()->json([
            'patient' => $patient
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
}
