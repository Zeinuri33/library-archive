<?php

namespace App\Http\Controllers;

use App\Models\UnitPengolah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UnitPengolahController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('master/unit/page', [
            'units' => UnitPengolah::withCount('surats')->orderBy('kode')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:50', 'unique:unit_pengolahs,kode'],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ]);

        UnitPengolah::create($data);

        return back()->with('success', 'Unit pengolah berhasil ditambahkan.');
    }

    public function update(Request $request, UnitPengolah $unit)
    {
        $data = $request->validate([
            'kode' => ['required', 'string', 'max:50', 'unique:unit_pengolahs,kode,'.$unit->id],
            'nama' => ['required', 'string', 'max:255'],
            'keterangan' => ['nullable', 'string'],
        ]);

        $unit->update($data);

        return back()->with('success', 'Unit pengolah berhasil diperbarui.');
    }

    public function destroy(UnitPengolah $unit)
    {
        $unit->delete();

        return back()->with('success', 'Unit pengolah berhasil dihapus.');
    }
}
