<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Disposisi extends Model
{
    protected $table = 'disposisi';

    protected $fillable = [
        'surat_id',
        'tujuan',
        'user_id',
        'instruksi',
        'catatan',
        'batas_waktu',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'batas_waktu' => 'date',
        ];
    }

    public function surat(): BelongsTo
    {
        return $this->belongsTo(Surat::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function pembuat(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
