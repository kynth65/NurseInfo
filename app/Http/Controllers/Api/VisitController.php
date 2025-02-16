<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Visit;
use Illuminate\Http\Request;

class VisitController extends Controller
{
    public function index(Patient $patient)
    {
        return response()->json([
            'visits' => $patient->visits()->with('patient')->get()
        ]);
    }

    public function store(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'blood_pressure' => 'required|string',
            'heart_rate' => 'required|integer',
            'temperature' => 'required|numeric',
            'respiratory_rate' => 'required|integer',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'present_illness' => 'required|string',
            'symptoms' => 'required|string',
            'diagnosis' => 'required|string'
        ]);

        $visit = $patient->visits()->create($validated);

        return response()->json([
            'visit' => $visit->load('patient')
        ], 201);
    }

    public function show(Patient $patient, Visit $visit)
    {
        return response()->json([
            'visit' => $visit->load('patient')
        ]);
    }

    public function update(Request $request, Patient $patient, Visit $visit)
    {
        $validated = $request->validate([
            'blood_pressure' => 'required|string',
            'heart_rate' => 'required|integer',
            'temperature' => 'required|numeric',
            'respiratory_rate' => 'required|integer',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'present_illness' => 'required|string',
            'symptoms' => 'required|string',
            'diagnosis' => 'required|string'
        ]);

        $visit->update($validated);

        return response()->json([
            'visit' => $visit->load('patient')
        ]);
    }

    public function destroy(Patient $patient, Visit $visit)
    {
        $visit->delete();
        return response()->json([
            'message' => 'Visit deleted successfully'
        ]);
    }
}
