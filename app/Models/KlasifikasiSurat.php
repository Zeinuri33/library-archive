<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KlasifikasiSurat extends Model
{
    protected $fillable = [
        'kode',
        'nama',
        'keterangan',
    ];

    public function surats(): HasMany
    {
        return $this->hasMany(Surat::class);
    }
}
