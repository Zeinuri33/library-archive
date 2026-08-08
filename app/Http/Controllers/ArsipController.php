<?php

namespace App\Http\Controllers;

use App\Models\KlasifikasiSurat;
use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ArsipController extends Controller
{
    public function index(): Response
    {
        $surats = Surat::with(['templateNomor', 'klasifikasiSurat', 'unitPengolah', 'lampirans'])
            ->latest('tanggal_surat')
            ->get();

        $years = Surat::query()
            ->whereNotNull('tanggal_surat')
            ->pluck('tanggal_surat')
            ->map(fn ($date) => $date instanceof \Carbon\Carbon ? $date->year : \Carbon\Carbon::parse($date)->year)
            ->unique()
            ->sortDesc()
            ->values();

        return Inertia::render('arsip/page', [
            'surats' => $surats,
            'klasifikasis' => KlasifikasiSurat::orderBy('kode')->get(),
            'tahunList' => $years,
        ]);
    }

    public function tandai(Request $request, Surat $surat)
    {
        $data = $request->validate([
            'status_arsip' => ['required', Rule::in(['aktif', 'arsip'])],
            'lokasi_arsip' => ['nullable', 'string', 'max:255'],
        ]);

        $surat->update($data);

        return back()->with('success', $data['status_arsip'] === 'arsip'
            ? 'Surat berhasil diarsipkan.'
            : 'Surat dikembalikan ke status aktif.');
    }

    public function export(Request $request)
    {
        $filters = $request->only(['q', 'jenis', 'tahun', 'bulan', 'klasifikasi_surat_id', 'sifat', 'status_arsip']);

        $query = Surat::with(['klasifikasiSurat', 'unitPengolah'])
            ->orderBy('tanggal_surat');

        if (! empty($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('perihal', 'like', '%'.$filters['q'].'%')
                    ->orWhere('no_surat', 'like', '%'.$filters['q'].'%')
                    ->orWhere('no_agenda', 'like', '%'.$filters['q'].'%')
                    ->orWhere('asal_surat', 'like', '%'.$filters['q'].'%')
                    ->orWhere('tujuan_surat', 'like', '%'.$filters['q'].'%')
                    ->orWhere('pengirim', 'like', '%'.$filters['q'].'%')
                    ->orWhere('penerima', 'like', '%'.$filters['q'].'%')
                    ->orWhere('ringkasan', 'like', '%'.$filters['q'].'%');
            });
        }

        foreach (['jenis', 'sifat', 'status_arsip', 'klasifikasi_surat_id'] as $field) {
            if (! empty($filters[$field])) {
                $query->where($field, $filters[$field]);
            }
        }

        if (! empty($filters['tahun'])) {
            $query->whereYear('tanggal_surat', $filters['tahun']);
        }

        if (! empty($filters['bulan'])) {
            $query->whereMonth('tanggal_surat', $filters['bulan']);
        }

        $surats = $query->get();

        $filename = 'arsip-surat-'.now()->format('Y-m-d-His').'.csv';

        $handle = fopen('php://temp', 'r+');

        fputcsv($handle, [
            'No. Agenda',
            'No. Surat',
            'Jenis',
            'Tanggal Surat',
            'Asal / Tujuan',
            'Klasifikasi',
            'Unit',
            'Perihal',
            'Sifat',
            'Status',
            'Lokasi Arsip',
        ]);

        foreach ($surats as $surat) {
            fputcsv($handle, [
                $surat->no_agenda,
                $surat->no_surat,
                ucfirst($surat->jenis),
                $surat->tanggal_surat?->format('d/m/Y'),
                $surat->jenis === 'masuk' ? $surat->asal_surat : $surat->tujuan_surat,
                $surat->klasifikasiSurat?->kode,
                $surat->unitPengolah?->kode,
                $surat->perihal,
                ucfirst($surat->sifat),
                ucfirst($surat->status_arsip),
                $surat->lokasi_arsip,
            ]);
        }

        rewind($handle);

        return response(stream_get_contents($handle), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }
}
