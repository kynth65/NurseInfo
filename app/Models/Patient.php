<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'date_of_birth',
        'gender',
        'civil_status',
        'contact_number',
        'emergency_contact_name',
        'emergency_contact_number',
        'address',
        'email',
        'occupation',
        'blood_type',
        // Medical History
        'past_illnesses',
        'family_history',
        'allergies',
        'current_medications',
        'previous_surgeries',
        'previous_hospitalizations',
        'immunization_history',
        // Lifestyle Information
        'smoking_history',
        'alcohol_consumption',
        'exercise_habits',
        'diet_restrictions'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    // Calculate age from date_of_birth
    public function getAgeAttribute()
    {
        return $this->date_of_birth->age;
    }

    // Relationship with visits
    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
}
