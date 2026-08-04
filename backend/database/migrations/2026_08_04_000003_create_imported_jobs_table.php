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
        Schema::create('imported_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('source')->default('api'); // RemoteOK, Adzuna, Arbeitnow, Greenhouse, Lever
            $table->string('company_name');
            $table->string('company_logo')->nullable();
            $table->string('title');
            $table->string('location')->nullable();
            $table->string('salary_min')->nullable();
            $table->string('salary_max')->nullable();
            $table->string('employment_type')->nullable(); // Full-time, Contract, Part-time
            $table->boolean('is_remote')->default(false);
            $table->json('skills_json')->nullable();
            $table->string('experience_level')->nullable();
            $table->text('application_url');
            $table->longText('description')->nullable();
            $table->string('dedup_hash')->index();
            $table->timestamp('posted_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imported_jobs');
    }
};
