<?php

namespace Tests\Feature;

use App\Models\Disposisi;
use App\Models\Surat;
use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DisposisiArsipTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
    }

    private ?User $cachedAdmin = null;

    private function adminUser(): User
    {
        if ($this->cachedAdmin) {
            return $this->cachedAdmin;
        }

        $user = User::factory()->create(['username' => 'admin-test', 'avatar' => '']);
        $user->assignRole('admin');

        return $this->cachedAdmin = $user;
    }

    private function createSurat(string $jenis = 'masuk'): Surat
    {
        return Surat::create([
            'jenis' => $jenis,
            'no_agenda' => '001/2026',
            'no_agenda_urut' => 1,
            'no_surat' => $jenis === 'masuk' ? '001/INST/2026' : '001/PERPUS/I/2026',
            'perihal' => 'Surat Contoh',
            'asal_surat' => 'Instansi Pengirim',
            'tujuan_surat' => 'Instansi Tujuan',
            'tanggal_surat' => '2026-08-01',
            'sifat' => 'biasa',
            'created_by' => $this->adminUser()->id,
        ]);
    }

    public function test_admin_dapat_membuat_disposisi(): void
    {
        $admin = $this->adminUser();
        $surat = $this->createSurat();

        $this->actingAs($admin)->post('/disposisi', [
            'surat_id' => $surat->id,
            'tujuan' => 'Kepala Perpustakaan',
            'instruksi' => 'Mohon ditindaklanjuti',
            'batas_waktu' => '2026-08-10',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('disposisi', [
            'surat_id' => $surat->id,
            'tujuan' => 'Kepala Perpustakaan',
            'instruksi' => 'Mohon ditindaklanjuti',
            'status' => 'belum',
        ]);
    }

    public function test_status_disposisi_dapat_diubah(): void
    {
        $admin = $this->adminUser();
        $surat = $this->createSurat();
        $disposisi = Disposisi::create([
            'surat_id' => $surat->id,
            'tujuan' => 'Kepala',
            'status' => 'belum',
            'created_by' => $admin->id,
        ]);

        $this->actingAs($admin)->patch("/disposisi/{$disposisi->id}/status", [
            'status' => 'selesai',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('disposisi', [
            'id' => $disposisi->id,
            'status' => 'selesai',
        ]);
    }

    public function test_surat_dapat_diarsipkan(): void
    {
        $admin = $this->adminUser();
        $surat = $this->createSurat();

        $this->actingAs($admin)->put("/arsip/{$surat->id}", [
            'status_arsip' => 'arsip',
            'lokasi_arsip' => 'Rak A - Box 2',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('surats', [
            'id' => $surat->id,
            'status_arsip' => 'arsip',
            'lokasi_arsip' => 'Rak A - Box 2',
        ]);
    }

    public function test_export_arsip_menghasilkan_csv(): void
    {
        $admin = $this->adminUser();
        $this->createSurat();

        $response = $this->actingAs($admin)->get('/arsip/export');

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertSee('Surat Contoh', false);
        $response->assertSee('001/INST/2026', false);
    }

    public function test_agenda_page_memuat_surat(): void
    {
        $admin = $this->adminUser();
        $this->createSurat();

        $this->actingAs($admin)
            ->get('/agenda?jenis=masuk&bulan=8&tahun=2026')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('agenda/page')
                ->has('surats', 1));
    }
}
