<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MedicineController;
use App\Http\Controllers\Api\InventoryTransactionController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\VisitController;
use App\Http\Controllers\Api\FamilyController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\RiskAssessmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
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
    // Get patient's latest visit
    Route::get('visits/latest', [VisitController::class, 'getLatestVisits']);
    // Get patient statistics
    Route::get('patients/statistics', [PatientController::class, 'statistics']);
    // Get patient's medical history
    Route::get('patients/{patient}/medical-history', [PatientController::class, 'medicalHistory']);
    // Get patient's visit history
    Route::get('patients/{patient}/visit-history', [PatientController::class, 'visitHistory']);
    // Update patient's medical history
    Route::patch('patients/{patient}/medical-history', [PatientController::class, 'updateMedicalHistory']);
});

// Family routes
Route::apiResource('families', FamilyController::class);
Route::post('families/{family}/add-patient', [FamilyController::class, 'addPatient']);
Route::post('families/{family}/remove-patient', [FamilyController::class, 'removePatient']);

// Patient family routes
Route::patch('patients/{patient}/family', [PatientController::class, 'updateFamily']);
Route::get('patients/{patient}/family-members', [PatientController::class, 'getFamilyMembers']);

// Risk Assessment routes
Route::post('/risk-assessments', [RiskAssessmentController::class, 'store']);
Route::get('/risk-assessments/{riskAssessment}', [RiskAssessmentController::class, 'show']);
Route::get('/risk-assessments/{riskAssessment}/download', [RiskAssessmentController::class, 'downloadPdf']);
Route::get('/patients/{patient}/risk-assessments', [RiskAssessmentController::class, 'getByPatient']);
Route::get('/patients/{patient}/risk-assessment/check', [RiskAssessmentController::class, 'checkPatientHasAssessment']);


Route::apiResource('events', EventController::class);
