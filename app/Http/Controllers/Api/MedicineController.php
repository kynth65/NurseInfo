<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MedicineController extends Controller
{
    public function index()
    {
        return response()->json([
            'medicines' => Medicine::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'minimum_stock' => 'required|integer|min:0'
        ]);

        $medicine = Medicine::create($validated);

        return response()->json([
            'medicine' => $medicine
        ], 201);
    }

    public function destroy(Medicine $medicine)
    {
        try {
            DB::transaction(function () use ($medicine) {
                // Delete related transactions first
                $medicine->transactions()->delete();
                // Then delete the medicine
                $medicine->delete();
            });

            return response()->json([
                'message' => 'Medicine deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete medicine'
            ], 500);
        }
    }

    public function show(Medicine $medicine)
    {
        return response()->json([
            'medicine' => $medicine->load('transactions.user')
        ]);
    }
}
