<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    public function index(Request $request): Response
    {
        $jenis = $request->input('jenis', 'masuk');
        $bulan = (int) $request->input('bulan', now()->month);
        $tahun = (int) $request->input('tahun', now()->year);

        abort_unless(in_array($jenis, ['masuk', 'keluar']), 404);
        abort_unless($bulan >= 1 && $bulan <= 12, 404);

        $surats = Surat::with(['klasifikasiSurat', 'unitPengolah'])
            ->where('jenis', $jenis)
            ->whereYear('tanggal_surat', $tahun)
            ->whereMonth('tanggal_surat', $bulan)
            ->orderBy('tanggal_surat')
            ->orderBy('no_agenda_urut')
            ->get();

        $bulanLabels = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
        ];

        $years = Surat::query()
            ->whereNotNull('tanggal_surat')
            ->pluck('tanggal_surat')
            ->map(fn ($date) => $date instanceof \Carbon\Carbon ? $date->year : \Carbon\Carbon::parse($date)->year)
            ->unique()
            ->sortDesc()
            ->values();

        return Inertia::render('agenda/page', [
            'surats' => $surats,
            'jenis' => $jenis,
            'bulan' => $bulan,
            'tahun' => $tahun,
            'bulanLabels' => $bulanLabels,
            'tahunList' => $years,
        ]);
    }
}
