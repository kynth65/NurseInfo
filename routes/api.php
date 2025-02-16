<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\InventoryTransactionController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\VisitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

//Routes for medicines and inventory transactions
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/medicines', [MedicineController::class, 'index']);
    Route::post('/medicines', [MedicineController::class, 'store']);
    Route::post('/inventory-transactions', [InventoryTransactionController::class, 'store']);
    Route::get('/medicines/{medicine}/transactions', [InventoryTransactionController::class, 'index']);
    Route::get('/all-transactions', [InventoryTransactionController::class, 'getAllTransactions']);
    Route::delete('/medicines/{medicine}', [MedicineController::class, 'destroy']);
});

//Routes for patients and visits
Route::middleware('auth:sanctum')->group(function () {
    // Patient routes
    Route::apiResource('patients', PatientController::class);
    // Visit routes
    Route::apiResource('patients.visits', VisitController::class);
    // Get patient's latest visit
    Route::get('patients/{patient}/latest-visit', [PatientController::class, 'latestVisit']);
    // Get patient statistics
    Route::get('patients/statistics', [PatientController::class, 'statistics']);
    // Get patient's medical history
    Route::get('patients/{patient}/medical-history', [PatientController::class, 'medicalHistory']);
    // Get patient's visit history
    Route::get('patients/{patient}/visit-history', [PatientController::class, 'visitHistory']);
    // Update patient's medical history
    Route::patch('patients/{patient}/medical-history', [PatientController::class, 'updateMedicalHistory']);
});
