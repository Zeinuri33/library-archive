<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TemplateNomor extends Model
{
    protected $fillable = [
        'nama',
        'kode',
        'format',
        'digit_nomor',
        'reset_periode',
        'is_aktif',
        'keterangan',
    ];

    protected function casts(): array
    {
        return [
            'is_aktif' => 'boolean',
            'digit_nomor' => 'integer',
        ];
    }

    /**
     * Daftar placeholder yang didukung beserta contohnya.
     */
    public static function placeholders(): array
    {
        return [
            '{nomor}' => 'Nomor urut otomatis (mis. 001)',
            '{klasifikasi}' => 'Kode klasifikasi surat (mis. KER.01)',
            '{unit}' => 'Kode unit pengolah (mis. PUS)',
            '{bulan}' => 'Bulan Romawi (I s/d XII)',
            '{bulan_angka}' => 'Bulan angka dua digit (01 s/d 12)',
            '{tahun}' => 'Tahun surat (mis. 2026)',
            '{jenis}' => 'Jenis surat (MASUK / KELUAR)',
        ];
    }

    public function surats(): HasMany
    {
        return $this->hasMany(Surat::class);
    }
}
