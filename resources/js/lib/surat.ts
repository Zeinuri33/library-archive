export const BULAN_ROMAWI = [
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII',
]

export const BULAN_INDONESIA = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export const SIFAT_OPTIONS = [
    { value: 'biasa', label: 'Biasa' },
    { value: 'penting', label: 'Penting' },
    { value: 'segera', label: 'Segera' },
    { value: 'sangat-segera', label: 'Sangat Segera' },
] as const

export const SIFAT_BADGE: Record<string, string> = {
    biasa: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    penting: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    segera: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    'sangat-segera': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
}

export const STATUS_DISPOSISI: Record<string, { label: string; badge: string }> = {
    belum: {
        label: 'Belum Diproses',
        badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    },
    proses: {
        label: 'Sedang Diproses',
        badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    },
    selesai: {
        label: 'Selesai',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    },
}

export function formatTanggal(value: string | null | undefined): string {
    if (!value) {
return '-'
}

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
return value
}

    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

export function formatTanggalPanjang(value: string | null | undefined): string {
    if (!value) {
return '-'
}

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
return value
}

    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function formatUkuran(bytes: number | null | undefined): string {
    if (!bytes) {
return '-'
}

    if (bytes < 1024) {
return `${bytes} B`
}

    if (bytes < 1024 * 1024) {
return `${(bytes / 1024).toFixed(1)} KB`
}

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
