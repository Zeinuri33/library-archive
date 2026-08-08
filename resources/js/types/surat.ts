export interface Klasifikasi {
    id: number
    kode: string
    nama: string
    keterangan: string | null
    surats_count?: number
}

export interface Unit {
    id: number
    kode: string
    nama: string
    keterangan: string | null
    surats_count?: number
}

export interface TemplateNomor {
    id: number
    nama: string
    kode: string
    format: string
    digit_nomor: number
    reset_periode: 'tahun' | 'bulan' | 'kontinu'
    is_aktif: boolean
    keterangan: string | null
    surats_count?: number
}

export interface Lampiran {
    id: number
    surat_id: number
    nama_asli: string
    path: string
    mime: string | null
    ukuran: number | null
    url?: string | null
    created_at: string
}

export interface Disposisi {
    id: number
    surat_id: number
    tujuan: string | null
    user_id: number | null
    user?: { id: number; name: string } | null
    instruksi: string | null
    catatan: string | null
    batas_waktu: string | null
    status: 'belum' | 'proses' | 'selesai'
    created_by: number | null
    pembuat?: { id: number; name: string } | null
    surat?: Surat | null
    created_at: string
    updated_at: string
}

export interface Surat {
    id: number
    jenis: 'masuk' | 'keluar'
    no_agenda: string | null
    no_surat: string | null
    template_nomor_id: number | null
    klasifikasi_surat_id: number | null
    unit_pengolah_id: number | null
    perihal: string
    ringkasan: string | null
    asal_surat: string | null
    pengirim: string | null
    tujuan_surat: string | null
    penerima: string | null
    tanggal_surat: string | null
    tanggal_terima: string | null
    tanggal_kirim: string | null
    sifat: string
    status_arsip: 'aktif' | 'arsip'
    lokasi_arsip: string | null
    template_nomor?: TemplateNomor | null
    klasifikasi_surat?: Klasifikasi | null
    unit_pengolah?: Unit | null
    lampirans?: Lampiran[]
    disposisis?: Disposisi[]
    pembuat?: { id: number; name: string } | null
    created_at: string
    updated_at: string
}

export interface ChartPoint {
    label: string
    key: string
    masuk: number
    keluar: number
}

export interface DashboardStats {
    suratMasuk: number
    suratKeluar: number
    suratBulanIni: number
    disposisiAktif: number
    disposisiSelesai: number
    arsipCount: number
    totalUsers: number
}
