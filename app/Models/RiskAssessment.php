<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'form_data',  // JSON field to store all form data
        'pdf_path',   // Path to the stored PDF file
        'assessment_date'
    ];

    protected $casts = [
        'form_data' => 'array',
        'assessment_date' => 'datetime'
    ];

    // Relationship with patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}