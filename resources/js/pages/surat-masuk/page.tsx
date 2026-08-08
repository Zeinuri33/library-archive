'use client'

import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import { DataTable } from '@/components/data-table'
import Heading from '@/components/heading'
import type { Klasifikasi, Surat, Unit } from '@/types/surat'
import { columns } from './columns'
import CreateSuratMasukModal from './create'
import EditSuratMasukModal from './edit'

interface Props {
    surats: Surat[]
    klasifikasis: Klasifikasi[]
    units: Unit[]
}

export default function SuratMasuk({ surats, klasifikasis, units }: Props) {
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
        const belumDisposisi = surats.filter((s) => (s.disposisis?.length ?? 0) === 0).length

        return { total, bulanIni, belumDisposisi }
    }, [surats])

    return (
        <>
            <Head title="Surat Masuk" />

            <div className="space-y-4 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Surat Masuk"
                        description="Pencatatan surat yang diterima perpustakaan."
                    />
                    {can('tambah-surat-masuk') && (
                        <CreateSuratMasukModal klasifikasis={klasifikasis} units={units} />
                    )}
                </div>

                {/* Mini stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Surat Masuk', value: stats.total },
                        { label: 'Masuk Bulan Ini', value: stats.bulanIni },
                        { label: 'Belum Didisposisi', value: stats.belumDisposisi },
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
                    <EditSuratMasukModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        surat={selectedSurat}
                        klasifikasis={klasifikasis}
                        units={units}
                    />
                )}
            </div>
        </>
    )
}

SuratMasuk.layout = {
    breadcrumbs: [
        { title: 'Persuratan', href: '/surat-masuk' },
        { title: 'Surat Masuk', href: '/surat-masuk' },
    ],
}
