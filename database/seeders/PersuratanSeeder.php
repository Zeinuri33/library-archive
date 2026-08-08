<?php

namespace Database\Seeders;

use App\Models\KlasifikasiSurat;
use App\Models\Surat;
use App\Models\TemplateNomor;
use App\Models\UnitPengolah;
use App\Models\User;
use Illuminate\Database\Seeder;

class PersuratanSeeder extends Seeder
{
    public function run(): void
    {
        // ======================
        // PENGGUNA CONTOH
        // ======================

        $admin = User::firstOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator',
                'email' => 'admin@ibrahimy.ac.id',
                'password' => 'password',
                'avatar' => '',
            ]
        );
        $admin->syncRoles(['admin']);

        $operator = User::firstOrCreate(
            ['username' => 'operator'],
            [
                'name' => 'Petugas Persuratan',
                'email' => 'operator@ibrahimy.ac.id',
                'password' => 'password',
                'avatar' => '',
            ]
        );
        $operator->syncRoles(['operator']);

        // ======================
        // KLASIFIKASI SURAT
        // ======================

        $klasifikasiData = [
            ['kode' => 'KOR.01', 'nama' => 'Korespondensi / Surat Menyurat', 'keterangan' => 'Korespondensi umum, termasuk surat masuk dan keluar.'],
            ['kode' => 'KEP.01', 'nama' => 'Keputusan & Kebijakan', 'keterangan' => 'Keputusan pimpinan, kebijakan, dan surat edaran.'],
            ['kode' => 'UND.01', 'nama' => 'Undangan', 'keterangan' => 'Undangan rapat, kegiatan, dan acara resmi.'],
            ['kode' => 'LAP.01', 'nama' => 'Laporan', 'keterangan' => 'Laporan kegiatan, laporan bulanan/tahunan, dan evaluasi.'],
            ['kode' => 'KER.01', 'nama' => 'Kerja Sama', 'keterangan' => 'MoU, perjanjian kerja sama, dan tindak lanjutnya.'],
            ['kode' => 'HUK.01', 'nama' => 'Hukum & Regulasi', 'keterangan' => 'Peraturan, perundang-undangan, dan dokumen hukum.'],
            ['kode' => 'KEU.01', 'nama' => 'Keuangan', 'keterangan' => 'Surat terkait anggaran, DIPA, dan keuangan.'],
            ['kode' => 'PEG.01', 'nama' => 'Kepegawaian', 'keterangan' => 'Administrasi pegawai, izin, dan cuti.'],
            ['kode' => 'SAR.01', 'nama' => 'Sarana & Prasarana', 'keterangan' => 'Pengadaan, pemeliharaan, dan inventarisasi.'],
            ['kode' => 'LAY.01', 'nama' => 'Layanan Perpustakaan', 'keterangan' => 'Layanan pemustaka, koleksi, dan sirkulasi.'],
            ['kode' => 'PUB.01', 'nama' => 'Publikasi & Humas', 'keterangan' => 'Informasi publik, promosi, dan kehumasan.'],
        ];

        foreach ($klasifikasiData as $item) {
            KlasifikasiSurat::firstOrCreate(['kode' => $item['kode']], $item);
        }

        // ======================
        // UNIT PENGOLAH
        // ======================

        $unitData = [
            ['kode' => 'KPL', 'nama' => 'Kepala Perpustakaan', 'keterangan' => 'Pimpinan Perpustakaan Ibrahimy.'],
            ['kode' => 'PUS', 'nama' => 'Perpustakaan', 'keterangan' => 'Unit pengolah utama perpustakaan.'],
            ['kode' => 'ADM', 'nama' => 'Administrasi & Umum', 'keterangan' => 'Tata usaha, persuratan, dan administrasi umum.'],
            ['kode' => 'LAY', 'nama' => 'Layanan Pemustaka', 'keterangan' => 'Layanan sirkulasi, referensi, dan keanggotaan.'],
            ['kode' => 'PENG', 'nama' => 'Pengadaan & Pengolahan', 'keterangan' => 'Pengadaan dan pengolahan bahan pustaka.'],
            ['kode' => 'TIK', 'nama' => 'Teknologi Informasi', 'keterangan' => 'Digitalisasi, sistem informasi, dan sarana TIK.'],
        ];

        foreach ($unitData as $item) {
            UnitPengolah::firstOrCreate(['kode' => $item['kode']], $item);
        }

        // ======================
        // TEMPLATE NOMOR SURAT
        // ======================

        $templateData = [
            [
                'nama' => 'Format Umum Perpustakaan',
                'kode' => 'UMUM',
                'format' => '{nomor}/PERPUS/{bulan}/{tahun}',
                'digit_nomor' => 3,
                'reset_periode' => 'tahun',
                'is_aktif' => true,
                'keterangan' => 'Format nomor surat keluar standar perpustakaan, contoh: 001/PERPUS/I/2026.',
            ],
            [
                'nama' => 'Format Lengkap Instansi',
                'kode' => 'LENGKAP',
                'format' => '{nomor}/{klasifikasi}/{unit}/{bulan}/{tahun}',
                'digit_nomor' => 3,
                'reset_periode' => 'tahun',
                'is_aktif' => true,
                'keterangan' => 'Format lengkap dengan kode klasifikasi arsip & kode unit, contoh: 001/KER.01/PUS/I/2026.',
            ],
            [
                'nama' => 'Format Sederhana',
                'kode' => 'SEDERHANA',
                'format' => '{nomor}/{tahun}',
                'digit_nomor' => 3,
                'reset_periode' => 'tahun',
                'is_aktif' => true,
                'keterangan' => 'Format minimalis, contoh: 001/2026.',
            ],
        ];

        foreach ($templateData as $item) {
            TemplateNomor::firstOrCreate(['kode' => $item['kode']], $item);
        }

        // ======================
        // SURAT CONTOH
        // ======================

        if (Surat::count() === 0) {
            $this->seedSuratContoh($admin);
        }
    }

    private function seedSuratContoh(User $admin): void
    {
        $service = app(\App\Services\NomorSuratService::class);
        $now = now();

        $masukData = [
            [
                'perihal' => 'Permohonan Kerja Sama Pemanfaatan Koleksi Digital',
                'ringkasan' => 'Menawarkan kerja sama pemanfaatan koleksi digital antar perpustakaan.',
                'asal_surat' => 'UPT Perpustakaan Universitas Ibrahimy',
                'pengirim' => 'Dr. H. Ahmad Fauzi, M.Pd.',
                'no_surat' => '001/UN-IBS/UPT.1/2026',
                'sifat' => 'penting',
                'klasifikasi' => 'KER.01',
                'unit' => 'KPL',
                'tanggal_surat' => $now->copy()->subDays(2)->toDateString(),
                'tanggal_terima' => $now->copy()->subDays(1)->toDateString(),
            ],
            [
                'perihal' => 'Undangan Rapat Koordinasi Pengelolaan Perpustakaan',
                'ringkasan' => 'Undangan rapat koordinasi tingkat kota Situbondo.',
                'asal_surat' => 'Dinas Perpustakaan dan Kearsipan Kab. Situbondo',
                'pengirim' => 'Kepala Bidang Pembinaan Perpustakaan',
                'no_surat' => '431/1402/418.41/2026',
                'sifat' => 'biasa',
                'klasifikasi' => 'UND.01',
                'unit' => 'KPL',
                'tanggal_surat' => $now->copy()->subDays(6)->toDateString(),
                'tanggal_terima' => $now->copy()->subDays(5)->toDateString(),
            ],
            [
                'perihal' => 'Pemberitahuan Jadwal Akreditasi Perpustakaan',
                'ringkasan' => 'Informasi jadwal visitasi akreditasi nasional perpustakaan.',
                'asal_surat' => 'Perpustakaan Nasional RI',
                'pengirim' => 'Direktur Akreditasi',
                'no_surat' => 'B-87/AKR/PN/2026',
                'sifat' => 'sangat-segera',
                'klasifikasi' => 'HUK.01',
                'unit' => 'KPL',
                'tanggal_surat' => $now->copy()->subDays(10)->toDateString(),
                'tanggal_terima' => $now->copy()->subDays(9)->toDateString(),
            ],
            [
                'perihal' => 'Laporan Kunjungan Pemustaka Bulanan',
                'ringkasan' => 'Laporan statistik kunjungan pemustaka bulan lalu.',
                'asal_surat' => 'Seksi Layanan Pemustaka',
                'pengirim' => 'Kasi Layanan',
                'no_surat' => 'LAP/LAY/04/2026',
                'sifat' => 'biasa',
                'klasifikasi' => 'LAP.01',
                'unit' => 'LAY',
                'tanggal_surat' => $now->copy()->subDays(15)->toDateString(),
                'tanggal_terima' => $now->copy()->subDays(14)->toDateString(),
            ],
        ];

        foreach ($masukData as $i => $item) {
            $date = \Carbon\Carbon::parse($item['tanggal_surat']);
            $agendaSeq = $service->nextAgenda('masuk', $date);

            Surat::create([
                'jenis' => 'masuk',
                'no_agenda' => $service->buildAgenda('masuk', $date, $agendaSeq),
                'no_agenda_urut' => $agendaSeq,
                'no_surat' => $item['no_surat'],
                'klasifikasi_surat_id' => KlasifikasiSurat::where('kode', $item['klasifikasi'])->first()?->id,
                'unit_pengolah_id' => UnitPengolah::where('kode', $item['unit'])->first()?->id,
                'perihal' => $item['perihal'],
                'ringkasan' => $item['ringkasan'],
                'asal_surat' => $item['asal_surat'],
                'pengirim' => $item['pengirim'],
                'tanggal_surat' => $item['tanggal_surat'],
                'tanggal_terima' => $item['tanggal_terima'],
                'sifat' => $item['sifat'],
                'status_arsip' => $i === 3 ? 'arsip' : 'aktif',
                'lokasi_arsip' => $i === 3 ? 'Rak A - Box 2' : null,
                'created_by' => $admin->id,
            ]);
        }

        $keluarData = [
            [
                'perihal' => 'Surat Jawaban Kerja Sama Koleksi Digital',
                'ringkasan' => 'Menindaklanjuti permohonan kerja sama yang masuk.',
                'tujuan_surat' => 'UPT Perpustakaan Universitas Ibrahimy',
                'penerima' => 'Kepala UPT Perpustakaan',
                'sifat' => 'penting',
                'template' => 'LENGKAP',
                'klasifikasi' => 'KER.01',
                'unit' => 'PUS',
                'tanggal_surat' => $now->toDateString(),
            ],
            [
                'perihal' => 'Permohonan Data Kunjungan Perpustakaan',
                'ringkasan' => 'Permohonan data statistik kunjungan untuk laporan tahunan.',
                'tujuan_surat' => 'Dinas Perpustakaan dan Kearsipan Kab. Situbondo',
                'penerima' => 'Kepala Dinas',
                'sifat' => 'biasa',
                'template' => 'UMUM',
                'klasifikasi' => 'LAP.01',
                'unit' => 'PUS',
                'tanggal_surat' => $now->copy()->subDays(3)->toDateString(),
            ],
            [
                'perihal' => 'Undangan Sosialisasi Literasi Digital',
                'ringkasan' => 'Undangan kegiatan sosialisasi literasi digital untuk mahasiswa.',
                'tujuan_surat' => 'Program Studi Teknik Informatika',
                'penerima' => 'Ketua Program Studi',
                'sifat' => 'segera',
                'template' => 'UMUM',
                'klasifikasi' => 'PUB.01',
                'unit' => 'PUS',
                'tanggal_surat' => $now->copy()->subDays(7)->toDateString(),
            ],
        ];

        foreach ($keluarData as $item) {
            $date = \Carbon\Carbon::parse($item['tanggal_surat']);
            $agendaSeq = $service->nextAgenda('keluar', $date);
            $template = TemplateNomor::where('kode', $item['template'])->first();
            $nomorUrut = $service->nextSequence($template, $date);

            $surat = Surat::create([
                'jenis' => 'keluar',
                'no_agenda' => $service->buildAgenda('keluar', $date, $agendaSeq),
                'no_agenda_urut' => $agendaSeq,
                'nomor_urut' => $nomorUrut,
                'template_nomor_id' => $template?->id,
                'klasifikasi_surat_id' => KlasifikasiSurat::where('kode', $item['klasifikasi'])->first()?->id,
                'unit_pengolah_id' => UnitPengolah::where('kode', $item['unit'])->first()?->id,
                'perihal' => $item['perihal'],
                'ringkasan' => $item['ringkasan'],
                'tujuan_surat' => $item['tujuan_surat'],
                'penerima' => $item['penerima'],
                'tanggal_surat' => $item['tanggal_surat'],
                'tanggal_kirim' => $item['tanggal_surat'],
                'sifat' => $item['sifat'],
                'status_arsip' => 'aktif',
                'created_by' => $admin->id,
            ]);

            $surat->no_surat = $service->generate($surat);
            $surat->save();
        }
    }
}
