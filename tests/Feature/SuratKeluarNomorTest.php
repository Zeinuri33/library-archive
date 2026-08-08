<?php

namespace Tests\Feature;

use App\Models\KlasifikasiSurat;
use App\Models\Surat;
use App\Models\TemplateNomor;
use App\Models\UnitPengolah;
use App\Models\User;
use App\Services\NomorSuratService;
use Carbon\Carbon;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuratKeluarNomorTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
    }

    private function adminUser(): User
    {
        $user = User::factory()->create(['username' => 'admin-test', 'avatar' => '']);
        $user->assignRole('admin');

        return $user;
    }

    public function test_nomor_surat_dibuat_otomatis_dari_template(): void
    {
        $admin = $this->adminUser();
        $template = TemplateNomor::create([
            'nama' => 'Format Lengkap',
            'kode' => 'LENGKAP',
            'format' => '{nomor}/{klasifikasi}/{unit}/{bulan}/{tahun}',
            'digit_nomor' => 3,
            'reset_periode' => 'tahun',
            'is_aktif' => true,
        ]);
        $klasifikasi = KlasifikasiSurat::create(['kode' => 'KER.01', 'nama' => 'Kerja Sama']);
        $unit = UnitPengolah::create(['kode' => 'PUS', 'nama' => 'Perpustakaan']);

        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Surat Jawaban',
            'template_nomor_id' => $template->id,
            'klasifikasi_surat_id' => $klasifikasi->id,
            'unit_pengolah_id' => $unit->id,
            'tanggal_surat' => '2026-08-01',
            'tujuan_surat' => 'UPT Perpustakaan',
            'sifat' => 'biasa',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('surats', [
            'jenis' => 'keluar',
            'no_surat' => '001/KER.01/PUS/VIII/2026',
            'nomor_urut' => 1,
        ]);
    }

    public function test_nomor_urut_berjalan_dan_reset_per_tahun(): void
    {
        $admin = $this->adminUser();
        $template = TemplateNomor::create([
            'nama' => 'Umum',
            'kode' => 'UMUM',
            'format' => '{nomor}/PERPUS/{bulan}/{tahun}',
            'digit_nomor' => 3,
            'reset_periode' => 'tahun',
            'is_aktif' => true,
        ]);

        // Surat 1 di 2026
        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Surat Pertama',
            'template_nomor_id' => $template->id,
            'tanggal_surat' => '2026-02-10',
            'sifat' => 'biasa',
        ]);

        // Surat 2 di 2026 → urut lanjut
        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Surat Kedua',
            'template_nomor_id' => $template->id,
            'tanggal_surat' => '2026-03-15',
            'sifat' => 'biasa',
        ]);

        // Surat 3 di 2027 → nomor reset ke 001
        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Surat Ketiga',
            'template_nomor_id' => $template->id,
            'tanggal_surat' => '2027-01-05',
            'sifat' => 'biasa',
        ]);

        $surat1 = Surat::where('perihal', 'Surat Pertama')->first();
        $surat2 = Surat::where('perihal', 'Surat Kedua')->first();
        $surat3 = Surat::where('perihal', 'Surat Ketiga')->first();

        $this->assertSame('001/PERPUS/II/2026', $surat1->no_surat);
        $this->assertSame('002/PERPUS/III/2026', $surat2->no_surat);
        $this->assertSame('001/PERPUS/I/2027', $surat3->no_surat);
    }

    public function test_nomor_manual_tanpa_template(): void
    {
        $admin = $this->adminUser();

        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Surat Manual',
            'no_surat' => 'B-99/ADM/2026',
            'tanggal_surat' => '2026-05-01',
            'sifat' => 'biasa',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('surats', [
            'jenis' => 'keluar',
            'no_surat' => 'B-99/ADM/2026',
        ]);
    }

    public function test_surat_keluar_tanpa_template_dan_nomor_manual_ditolah(): void
    {
        $admin = $this->adminUser();

        $this->actingAs($admin)->post('/surat-keluar', [
            'perihal' => 'Tanpa Nomor',
            'tanggal_surat' => '2026-05-01',
            'sifat' => 'biasa',
        ])->assertSessionHasErrors('no_surat');
    }

    public function test_service_menghasilkan_bulan_romawi(): void
    {
        $service = app(NomorSuratService::class);
        $template = TemplateNomor::create([
            'nama' => 'Bulan',
            'kode' => 'BLN',
            'format' => '{nomor}/{bulan}/{tahun}',
            'digit_nomor' => 3,
            'reset_periode' => 'bulan',
            'is_aktif' => true,
        ]);
        $surat = Surat::create([
            'jenis' => 'keluar',
            'template_nomor_id' => $template->id,
            'nomor_urut' => 1,
            'perihal' => 'Tes',
            'tanggal_surat' => Carbon::parse('2026-12-25'),
        ]);

        $this->assertSame('001/XII/2026', $service->generate($surat));
    }
}
