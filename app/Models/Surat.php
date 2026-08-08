<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Surat extends Model
{
    protected $fillable = [
        'jenis',
        'no_agenda',
        'no_agenda_urut',
        'no_surat',
        'nomor_urut',
        'template_nomor_id',
        'klasifikasi_surat_id',
        'unit_pengolah_id',
        'perihal',
        'ringkasan',
        'asal_surat',
        'pengirim',
        'tujuan_surat',
        'penerima',
        'tanggal_surat',
        'tanggal_terima',
        'tanggal_kirim',
        'sifat',
        'status_arsip',
        'lokasi_arsip',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_surat' => 'date',
            'tanggal_terima' => 'date',
            'tanggal_kirim' => 'date',
        ];
    }

    public function templateNomor(): BelongsTo
    {
        return $this->belongsTo(TemplateNomor::class);
    }

    public function klasifikasiSurat(): BelongsTo
    {
        return $this->belongsTo(KlasifikasiSurat::class);
    }

    public function unitPengolah(): BelongsTo
    {
        return $this->belongsTo(UnitPengolah::class);
    }

    public function pembuat(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function lampirans(): HasMany
    {
        return $this->hasMany(LampiranSurat::class)->orderBy('id');
    }

    public function disposisis(): HasMany
    {
        return $this->hasMany(Disposisi::class)->latest();
    }
}
