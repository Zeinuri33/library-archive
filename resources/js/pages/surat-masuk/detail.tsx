'use client'

import { Head, Link, usePage } from '@inertiajs/react'
import { ArrowLeft, Download, Inbox, Paperclip, Printer } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatTanggal, formatTanggalPanjang, formatUkuran, SIFAT_BADGE, STATUS_DISPOSISI } from '@/lib/surat'
import type { User } from '@/types'
import type { Surat } from '@/types/surat'

interface Props {
    surat: Surat
    users: User[]
}

export default function SuratMasukDetail({ surat, users }: Props) {
    void users
    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const rows = [
        { label: 'No. Agenda', value: surat.no_agenda || '-', mono: true },
        { label: 'No. Surat (Pengirim)', value: surat.no_surat || '-', mono: true },
        { label: 'Tanggal Surat', value: formatTanggalPanjang(surat.tanggal_surat) },
        { label: 'Tanggal Terima', value: formatTanggalPanjang(surat.tanggal_terima) },
        { label: 'Asal Surat', value: surat.asal_surat || '-' },
        { label: 'Pengirim', value: surat.pengirim || '-' },
        {
            label: 'Klasifikasi',
            value: surat.klasifikasi_surat
                ? `${surat.klasifikasi_surat.kode} — ${surat.klasifikasi_surat.nama}`
                : '-',
        },
        {
            label: 'Unit Pengolah',
            value: surat.unit_pengolah
                ? `${surat.unit_pengolah.kode} — ${surat.unit_pengolah.nama}`
                : '-',
        },
        { label: 'Dicatat Oleh', value: surat.pembuat?.name || '-' },
    ]

    return (
        <>
            <Head title={surat.perihal} />

            <div className="space-y-5 p-6">
                {/* Back */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/surat-masuk">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Surat Masuk
                        </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
                        <Printer className="h-4 w-4" />
                        Cetak
                    </Button>
                </div>

                {/* Kop */}
                <div className="rounded-xl border bg-card shadow-soft">
                    <div className="flex items-start gap-4 border-b p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                            <Inbox className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline">Surat Masuk</Badge>
                                <Badge variant="outline" className={SIFAT_BADGE[surat.sifat] || ''}>
                                    {surat.sifat}
                                </Badge>
                                {surat.status_arsip === 'arsip' && (
                                    <Badge variant="secondary">Arsip · {surat.lokasi_arsip || '-'}</Badge>
                                )}
                            </div>
                            <h1 className="mt-2 text-xl font-bold tracking-tight">{surat.perihal}</h1>
                            <p className="mt-1 font-mono text-sm text-muted-foreground">
                                {surat.no_surat || '-'}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2">
                        {rows.map((row) => (
                            <div key={row.label} className="space-y-0.5">
                                <p className="text-xs text-muted-foreground">{row.label}</p>
                                <p className={`text-sm font-medium ${row.mono ? 'font-mono' : ''}`}>
                                    {row.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {surat.ringkasan && (
                        <div className="border-t p-6">
                            <p className="text-xs text-muted-foreground">Ringkasan / Isi</p>
                            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">
                                {surat.ringkasan}
                            </p>
                        </div>
                    )}
                </div>

                {/* Lampiran */}
                <div className="rounded-xl border bg-card p-6 shadow-soft">
                    <h2 className="mb-4 flex items-center gap-2 font-semibold">
                        <Paperclip className="h-4 w-4" />
                        Lampiran ({surat.lampirans?.length ?? 0})
                    </h2>
                    {surat.lampirans && surat.lampirans.length > 0 ? (
                        <div className="space-y-2">
                            {surat.lampirans.map((lampiran) => (
                                <div
                                    key={lampiran.id}
                                    className="flex items-center justify-between rounded-lg border px-4 py-3 transition-colors hover:bg-muted/50"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{lampiran.nama_asli}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatUkuran(lampiran.ukuran)}
                                        </p>
                                    </div>
                                    <a href={`/lampiran/${lampiran.id}/download`}>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Download className="h-4 w-4" />
                                            Unduh
                                        </Button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Tidak ada lampiran.</p>
                    )}
                </div>

                {/* Disposisi */}
                <div className="rounded-xl border bg-card p-6 shadow-soft">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold">Disposisi ({surat.disposisis?.length ?? 0})</h2>
                        {can('tambah-disposisi') && (
                            <Link href="/disposisi">
                                <Button variant="outline" size="sm">
                                    Kelola Disposisi
                                </Button>
                            </Link>
                        )}
                    </div>

                    {surat.disposisis && surat.disposisis.length > 0 ? (
                        <div className="space-y-3">
                            {surat.disposisis.map((disposisi) => (
                                <div key={disposisi.id} className="rounded-lg border p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-medium">
                                            {disposisi.user?.name || disposisi.tujuan || 'Tanpa tujuan'}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={STATUS_DISPOSISI[disposisi.status]?.badge || ''}
                                        >
                                            {STATUS_DISPOSISI[disposisi.status]?.label || disposisi.status}
                                        </Badge>
                                    </div>
                                    {disposisi.instruksi && (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Instruksi: {disposisi.instruksi}
                                        </p>
                                    )}
                                    {disposisi.catatan && (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Catatan: {disposisi.catatan}
                                        </p>
                                    )}
                                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>Batas: {formatTanggal(disposisi.batas_waktu)}</span>
                                        <Separator orientation="vertical" className="h-3" />
                                        <span>Oleh: {disposisi.pembuat?.name || '-'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Belum ada disposisi. Buat disposisi dari halaman Disposisi.
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
