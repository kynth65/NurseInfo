<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medicine;
use App\Models\InventoryTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryTransactionController extends Controller
{

    public function index(Medicine $medicine)
    {
        $transactions = $medicine->transactions()
            ->with('user') // Include user information
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }

    public function getAllTransactions()
    {
        $transactions = InventoryTransaction::with(['medicine', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'transactions' => $transactions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'medicine_id' => 'required|exists:medicines,id',
            'type' => 'required|in:in,out',
            'quantity' => 'required|integer|min:1',
            'reason' => 'required|string'
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $medicine = Medicine::findOrFail($validated['medicine_id']);

            // First check if there's enough stock
            if ($validated['type'] === 'out' && $medicine->current_stock < $validated['quantity']) {
                return response()->json([
                    'message' => 'Insufficient stock'
                ], 422);
            }

            // Calculate new stock level
            $newStock = $validated['type'] === 'in'
                ? $medicine->current_stock + $validated['quantity']
                : $medicine->current_stock - $validated['quantity'];

            $warning = null;
            // Check if transaction will bring stock below minimum
            if ($validated['type'] === 'out' && $newStock < $medicine->minimum_stock) {
                $warning = "Warning: Stock will be below minimum level of {$medicine->minimum_stock}";
            }

            $transaction = InventoryTransaction::create([
                ...$validated,
                'user_id' => $request->user()->id
            ]);

            $medicine->current_stock = $newStock;
            $medicine->save();

            return response()->json([
                'transaction' => $transaction->load(['medicine', 'user']),
                'current_stock' => $medicine->current_stock,
                'warning' => $warning
            ], 201);
        });
    }
}
