<?php

namespace App\Http\Controllers;

use App\Models\TemplateNomor;
use App\Services\NomorSuratService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TemplateNomorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('master/template-nomor/page', [
            'templates' => TemplateNomor::withCount('surats')->orderBy('nama')->get(),
            'placeholders' => TemplateNomor::placeholders(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);

        TemplateNomor::create($data);

        return back()->with('success', 'Template nomor surat berhasil dibuat.');
    }

    public function update(Request $request, TemplateNomor $template)
    {
        $data = $this->validateData($request, $template);

        $template->update($data);

        return back()->with('success', 'Template nomor surat berhasil diperbarui.');
    }

    public function destroy(TemplateNomor $template)
    {
        $template->delete();

        return back()->with('success', 'Template nomor surat berhasil dihapus.');
    }

    /**
     * Preview nomor surat berdasarkan template & data sementara.
     */
    public function preview(Request $request, NomorSuratService $service)
    {
        $data = $request->validate([
            'template_nomor_id' => ['required', 'exists:template_nomors,id'],
            'tanggal_surat' => ['nullable', 'date'],
            'klasifikasi_surat_id' => ['nullable', 'exists:klasifikasi_surats,id'],
            'unit_pengolah_id' => ['nullable', 'exists:unit_pengolahs,id'],
            'jenis' => ['nullable', Rule::in(['masuk', 'keluar'])],
        ]);

        $template = TemplateNomor::findOrFail($data['template_nomor_id']);

        $klasifikasiKode = $data['klasifikasi_surat_id']
            ? \App\Models\KlasifikasiSurat::find($data['klasifikasi_surat_id'])?->kode
            : '';

        $unitKode = $data['unit_pengolah_id']
            ? \App\Models\UnitPengolah::find($data['unit_pengolah_id'])?->kode
            : '';

        $tanggal = ! empty($data['tanggal_surat'])
            ? \Carbon\Carbon::parse($data['tanggal_surat'])
            : now();

        $nextSequence = $service->nextSequence($template, $tanggal);

        $preview = $service->preview($template, [
            'tanggal_surat' => $tanggal->toDateString(),
            'klasifikasi_kode' => $klasifikasiKode,
            'unit_kode' => $unitKode,
            'jenis' => $data['jenis'] ?? 'keluar',
            'nomor_urut' => $nextSequence,
        ]);

        return response()->json([
            'preview' => $preview,
            'nomor_urut' => $nextSequence,
        ]);
    }

    private function validateData(Request $request, ?TemplateNomor $template = null): array
    {
        return $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'kode' => ['required', 'string', 'max:50', 'unique:template_nomors,kode'.($template ? ','.$template->id : '')],
            'format' => ['required', 'string', 'max:255', function ($attribute, $value, $fail) {
                if (! str_contains($value, '{nomor}')) {
                    $fail('Format harus mengandung placeholder {nomor}.');
                }
            }],
            'digit_nomor' => ['required', 'integer', 'between:1,6'],
            'reset_periode' => ['required', Rule::in(['tahun', 'bulan', 'kontinu'])],
            'is_aktif' => ['sometimes', 'boolean'],
            'keterangan' => ['nullable', 'string'],
        ]);
    }
}
