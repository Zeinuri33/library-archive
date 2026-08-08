<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('disposisi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surat_id')->constrained('surats')->cascadeOnDelete();
            $table->string('tujuan')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('instruksi')->nullable();
            $table->text('catatan')->nullable();
            $table->date('batas_waktu')->nullable();
            $table->enum('status', ['belum', 'proses', 'selesai'])->default('belum');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['surat_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disposisi');
    }
};
