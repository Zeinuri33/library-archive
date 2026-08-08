'use client'

import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatTanggal, formatTanggalPanjang, STATUS_DISPOSISI } from '@/lib/surat'
import type { Disposisi } from '@/types/surat'

interface Props {
    disposisi: Disposisi
}

export default function CetakDisposisi({ disposisi }: Props) {
    const surat = disposisi.surat

    return (
        <>
            <Head title={`Lembar Disposisi - ${surat?.no_surat || ''}`} />

            {/* Toolbar (hidden saat print) */}
            <div className="print-hide sticky top-0 z-20 flex items-center justify-between border-b bg-background/80 px-6 py-3 backdrop-blur">
                <Link href="/disposisi">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
                <Button size="sm" className="gap-2" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" />
                    Cetak Lembar Disposisi
                </Button>
            </div>

            <div className="print-area mx-auto max-w-3xl bg-white p-10 text-slate-900 shadow-soft dark:bg-white">
                {/* Kop */}
                <div className="border-b-4 border-double border-slate-800 pb-4 text-center">
                    <h1 className="text-lg font-bold uppercase tracking-wide">
                        Perpustakaan Ibrahimy
                    </h1>
                    <p className="mt-0.5 text-xs">Jl. Ibrahimy No. 1, Situbondo, Jawa Timur</p>
                </div>

                <h2 className="mt-6 text-center text-xl font-bold uppercase underline underline-offset-4">
                    Lembar Disposisi
                </h2>

                {/* Informasi surat */}
                <table className="mt-6 w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="w-44 py-1.5 align-top font-semibold">Indeks</td>
                            <td className="py-1.5 align-top">: {surat?.klasifikasi_surat?.kode || '-'}</td>
                            <td className="w-44 py-1.5 align-top font-semibold">No. Agenda</td>
                            <td className="py-1.5 align-top">: {surat?.no_agenda || '-'}</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 align-top font-semibold">Kode</td>
                            <td className="py-1.5 align-top">: {surat?.unit_pengolah?.kode || '-'}</td>
                            <td className="py-1.5 align-top font-semibold">Tanggal</td>
                            <td className="py-1.5 align-top">: {formatTanggal(surat?.tanggal_surat)}</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 align-top font-semibold">No. Surat</td>
                            <td className="py-1.5 align-top font-mono">: {surat?.no_surat || '-'}</td>
                            <td className="py-1.5 align-top font-semibold">Diterima</td>
                            <td className="py-1.5 align-top">: {formatTanggal(surat?.tanggal_terima)}</td>
                        </tr>
                        <tr>
                            <td className="py-1.5 align-top font-semibold">Asal Surat</td>
                            <td colSpan={3} className="py-1.5 align-top">
                                : {surat?.asal_surat || surat?.tujuan_surat || '-'}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1.5 align-top font-semibold">Perihal</td>
                            <td colSpan={3} className="py-1.5 align-top">
                                : {surat?.perihal || '-'}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-6">
                    <p className="mb-1 text-sm font-semibold">
                        Kepada Yth: <span className="font-normal">{disposisi.user?.name || disposisi.tujuan || '-'}</span>
                    </p>

                    <table className="mt-4 w-full border-collapse text-sm">
                        <tbody>
                            <tr>
                                <td className="w-40 border border-slate-800 px-3 py-3 font-semibold align-top">
                                    Instruksi / Informasi
                                </td>
                                <td className="border border-slate-800 px-3 py-3 align-top">
                                    {disposisi.instruksi || '-'}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-800 px-3 py-3 font-semibold align-top">
                                    Catatan
                                </td>
                                <td className="h-24 border border-slate-800 px-3 py-3 align-top">
                                    {disposisi.catatan || ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <p>
                        Batas Waktu: <b>{formatTanggalPanjang(disposisi.batas_waktu)}</b>
                    </p>
                    <p>
                        Status:{' '}
                        <b>{STATUS_DISPOSISI[disposisi.status]?.label || disposisi.status}</b>
                    </p>
                </div>

                {/* Tanda tangan */}
                <div className="mt-16 flex justify-end text-sm">
                    <div className="text-center">
                        <p>Situbondo, {formatTanggalPanjang(disposisi.created_at)}</p>
                        <p className="mt-1">Mengetahui,</p>
                        <p className="mt-1 font-semibold">Kepala Perpustakaan</p>
                        <div className="mt-14" />
                        <p className="font-semibold underline">(..............................)</p>
                    </div>
                </div>
            </div>
        </>
    )
}
