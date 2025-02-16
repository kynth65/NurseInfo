<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('civil_status');
            $table->string('contact_number');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_number');
            $table->text('address');
            $table->string('email')->nullable();
            $table->string('occupation')->nullable();
            $table->string('blood_type')->nullable();
            // Lifestyle Information
            $table->string('smoking_history')->nullable();
            $table->string('alcohol_consumption')->nullable();
            $table->string('exercise_habits')->nullable();
            $table->text('diet_restrictions')->nullable();
            // Medical History
            $table->text('past_illnesses')->nullable();
            $table->text('family_history')->nullable();
            $table->text('allergies')->nullable();
            $table->text('current_medications')->nullable();
            $table->text('previous_surgeries')->nullable();
            $table->text('previous_hospitalizations')->nullable();
            $table->text('immunization_history')->nullable();
            $table->timestamps();
        });

        // visits table - for tracking each visit and vital signs
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            // Vital Signs
            $table->string('blood_pressure');
            $table->integer('heart_rate');
            $table->decimal('temperature', 4, 1);
            $table->integer('respiratory_rate');
            $table->decimal('weight', 5, 2);
            $table->decimal('height', 5, 2);
            $table->decimal('bmi', 4, 1)->nullable();
            // Visit Information
            $table->text('present_illness');
            $table->text('symptoms');
            $table->text('diagnosis');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
        Schema::dropIfExists('patients');
    }
};
