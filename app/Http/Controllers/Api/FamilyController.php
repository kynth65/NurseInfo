<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Family;
use App\Models\Patient;
use Illuminate\Http\Request;

class FamilyController extends Controller
{
    public function index()
    {
        $families = Family::with('patients')->get();
        return response()->json([
            'families' => $families
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'family_number' => 'required|string|max:255|unique:families',
            'family_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $family = Family::create($validated);
        return response()->json([
            'family' => $family
        ], 201);
    }

    public function show(Family $family)
    {
        return response()->json([
            'family' => $family->load('patients')
        ]);
    }

    public function update(Request $request, Family $family)
    {
        $validated = $request->validate([
            'family_number' => 'required|string|max:255|unique:families,family_number,' . $family->id,
            'family_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $family->update($validated);
        return response()->json([
            'family' => $family
        ]);
    }

    public function destroy(Family $family)
    {
        // Remove family association from patients before deleting
        $family->patients()->update(['family_id' => null]);
        $family->delete();
        return response()->json([
            'message' => 'Family deleted successfully'
        ]);
    }

    public function addPatient(Request $request, Family $family)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
        ]);

        $patient = Patient::findOrFail($validated['patient_id']);
        $patient->update(['family_id' => $family->id]);

        return response()->json([
            'family' => $family->load('patients')
        ]);
    }

    public function removePatient(Request $request, Family $family)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
        ]);

        $patient = Patient::findOrFail($validated['patient_id']);
        if ($patient->family_id == $family->id) {
            $patient->update(['family_id' => null]);
        }

        return response()->json([
            'family' => $family->load('patients')
        ]);
    }
}