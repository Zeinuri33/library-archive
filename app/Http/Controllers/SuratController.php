<?php

namespace App\Http\Controllers;

use App\Models\KlasifikasiSurat;
use App\Models\LampiranSurat;
use App\Models\Surat;
use App\Models\TemplateNomor;
use App\Models\UnitPengolah;
use App\Models\User;
use App\Services\NomorSuratService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SuratController extends Controller
{
    public function index(Request $request, string $jenis): Response
    {
        abort_unless(in_array($jenis, ['masuk', 'keluar']), 404);

        $surats = Surat::with(['templateNomor', 'klasifikasiSurat', 'unitPengolah', 'lampirans', 'disposisis', 'pembuat'])
            ->where('jenis', $jenis)
            ->latest('tanggal_surat')
            ->get();

        return Inertia::render($jenis === 'masuk' ? 'surat-masuk/page' : 'surat-keluar/page', [
            'surats' => $surats,
            'klasifikasis' => KlasifikasiSurat::orderBy('kode')->get(),
            'units' => UnitPengolah::orderBy('kode')->get(),
            'templates' => TemplateNomor::where('is_aktif', true)->orderBy('nama')->get(),
            'users' => User::orderBy('name')->get(['id', 'name', 'avatar']),
        ]);
    }

    public function show(Surat $surat): Response
    {
        $surat->load([
            'templateNomor',
            'klasifikasiSurat',
            'unitPengolah',
            'lampirans',
            'disposisis' => fn ($q) => $q->with(['user', 'pembuat']),
            'pembuat',
        ]);

        return Inertia::render($surat->jenis === 'masuk' ? 'surat-masuk/detail' : 'surat-keluar/detail', [
            'surat' => $surat,
            'users' => User::orderBy('name')->get(['id', 'name', 'avatar']),
        ]);
    }

    public function store(Request $request, string $jenis)
    {
        abort_unless(in_array($jenis, ['masuk', 'keluar']), 404);

        $data = $request->validate([
            'perihal' => ['required', 'string', 'max:255'],
            'ringkasan' => ['nullable', 'string'],
            'tanggal_surat' => ['required', 'date'],
            'tanggal_terima' => ['nullable', 'date'],
            'tanggal_kirim' => ['nullable', 'date'],
            'sifat' => ['required', Rule::in(['biasa', 'penting', 'segera', 'sangat-segera'])],
            'klasifikasi_surat_id' => ['nullable', 'exists:klasifikasi_surats,id'],
            'unit_pengolah_id' => ['nullable', 'exists:unit_pengolahs,id'],
            'asal_surat' => ['nullable', 'string', 'max:255'],
            'pengirim' => ['nullable', 'string', 'max:255'],
            'tujuan_surat' => ['nullable', 'string', 'max:255'],
            'penerima' => ['nullable', 'string', 'max:255'],
            'template_nomor_id' => ['nullable', 'exists:template_nomors,id'],
            'no_surat' => ['nullable', 'string', 'max:255'],
            'files' => ['nullable', 'array', 'max:10'],
            'files.*' => ['file', 'max:20480'],
        ]);

        // Surat keluar tanpa template → nomor surat manual wajib diisi.
        if ($jenis === 'keluar' && empty($data['template_nomor_id']) && empty($data['no_surat'])) {
            return back()->withErrors(['no_surat' => 'Nomor surat wajib diisi. Pilih template penomoran atau isi nomor manual.']);
        }

        $service = app(NomorSuratService::class);
        $date = Carbon::parse($data['tanggal_surat']);

        $surat = DB::transaction(function () use ($jenis, $data, $service, $date, $request) {
            $templateId = $data['template_nomor_id'] ?? null;
            $nomorUrut = null;

            if ($jenis === 'keluar' && $templateId) {
                $template = TemplateNomor::findOrFail($templateId);
                $nomorUrut = $service->nextSequence($template, $date);
            }

            $agendaSeq = $service->nextAgenda($jenis, $date);

            $surat = Surat::create([
                'jenis' => $jenis,
                'no_agenda' => $service->buildAgenda($jenis, $date, $agendaSeq),
                'no_agenda_urut' => $agendaSeq,
                'nomor_urut' => $nomorUrut,
                'template_nomor_id' => $templateId,
                'klasifikasi_surat_id' => $data['klasifikasi_surat_id'] ?? null,
                'unit_pengolah_id' => $data['unit_pengolah_id'] ?? null,
                'perihal' => $data['perihal'],
                'ringkasan' => $data['ringkasan'] ?? null,
                'asal_surat' => $data['asal_surat'] ?? null,
                'pengirim' => $data['pengirim'] ?? null,
                'tujuan_surat' => $data['tujuan_surat'] ?? null,
                'penerima' => $data['penerima'] ?? null,
                'tanggal_surat' => $data['tanggal_surat'],
                'tanggal_terima' => $data['tanggal_terima'] ?? null,
                'tanggal_kirim' => $data['tanggal_kirim'] ?? null,
                'sifat' => $data['sifat'],
                'created_by' => auth()->id(),
            ]);

            $surat->no_surat = ($jenis === 'keluar' && $templateId)
                ? $service->generate($surat)
                : ($data['no_surat'] ?? null);
            $surat->save();

            $this->storeLampirans($surat, $request->file('files', []));

            return $surat;
        });

        $message = $jenis === 'masuk'
            ? 'Surat masuk berhasil dicatat.'
            : 'Surat keluar berhasil dibuat. Nomor surat: '.$surat->no_surat;

        return back()->with('success', $message);
    }

    public function update(Request $request, Surat $surat)
    {
        $data = $request->validate([
            'perihal' => ['required', 'string', 'max:255'],
            'ringkasan' => ['nullable', 'string'],
            'tanggal_surat' => ['required', 'date'],
            'tanggal_terima' => ['nullable', 'date'],
            'tanggal_kirim' => ['nullable', 'date'],
            'sifat' => ['required', Rule::in(['biasa', 'penting', 'segera', 'sangat-segera'])],
            'klasifikasi_surat_id' => ['nullable', 'exists:klasifikasi_surats,id'],
            'unit_pengolah_id' => ['nullable', 'exists:unit_pengolahs,id'],
            'asal_surat' => ['nullable', 'string', 'max:255'],
            'pengirim' => ['nullable', 'string', 'max:255'],
            'tujuan_surat' => ['nullable', 'string', 'max:255'],
            'penerima' => ['nullable', 'string', 'max:255'],
            'template_nomor_id' => ['nullable', 'exists:template_nomors,id'],
            'no_surat' => ['nullable', 'string', 'max:255'],
            'remove_lampiran_ids' => ['nullable', 'array'],
            'remove_lampiran_ids.*' => ['integer'],
            'files' => ['nullable', 'array', 'max:10'],
            'files.*' => ['file', 'max:20480'],
        ]);

        $templateId = $data['template_nomor_id'] ?? null;

        // Surat keluar tanpa template → nomor manual wajib.
        if ($surat->jenis === 'keluar' && ! $templateId && empty($data['no_surat'])) {
            return back()->withErrors(['no_surat' => 'Nomor surat wajib diisi.']);
        }

        $surat->update([
            'template_nomor_id' => $templateId,
            'klasifikasi_surat_id' => $data['klasifikasi_surat_id'] ?? null,
            'unit_pengolah_id' => $data['unit_pengolah_id'] ?? null,
            'perihal' => $data['perihal'],
            'ringkasan' => $data['ringkasan'] ?? null,
            'asal_surat' => $data['asal_surat'] ?? null,
            'pengirim' => $data['pengirim'] ?? null,
            'tujuan_surat' => $data['tujuan_surat'] ?? null,
            'penerima' => $data['penerima'] ?? null,
            'tanggal_surat' => $data['tanggal_surat'],
            'tanggal_terima' => $data['tanggal_terima'] ?? null,
            'tanggal_kirim' => $data['tanggal_kirim'] ?? null,
            'sifat' => $data['sifat'],
        ]);

        // Kelola nomor surat saat update.
        if ($surat->jenis === 'keluar') {
            if ($templateId && $surat->nomor_urut) {
                // Template tetap: nomor tidak berubah (hindari duplikasi).
                $surat->no_surat = app(NomorSuratService::class)->generate($surat);
            } elseif ($templateId) {
                // Template baru: generate nomor urut baru.
                $service = app(NomorSuratService::class);
                $date = Carbon::parse($surat->tanggal_surat);
                $surat->nomor_urut = $service->nextSequence($surat->templateNomor, $date);
                $surat->no_surat = $service->generate($surat);
            } else {
                $surat->no_surat = $data['no_surat'];
                $surat->nomor_urut = null;
            }
        } else {
            $surat->no_surat = $data['no_surat'] ?? null;
        }
        $surat->save();

        // Hapus lampiran yang ditandai.
        foreach ($request->input('remove_lampiran_ids', []) as $lampiranId) {
            $lampiran = LampiranSurat::where('surat_id', $surat->id)->find($lampiranId);
            if ($lampiran) {
                Storage::disk('public')->delete($lampiran->path);
                $lampiran->delete();
            }
        }

        $this->storeLampirans($surat, $request->file('files', []));

        return back()->with('success', 'Data surat berhasil diperbarui.');
    }

    public function destroy(Surat $surat)
    {
        foreach ($surat->lampirans as $lampiran) {
            Storage::disk('public')->delete($lampiran->path);
        }

        $surat->delete();

        return back()->with('success', 'Surat berhasil dihapus.');
    }

    public function downloadLampiran(LampiranSurat $lampiran)
    {
        abort_if(! Storage::disk('public')->exists($lampiran->path), 404);

        return Storage::disk('public')->download($lampiran->path, $lampiran->nama_asli);
    }

    private function storeLampirans(Surat $surat, array $files): void
    {
        foreach ($files as $file) {
            $path = $file->store('lampiran-surat/'.$surat->id, 'public');

            LampiranSurat::create([
                'surat_id' => $surat->id,
                'nama_asli' => $file->getClientOriginalName(),
                'path' => $path,
                'mime' => $file->getMimeType(),
                'ukuran' => $file->getSize(),
            ]);
        }
    }
}
