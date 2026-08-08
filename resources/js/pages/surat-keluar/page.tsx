'use client'

import { Head, usePage } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import type { Klasifikasi, Surat, TemplateNomor, Unit } from '@/types/surat'
import { columns } from './columns'
import CreateSuratKeluarModal from './create'
import EditSuratKeluarModal from './edit'

interface Props {
    surats: Surat[]
    klasifikasis: Klasifikasi[]
    units: Unit[]
    templates: TemplateNomor[]
}

export default function SuratKeluar({ surats, klasifikasis, units, templates }: Props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedSurat, setSelectedSurat] = useState<Surat | null>(null)

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const handleEdit = (surat: Surat) => {
        setSelectedSurat(surat)
        setOpenEdit(true)
    }

    const stats = useMemo(() => {
        const total = surats.length
        const bulanIni = surats.filter((s) => {
            if (!s.tanggal_surat) {
return false
}

            const d = new Date(s.tanggal_surat)
            const now = new Date()

            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        }).length
        const pakaiTemplate = surats.filter((s) => s.template_nomor_id).length

        return { total, bulanIni, pakaiTemplate }
    }, [surats])

    return (
        <>
            <Head title="Surat Keluar" />

            <div className="space-y-4 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Surat Keluar"
                        description="Surat yang dikeluarkan perpustakaan dengan nomor surat otomatis."
                    />
                    {can('tambah-surat-keluar') && (
                        <CreateSuratKeluarModal
                            klasifikasis={klasifikasis}
                            units={units}
                            templates={templates}
                        />
                    )}
                </div>

                {/* Mini stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Surat Keluar', value: stats.total },
                        { label: 'Bulan Ini', value: stats.bulanIni },
                        { label: 'Menggunakan Template', value: stats.pakaiTemplate },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border bg-card p-4 shadow-soft"
                        >
                            <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                            <p className="mt-1 text-2xl font-bold tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <DataTable columns={columns(handleEdit)} data={surats} />

                {/* Modal Edit */}
                {selectedSurat && (
                    <EditSuratKeluarModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        surat={selectedSurat}
                        klasifikasis={klasifikasis}
                        units={units}
                        templates={templates}
                    />
                )}
            </div>
        </>
    )
}

SuratKeluar.layout = {
    breadcrumbs: [
        { title: 'Persuratan', href: '/surat-keluar' },
        { title: 'Surat Keluar', href: '/surat-keluar' },
    ],
}
