<?php

namespace App\Services;

use App\Models\Surat;
use App\Models\TemplateNomor;
use Carbon\Carbon;
use Illuminate\Support\Str;

class NomorSuratService
{
    /**
     * Bilangan Romawi untuk bulan 1-12.
     */
    public const ROMAWI = [
        1 => 'I',
        2 => 'II',
        3 => 'III',
        4 => 'IV',
        5 => 'V',
        6 => 'VI',
        7 => 'VII',
        8 => 'VIII',
        9 => 'IX',
        10 => 'X',
        11 => 'XI',
        12 => 'XII',
    ];

    /**
     * Hitung nomor urut berikutnya untuk template pada tanggal tertentu,
     * sesuai periode reset template (tahun / bulan / kontinu).
     */
    public function nextSequence(TemplateNomor $template, Carbon $date): int
    {
        $query = Surat::query()
            ->where('template_nomor_id', $template->id)
            ->whereNotNull('nomor_urut');

        match ($template->reset_periode) {
            'bulan' => $query
                ->whereYear('tanggal_surat', $date->year)
                ->whereMonth('tanggal_surat', $date->month),
            'tahun' => $query->whereYear('tanggal_surat', $date->year),
            default => null,
        };

        return (int) $query->max('nomor_urut') + 1;
    }

    /**
     * Bangun nomor surat lengkap dari template + data surat.
     */
    public function generate(Surat $surat): string
    {
        $template = $surat->templateNomor;

        if (! $template) {
            return $surat->no_surat ?? '';
        }

        $date = $surat->tanggal_surat ? Carbon::parse($surat->tanggal_surat) : now();
        $nomor = str_pad((string) ($surat->nomor_urut ?? 1), $template->digit_nomor, '0', STR_PAD_LEFT);

        $replacements = [
            '{nomor}' => $nomor,
            '{klasifikasi}' => $surat->klasifikasiSurat?->kode ?? '',
            '{unit}' => $surat->unitPengolah?->kode ?? '',
            '{bulan}' => self::ROMAWI[$date->month] ?? $date->month,
            '{bulan_angka}' => $date->format('m'),
            '{tahun}' => (string) $date->year,
            '{jenis}' => Str::upper($surat->jenis),
        ];

        $result = $template->format;

        foreach ($replacements as $placeholder => $value) {
            $result = str_replace($placeholder, $value, $result);
        }

        return $this->collapseSeparators($result);
    }

    /**
     * Rapikan hasil: buang segmen kosong akibat placeholder tanpa nilai,
     * mis. "001//PUS/VIII/2026" menjadi "001/PUS/VIII/2026".
     */
    private function collapseSeparators(string $value): string
    {
        $value = preg_replace('#([/.\-_])\1+#', '$1', $value);
        $value = preg_replace('#^[/.\-_]+|[/.\-_]+$#', '', $value);

        return trim($value);
    }

    /**
     * Hitung nomor agenda berikutnya untuk jenis surat pada tahun tertentu.
     */
    public function nextAgenda(string $jenis, Carbon $date): int
    {
        return (int) Surat::query()
            ->where('jenis', $jenis)
            ->whereYear('tanggal_surat', $date->year)
            ->max('no_agenda_urut') + 1;
    }

    /**
     * Buat nomor agenda lengkap, mis. "005/2026".
     */
    public function buildAgenda(string $jenis, Carbon $date, int $sequence): string
    {
        return str_pad((string) $sequence, 3, '0', STR_PAD_LEFT).'/'.$date->year;
    }

    /**
     * Preview nomor surat sebelum disimpan (untuk UI builder).
     */
    public function preview(TemplateNomor $template, array $data): string
    {
        $date = ! empty($data['tanggal_surat'])
            ? Carbon::parse($data['tanggal_surat'])
            : now();

        $nomor = str_pad((string) ($data['nomor_urut'] ?? 1), $template->digit_nomor, '0', STR_PAD_LEFT);

        $replacements = [
            '{nomor}' => $nomor,
            '{klasifikasi}' => $data['klasifikasi_kode'] ?? '',
            '{unit}' => $data['unit_kode'] ?? '',
            '{bulan}' => self::ROMAWI[$date->month] ?? $date->month,
            '{bulan_angka}' => $date->format('m'),
            '{tahun}' => (string) $date->year,
            '{jenis}' => Str::upper($data['jenis'] ?? 'keluar'),
        ];

        $result = $template->format;

        foreach ($replacements as $placeholder => $value) {
            $result = str_replace($placeholder, $value, $result);
        }

        return $this->collapseSeparators($result);
    }
}
