<?php

namespace App\Http\Controllers;

use App\Models\Disposisi;
use App\Models\Surat;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $now = now();

        $stats = [
            'suratMasuk' => Surat::where('jenis', 'masuk')->count(),
            'suratKeluar' => Surat::where('jenis', 'keluar')->count(),
            'suratBulanIni' => Surat::whereYear('tanggal_surat', $now->year)
                ->whereMonth('tanggal_surat', $now->month)
                ->count(),
            'disposisiAktif' => Disposisi::whereIn('status', ['belum', 'proses'])->count(),
            'disposisiSelesai' => Disposisi::where('status', 'selesai')->count(),
            'arsipCount' => Surat::where('status_arsip', 'arsip')->count(),
            'totalUsers' => User::count(),
        ];

        $chart = collect(range(5, 0))->map(function (int $i) use ($now) {
            $month = $now->copy()->subMonths($i);

            return [
                'label' => $month->translatedFormat('M Y'),
                'key' => $month->format('Y-m'),
                'masuk' => Surat::where('jenis', 'masuk')
                    ->whereYear('tanggal_surat', $month->year)
                    ->whereMonth('tanggal_surat', $month->month)
                    ->count(),
                'keluar' => Surat::where('jenis', 'keluar')
                    ->whereYear('tanggal_surat', $month->year)
                    ->whereMonth('tanggal_surat', $month->month)
                    ->count(),
            ];
        })->values();

        $recentSurats = Surat::with(['klasifikasiSurat', 'unitPengolah'])
            ->latest('tanggal_surat')
            ->take(6)
            ->get();

        $recentDisposisis = Disposisi::with(['surat' => fn ($q) => $q->with('unitPengolah')])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'chart' => $chart,
            'recentSurats' => $recentSurats,
            'recentDisposisis' => $recentDisposisis,
        ]);
    }
}
