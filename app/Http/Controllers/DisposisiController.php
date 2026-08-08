<?php

namespace App\Http\Controllers;

use App\Models\Disposisi;
use App\Models\Surat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DisposisiController extends Controller
{
    public function index(): Response
    {
        $disposisis = Disposisi::with([
            'surat' => fn ($q) => $q->with(['klasifikasiSurat', 'unitPengolah']),
            'user',
            'pembuat',
        ])->latest()->get();

        return Inertia::render('disposisi/page', [
            'disposisis' => $disposisis,
            'users' => User::orderBy('name')->get(['id', 'name', 'avatar']),
            'surats' => Surat::orderByDesc('tanggal_surat')
                ->get(['id', 'jenis', 'no_surat', 'no_agenda', 'perihal', 'tanggal_surat', 'asal_surat', 'tujuan_surat']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'surat_id' => ['required', 'exists:surats,id'],
            'tujuan' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'exists:users,id'],
            'instruksi' => ['nullable', 'string'],
            'catatan' => ['nullable', 'string'],
            'batas_waktu' => ['nullable', 'date'],
            'status' => ['nullable', Rule::in(['belum', 'proses', 'selesai'])],
        ]);

        Disposisi::create([
            'surat_id' => $data['surat_id'],
            'tujuan' => $data['tujuan'] ?? null,
            'user_id' => $data['user_id'] ?? null,
            'instruksi' => $data['instruksi'] ?? null,
            'catatan' => $data['catatan'] ?? null,
            'batas_waktu' => $data['batas_waktu'] ?? null,
            'status' => $data['status'] ?? 'belum',
            'created_by' => auth()->id(),
        ]);

        return back()->with('success', 'Disposisi berhasil dibuat.');
    }

    public function update(Request $request, Disposisi $disposisi)
    {
        $data = $request->validate([
            'tujuan' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'exists:users,id'],
            'instruksi' => ['nullable', 'string'],
            'catatan' => ['nullable', 'string'],
            'batas_waktu' => ['nullable', 'date'],
            'status' => ['nullable', Rule::in(['belum', 'proses', 'selesai'])],
        ]);

        $disposisi->update($data);

        return back()->with('success', 'Disposisi berhasil diperbarui.');
    }

    public function status(Request $request, Disposisi $disposisi)
    {
        $request->validate([
            'status' => ['required', Rule::in(['belum', 'proses', 'selesai'])],
        ]);

        $disposisi->update(['status' => $request->status]);

        return back()->with('success', 'Status disposisi diperbarui menjadi "'.$request->status.'".');
    }

    public function destroy(Disposisi $disposisi)
    {
        $disposisi->delete();

        return back()->with('success', 'Disposisi berhasil dihapus.');
    }

    public function cetak(Disposisi $disposisi): Response
    {
        $disposisi->load([
            'surat' => fn ($q) => $q->with(['templateNomor', 'klasifikasiSurat', 'unitPengolah', 'pembuat']),
            'user',
            'pembuat',
        ]);

        return Inertia::render('cetak/disposisi', [
            'disposisi' => $disposisi,
        ]);
    }
}
