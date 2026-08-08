<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // ======================
        // PERMISSIONS
        // ======================

        $permissions = [
            // Pengguna
            'lihat-user', 'tambah-user', 'edit-user', 'hapus-user',
            // Role
            'lihat-role', 'tambah-role', 'edit-role', 'hapus-role',
            // Akses
            'lihat-akses', 'tambah-akses', 'edit-akses', 'hapus-akses',

            // Surat Masuk
            'lihat-surat-masuk', 'tambah-surat-masuk', 'edit-surat-masuk', 'hapus-surat-masuk',
            // Surat Keluar
            'lihat-surat-keluar', 'tambah-surat-keluar', 'edit-surat-keluar', 'hapus-surat-keluar',
            // Disposisi
            'lihat-disposisi', 'tambah-disposisi', 'edit-disposisi', 'hapus-disposisi',
            // Arsip
            'lihat-arsip', 'export-arsip', 'kelola-arsip',
            // Agenda
            'cetak-agenda',

            // Master: Klasifikasi
            'lihat-klasifikasi', 'tambah-klasifikasi', 'edit-klasifikasi', 'hapus-klasifikasi',
            // Master: Unit
            'lihat-unit', 'tambah-unit', 'edit-unit', 'hapus-unit',
            // Master: Template Nomor
            'lihat-template-nomor', 'tambah-template-nomor', 'edit-template-nomor', 'hapus-template-nomor',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ======================
        // ROLES
        // ======================

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $operator = Role::firstOrCreate(['name' => 'operator']);
        $pimpinan = Role::firstOrCreate(['name' => 'pimpinan']);
        $user = Role::firstOrCreate(['name' => 'user']);

        // ======================
        // ASSIGN PERMISSIONS
        // ======================

        $admin->syncPermissions($permissions);

        $operator->syncPermissions([
            'lihat-surat-masuk', 'tambah-surat-masuk', 'edit-surat-masuk', 'hapus-surat-masuk',
            'lihat-surat-keluar', 'tambah-surat-keluar', 'edit-surat-keluar', 'hapus-surat-keluar',
            'lihat-disposisi', 'tambah-disposisi', 'edit-disposisi', 'hapus-disposisi',
            'lihat-arsip', 'export-arsip', 'kelola-arsip',
            'cetak-agenda',
            'lihat-klasifikasi', 'tambah-klasifikasi', 'edit-klasifikasi', 'hapus-klasifikasi',
            'lihat-unit', 'tambah-unit', 'edit-unit', 'hapus-unit',
            'lihat-template-nomor', 'tambah-template-nomor', 'edit-template-nomor', 'hapus-template-nomor',
        ]);

        $pimpinan->syncPermissions([
            'lihat-surat-masuk',
            'lihat-surat-keluar',
            'lihat-disposisi', 'tambah-disposisi', 'edit-disposisi',
            'lihat-arsip', 'export-arsip', 'kelola-arsip',
            'cetak-agenda',
            'lihat-klasifikasi', 'lihat-unit', 'lihat-template-nomor',
        ]);

        $user->syncPermissions([
            'lihat-surat-masuk',
            'lihat-surat-keluar',
            'lihat-disposisi',
            'lihat-arsip',
            'cetak-agenda',
        ]);
    }
}
