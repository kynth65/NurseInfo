<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        // Vital Signs
        'blood_pressure',
        'heart_rate',
        'temperature',
        'respiratory_rate',
        'weight',
        'height',
        'bmi',
        // Visit Information
        'present_illness',
        'symptoms',
        'diagnosis'
    ];

    protected $casts = [
        'heart_rate' => 'integer',
        'respiratory_rate' => 'integer',
        'temperature' => 'decimal:1',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bmi' => 'decimal:1',
    ];

    // Relationship with patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // Auto-calculate BMI before saving
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($visit) {
            if ($visit->weight && $visit->height) {
                $heightInMeters = $visit->height / 100;
                $visit->bmi = $visit->weight / ($heightInMeters * $heightInMeters);
            }
        });
    }
}
