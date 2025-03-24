<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('families', function (Blueprint $table) {
            $table->id();
            $table->string('family_number')->unique();
            $table->string('family_name')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Add family_id to patients table
        Schema::table('patients', function (Blueprint $table) {
            $table->foreignId('family_id')->nullable()->constrained()->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropForeign(['family_id']);
            $table->dropColumn('family_id');
        });
        Schema::dropIfExists('families');
    }
};
