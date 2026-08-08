<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class LampiranSurat extends Model
{
    protected $fillable = [
        'surat_id',
        'nama_asli',
        'path',
        'mime',
        'ukuran',
    ];

    public function surat(): BelongsTo
    {
        return $this->belongsTo(Surat::class);
    }

    public function url(): ?string
    {
        return Storage::disk('public')->url($this->path);
    }
}
