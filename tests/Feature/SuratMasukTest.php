<?php

namespace Tests\Feature;

use App\Models\KlasifikasiSurat;
use App\Models\Surat;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SuratMasukTest extends TestCase
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

    public function test_admin_dapat_mencatat_surat_masuk(): void
    {
        $admin = $this->adminUser();
        $klasifikasi = KlasifikasiSurat::create(['kode' => 'KOR.01', 'nama' => 'Korespondensi']);

        $response = $this->actingAs($admin)->post('/surat-masuk', [
            'perihal' => 'Permohonan Kerja Sama',
            'no_surat' => '001/UN-IBS/2026',
            'asal_surat' => 'UPT Perpustakaan',
            'pengirim' => 'Dr. Ahmad',
            'tanggal_surat' => '2026-08-01',
            'tanggal_terima' => '2026-08-02',
            'sifat' => 'penting',
            'klasifikasi_surat_id' => $klasifikasi->id,
        ]);

        $response->assertSessionHas('success');

        $this->assertDatabaseHas('surats', [
            'jenis' => 'masuk',
            'perihal' => 'Permohonan Kerja Sama',
            'no_surat' => '001/UN-IBS/2026',
        ]);

        // Nomor agenda otomatis terisi
        $surat = Surat::where('perihal', 'Permohonan Kerja Sama')->first();
        $this->assertNotNull($surat->no_agenda);
        $this->assertSame('001/2026', $surat->no_agenda);
    }

    public function test_validasi_wajib_perihal_dan_tanggal(): void
    {
        $admin = $this->adminUser();

        $response = $this->actingAs($admin)->post('/surat-masuk', [
            'perihal' => '',
            'tanggal_surat' => '',
            'sifat' => 'biasa',
        ]);

        $response->assertSessionHasErrors(['perihal', 'tanggal_surat']);
        $this->assertDatabaseCount('surats', 0);
    }

    public function test_user_tanpa_permission_tidak_bisa_menambah_surat(): void
    {
        $user = User::factory()->create(['username' => 'biasa', 'avatar' => '']);

        $this->actingAs($user)
            ->post('/surat-masuk', ['perihal' => 'X', 'tanggal_surat' => '2026-08-01', 'sifat' => 'biasa'])
            ->assertForbidden();
    }
}
