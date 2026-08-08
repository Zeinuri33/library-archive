'use client'

import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, Download, Paperclip, Printer, Send } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatTanggalPanjang, formatUkuran, SIFAT_BADGE } from '@/lib/surat'
import type { Surat } from '@/types/surat'

interface Props {
    surat: Surat
}

export default function SuratKeluarDetail({ surat }: Props) {
    const rows = [
        { label: 'No. Agenda', value: surat.no_agenda || '-', mono: true },
        { label: 'No. Surat', value: surat.no_surat || '-', mono: true },
        { label: 'Tanggal Surat', value: formatTanggalPanjang(surat.tanggal_surat) },
        { label: 'Tanggal Kirim', value: formatTanggalPanjang(surat.tanggal_kirim) },
        { label: 'Tujuan Surat', value: surat.tujuan_surat || '-' },
        { label: 'Penerima', value: surat.penerima || '-' },
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
        {
            label: 'Template Nomor',
            value: surat.template_nomor ? `${surat.template_nomor.nama} (${surat.template_nomor.format})` : '-',
            mono: true,
        },
        { label: 'Dicatat Oleh', value: surat.pembuat?.name || '-' },
    ]

    return (
        <>
            <Head title={surat.perihal} />

            <div className="space-y-5 p-6">
                {/* Back */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/surat-keluar">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Surat Keluar
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
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                            <Send className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline">Surat Keluar</Badge>
                                <Badge variant="outline" className={SIFAT_BADGE[surat.sifat] || ''}>
                                    {surat.sifat}
                                </Badge>
                                {surat.status_arsip === 'arsip' && (
                                    <Badge variant="secondary">Arsip · {surat.lokasi_arsip || '-'}</Badge>
                                )}
                            </div>
                            <h1 className="mt-2 text-xl font-bold tracking-tight">{surat.perihal}</h1>
                            <p className="mt-1 font-mono text-sm font-semibold text-primary">
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
            </div>
        </>
    )
}
