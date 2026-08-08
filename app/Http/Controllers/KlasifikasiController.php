<?php

namespace App\Http\Controllers;

use App\Models\KlasifikasiSurat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KlasifikasiController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('master/klasifikasi/page', [
            'klasifikasis' => KlasifikasiSurat::withCount('surats')->orderBy('kode')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:50', 'unique:klasifikasi_surats,kode'],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ]);

        KlasifikasiSurat::create($data);

        return back()->with('success', 'Klasifikasi surat berhasil ditambahkan.');
    }

    public function update(Request $request, KlasifikasiSurat $klasifikasi)
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:50', 'unique:klasifikasi_surats,kode,'.$klasifikasi->id],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $klasifikasi->update($data);

        return back()->with('success', 'Klasifikasi surat berhasil diperbarui.');
    }

    public function destroy(KlasifikasiSurat $klasifikasi)
    {
        $klasifikasi->delete();

        return back()->with('success', 'Klasifikasi surat berhasil dihapus.');
    }
}
