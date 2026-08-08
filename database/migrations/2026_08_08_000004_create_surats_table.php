<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surats', function (Blueprint $table) {
            $table->id();
            $table->enum('jenis', ['masuk', 'keluar']);
            $table->string('no_agenda')->nullable();
            $table->unsignedInteger('no_agenda_urut')->nullable();
            $table->string('no_surat')->nullable();
            $table->unsignedInteger('nomor_urut')->nullable();

            $table->foreignId('template_nomor_id')->nullable()->constrained('template_nomors')->nullOnDelete();
            $table->foreignId('klasifikasi_surat_id')->nullable()->constrained('klasifikasi_surats')->nullOnDelete();
            $table->foreignId('unit_pengolah_id')->nullable()->constrained('unit_pengolahs')->nullOnDelete();

            $table->string('perihal');
            $table->text('ringkasan')->nullable();

            $table->string('asal_surat')->nullable();
            $table->string('pengirim')->nullable();
            $table->string('tujuan_surat')->nullable();
            $table->string('penerima')->nullable();

            $table->date('tanggal_surat')->nullable();
            $table->date('tanggal_terima')->nullable();
            $table->date('tanggal_kirim')->nullable();

            $table->string('sifat')->default('biasa');

            $table->enum('status_arsip', ['aktif', 'arsip'])->default('aktif');
            $table->string('lokasi_arsip')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['jenis', 'tanggal_surat']);
            $table->index(['jenis', 'status_arsip']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surats');
    }
};
