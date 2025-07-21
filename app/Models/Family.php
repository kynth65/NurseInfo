<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = [
        'family_number',
        'family_name',
        'notes'
    ];

    // Relationship with patients
    public function patients()
    {
        return $this->hasMany(Patient::class);
    }
}