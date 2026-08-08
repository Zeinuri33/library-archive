'use client'

import { Head, router } from '@inertiajs/react'
import { CalendarDays, Printer } from 'lucide-react'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { formatTanggal } from '@/lib/surat'
import type { Surat } from '@/types/surat'

interface Props {
    surats: Surat[]
    jenis: 'masuk' | 'keluar'
    bulan: number
    tahun: number
    bulanLabels: Record<number, string>
    tahunList: number[]
}

export default function AgendaPage({ surats, jenis, bulan, tahun, bulanLabels, tahunList }: Props) {
    const applyFilter = (updates: Record<string, string | number>) => {
        router.get('/agenda', {
            jenis,
            bulan,
            tahun,
            ...updates,
        }, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <>
            <Head title="Agenda Surat" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print-hide">
                    <Heading
                        title="Agenda Surat"
                        description="Agenda surat masuk/keluar bulanan yang siap dicetak."
                    />
                    <div className="flex items-center gap-2">
                        <Select
                            value={jenis}
                            onValueChange={(v) => applyFilter({ jenis: v })}
                        >
                            <SelectTrigger size="sm" className="w-36">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="masuk">Surat Masuk</SelectItem>
                                <SelectItem value="keluar">Surat Keluar</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={String(bulan)}
                            onValueChange={(v) => applyFilter({ bulan: Number(v) })}
                        >
                            <SelectTrigger size="sm" className="w-36">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(bulanLabels).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={String(tahun)}
                            onValueChange={(v) => applyFilter({ tahun: Number(v) })}
                        >
                            <SelectTrigger size="sm" className="w-28">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {tahunList.map((t) => (
                                    <SelectItem key={t} value={String(t)}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button size="sm" className="gap-2" onClick={() => window.print()}>
                            <Printer className="h-4 w-4" />
                            Cetak
                        </Button>
                    </div>
                </div>

                {/* Printable document */}
                <div className="print-area overflow-hidden rounded-xl border bg-white shadow-soft dark:bg-white">
                    {/* Kop */}
                    <div className="border-b-2 border-slate-800 p-6 text-center text-slate-900">
                        <h1 className="text-lg font-bold uppercase tracking-wider">
                            Agenda Surat {jenis === 'masuk' ? 'Masuk' : 'Keluar'}
                        </h1>
                        <p className="mt-1 text-sm">
                            Perpustakaan Ibrahimy — {bulanLabels[bulan]} {tahun}
                        </p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-slate-900">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-100 text-left">
                                    <th className="w-10 px-4 py-3 text-center font-semibold">No</th>
                                    <th className="px-4 py-3 font-semibold">Tanggal</th>
                                    <th className="px-4 py-3 font-semibold">No. Surat</th>
                                    <th className="px-4 py-3 font-semibold">
                                        {jenis === 'masuk' ? 'Asal Surat' : 'Tujuan Surat'}
                                    </th>
                                    <th className="px-4 py-3 font-semibold">Perihal</th>
                                    <th className="px-4 py-3 font-semibold">Klasifikasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surats.length > 0 ? (
                                    surats.map((surat, index) => (
                                        <tr
                                            key={surat.id}
                                            className="border-b border-slate-200 last:border-0"
                                        >
                                            <td className="px-4 py-2.5 text-center">{index + 1}</td>
                                            <td className="px-4 py-2.5 whitespace-nowrap">
                                                {formatTanggal(surat.tanggal_surat)}
                                            </td>
                                            <td className="px-4 py-2.5 font-mono whitespace-nowrap">
                                                {surat.no_surat || '-'}
                                            </td>
                                            <td className="px-4 py-2.5">
                                                {jenis === 'masuk' ? surat.asal_surat : surat.tujuan_surat}
                                            </td>
                                            <td className="px-4 py-2.5">{surat.perihal}</td>
                                            <td className="px-4 py-2.5 font-mono">
                                                {surat.klasifikasi_surat?.kode || '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                                            Tidak ada surat pada periode ini.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between p-6 text-sm text-slate-900">
                        <div className="flex items-center gap-2 text-slate-500">
                            <CalendarDays className="h-4 w-4" />
                            Dicetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="text-center">
                            <p>Situbondo, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <p className="mt-1">Kepala Perpustakaan,</p>
                            <div className="mt-16" />
                            <p className="font-semibold underline">(..............................)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AgendaPage.layout = {
    breadcrumbs: [
        { title: 'Arsip & Cetak', href: '/agenda' },
        { title: 'Agenda Surat', href: '/agenda' },
    ],
}
