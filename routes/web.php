<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\ArsipController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DisposisiController;
use App\Http\Controllers\KlasifikasiController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\TemplateNomorController;
use App\Http\Controllers\UnitPengolahController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /**
     * Surat Masuk
     */
    Route::get('/surat-masuk', [SuratController::class, 'index'])
        ->defaults('jenis', 'masuk')
        ->middleware('permission:lihat-surat-masuk')
        ->name('surat-masuk.index');
    Route::post('/surat-masuk', [SuratController::class, 'store'])
        ->defaults('jenis', 'masuk')
        ->middleware('permission:tambah-surat-masuk');
    Route::get('/surat-masuk/{surat}', [SuratController::class, 'show'])
        ->middleware('permission:lihat-surat-masuk')
        ->name('surat-masuk.show');
    Route::put('/surat-masuk/{surat}', [SuratController::class, 'update'])
        ->middleware('permission:edit-surat-masuk')
        ->name('surat-masuk.update');
    Route::delete('/surat-masuk/{surat}', [SuratController::class, 'destroy'])
        ->middleware('permission:hapus-surat-masuk')
        ->name('surat-masuk.destroy');

    /**
     * Surat Keluar
     */
    Route::get('/surat-keluar', [SuratController::class, 'index'])
        ->defaults('jenis', 'keluar')
        ->middleware('permission:lihat-surat-keluar')
        ->name('surat-keluar.index');
    Route::post('/surat-keluar', [SuratController::class, 'store'])
        ->defaults('jenis', 'keluar')
        ->middleware('permission:tambah-surat-keluar');
    Route::get('/surat-keluar/{surat}', [SuratController::class, 'show'])
        ->middleware('permission:lihat-surat-keluar')
        ->name('surat-keluar.show');
    Route::put('/surat-keluar/{surat}', [SuratController::class, 'update'])
        ->middleware('permission:edit-surat-keluar')
        ->name('surat-keluar.update');
    Route::delete('/surat-keluar/{surat}', [SuratController::class, 'destroy'])
        ->middleware('permission:hapus-surat-keluar')
        ->name('surat-keluar.destroy');

    /**
     * Lampiran
     */
    Route::get('/lampiran/{lampiran}/download', [SuratController::class, 'downloadLampiran'])
        ->middleware('auth')
        ->name('lampiran.download');

    /**
     * Disposisi
     */
    Route::get('/disposisi', [DisposisiController::class, 'index'])
        ->middleware('permission:lihat-disposisi')
        ->name('disposisi.index');
    Route::post('/disposisi', [DisposisiController::class, 'store'])
        ->middleware('permission:tambah-disposisi');
    Route::put('/disposisi/{disposisi}', [DisposisiController::class, 'update'])
        ->middleware('permission:edit-disposisi')
        ->name('disposisi.update');
    Route::patch('/disposisi/{disposisi}/status', [DisposisiController::class, 'status'])
        ->middleware('permission:edit-disposisi')
        ->name('disposisi.status');
    Route::delete('/disposisi/{disposisi}', [DisposisiController::class, 'destroy'])
        ->middleware('permission:hapus-disposisi')
        ->name('disposisi.destroy');
    Route::get('/cetak/disposisi/{disposisi}', [DisposisiController::class, 'cetak'])
        ->middleware('permission:lihat-disposisi')
        ->name('disposisi.cetak');

    /**
     * Arsip
     */
    Route::get('/arsip', [ArsipController::class, 'index'])
        ->middleware('permission:lihat-arsip')
        ->name('arsip.index');
    Route::put('/arsip/{surat}', [ArsipController::class, 'tandai'])
        ->middleware('permission:kelola-arsip')
        ->name('arsip.tandai');
    Route::get('/arsip/export', [ArsipController::class, 'export'])
        ->middleware('permission:export-arsip')
        ->name('arsip.export');

    /**
     * Agenda
     */
    Route::get('/agenda', [AgendaController::class, 'index'])
        ->middleware('permission:cetak-agenda')
        ->name('agenda.index');

    /**
     * Master: Klasifikasi Surat
     */
    Route::get('/klasifikasi', [KlasifikasiController::class, 'index'])
        ->middleware('permission:lihat-klasifikasi')
        ->name('klasifikasi.index');
    Route::post('/klasifikasi', [KlasifikasiController::class, 'store'])
        ->middleware('permission:tambah-klasifikasi');
    Route::put('/klasifikasi/{klasifikasi}', [KlasifikasiController::class, 'update'])
        ->middleware('permission:edit-klasifikasi')
        ->name('klasifikasi.update');
    Route::delete('/klasifikasi/{klasifikasi}', [KlasifikasiController::class, 'destroy'])
        ->middleware('permission:hapus-klasifikasi')
        ->name('klasifikasi.destroy');

    /**
     * Master: Unit Pengolah
     */
    Route::get('/unit-pengolah', [UnitPengolahController::class, 'index'])
        ->middleware('permission:lihat-unit')
        ->name('unit.index');
    Route::post('/unit-pengolah', [UnitPengolahController::class, 'store'])
        ->middleware('permission:tambah-unit');
    Route::put('/unit-pengolah/{unit}', [UnitPengolahController::class, 'update'])
        ->middleware('permission:edit-unit')
        ->name('unit.update');
    Route::delete('/unit-pengolah/{unit}', [UnitPengolahController::class, 'destroy'])
        ->middleware('permission:hapus-unit')
        ->name('unit.destroy');

    /**
     * Master: Template Nomor Surat (No. Surat Builder)
     */
    Route::get('/template-nomor', [TemplateNomorController::class, 'index'])
        ->middleware('permission:lihat-template-nomor')
        ->name('template-nomor.index');
    Route::post('/template-nomor', [TemplateNomorController::class, 'store'])
        ->middleware('permission:tambah-template-nomor');
    Route::post('/template-nomor/preview', [TemplateNomorController::class, 'preview'])
        ->middleware('auth')
        ->name('template-nomor.preview');
    Route::put('/template-nomor/{template}', [TemplateNomorController::class, 'update'])
        ->middleware('permission:edit-template-nomor')
        ->name('template-nomor.update');
    Route::delete('/template-nomor/{template}', [TemplateNomorController::class, 'destroy'])
        ->middleware('permission:hapus-template-nomor')
        ->name('template-nomor.destroy');

    /**
     * Pengguna
     */
    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:lihat-user')
        ->name('users.index');
    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:tambah-user');
    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:edit-user')
        ->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:hapus-user')
        ->name('users.destroy');

    /**
     * Roles
     */
    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:lihat-role');
    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:tambah-role');
    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:edit-role')
        ->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:hapus-role')
        ->name('roles.destroy');

    /**
     * Permissions
     */
    Route::get('/permissions', [PermissionController::class, 'index'])
        ->middleware('permission:lihat-akses');
    Route::post('/permissions', [PermissionController::class, 'store'])
        ->middleware('permission:tambah-akses');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])
        ->middleware('permission:edit-akses')
        ->name('permissions.update');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])
        ->middleware('permission:hapus-akses')
        ->name('permissions.destroy');
});

require __DIR__.'/settings.php';
