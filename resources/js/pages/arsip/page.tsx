'use client'

import { Head, Link, router, usePage } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import {
    Archive,
    ArchiveRestore,
    Download,
    FilterX,
    Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { DataTable } from '@/components/data-table'
import { DataTableSortHeader } from '@/components/data-table-sort-header'
import Heading from '@/components/heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { formatTanggal, SIFAT_BADGE } from '@/lib/surat'
import type { Klasifikasi, Surat } from '@/types/surat'

interface Props {
    surats: Surat[]
    klasifikasis: Klasifikasi[]
    tahunList: number[]
}

export default function ArsipPage({ surats, klasifikasis, tahunList }: Props) {
    const [q, setQ] = useState('')
    const [jenis, setJenis] = useState('semua')
    const [tahun, setTahun] = useState('semua')
    const [klasifikasi, setKlasifikasi] = useState('semua')
    const [sifat, setSifat] = useState('semua')
    const [statusArsip, setStatusArsip] = useState('semua')
    const [archiveSurat, setArchiveSurat] = useState<Surat | null>(null)
    const [lokasiArsip, setLokasiArsip] = useState('')

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const filtered = useMemo(() => {
        return surats.filter((s) => {
            if (q) {
                const hay = [
                    s.perihal,
                    s.no_surat,
                    s.no_agenda,
                    s.asal_surat,
                    s.tujuan_surat,
                    s.pengirim,
                    s.penerima,
                    s.ringkasan,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()

                if (!hay.includes(q.toLowerCase())) {
return false
}
            }

            if (jenis !== 'semua' && s.jenis !== jenis) {
return false
}

            if (tahun !== 'semua' && s.tanggal_surat && new Date(s.tanggal_surat).getFullYear() !== Number(tahun)) {
return false
}

            if (klasifikasi !== 'semua' && s.klasifikasi_surat_id !== Number(klasifikasi)) {
return false
}

            if (sifat !== 'semua' && s.sifat !== sifat) {
return false
}

            if (statusArsip !== 'semua' && s.status_arsip !== statusArsip) {
return false
}

            return true
        })
    }, [surats, q, jenis, tahun, klasifikasi, sifat, statusArsip])

    const hasFilters = q || jenis !== 'semua' || tahun !== 'semua' || klasifikasi !== 'semua' || sifat !== 'semua' || statusArsip !== 'semua'

    const clearFilters = () => {
        setQ('')
        setJenis('semua')
        setTahun('semua')
        setKlasifikasi('semua')
        setSifat('semua')
        setStatusArsip('semua')
    }

    const doExport = () => {
        const params = new URLSearchParams()

        if (q) {
params.set('q', q)
}

        if (jenis !== 'semua') {
params.set('jenis', jenis)
}

        if (tahun !== 'semua') {
params.set('tahun', tahun)
}

        if (klasifikasi !== 'semua') {
params.set('klasifikasi_surat_id', klasifikasi)
}

        if (sifat !== 'semua') {
params.set('sifat', sifat)
}

        if (statusArsip !== 'semua') {
params.set('status_arsip', statusArsip)
}

        window.location.href = `/arsip/export?${params.toString()}`
    }

    const submitArsip = () => {
        if (!archiveSurat) {
return
}

        const targetStatus = archiveSurat.status_arsip === 'arsip' ? 'aktif' : 'arsip'

        router.put(`/arsip/${archiveSurat.id}`, {
            status_arsip: targetStatus,
            lokasi_arsip: targetStatus === 'arsip' ? lokasiArsip : null,
        }, {
            onSuccess: () => {
                toast(targetStatus === 'arsip' ? 'Surat berhasil diarsipkan' : 'Surat dikembalikan ke status aktif')
                setArchiveSurat(null)
                setLokasiArsip('')
            },
            onError: () => toast('Gagal memperbarui arsip'),
        })
    }

    const columns: ColumnDef<Surat>[] = [
        {
            accessorKey: 'no_agenda',
            header: ({ column }) => (
                <DataTableSortHeader column={column}>Agenda</DataTableSortHeader>
            ),
            cell: ({ row }) => (
                <span className="ml-3 font-mono text-xs">{row.getValue('no_agenda') || '-'}</span>
            ),
        },
        {
            accessorKey: 'no_surat',
            header: ({ column }) => (
                <DataTableSortHeader column={column}>No. Surat</DataTableSortHeader>
            ),
            cell: ({ row }) => (
                <span className="font-mono text-xs">{row.getValue('no_surat') || '-'}</span>
            ),
        },
        {
            id: 'jenis',
            accessorKey: 'jenis',
            header: 'Jenis',
            cell: ({ row }) => (
                <Badge variant={row.original.jenis === 'masuk' ? 'secondary' : 'outline'}>
                    {row.original.jenis === 'masuk' ? 'Masuk' : 'Keluar'}
                </Badge>
            ),
        },
        {
            accessorKey: 'tanggal_surat',
            header: ({ column }) => (
                <DataTableSortHeader column={column}>Tanggal</DataTableSortHeader>
            ),
            sortingFn: (a, b) => {
                const va = a.getValue('tanggal_surat') as string
                const vb = b.getValue('tanggal_surat') as string

                return new Date(va).getTime() - new Date(vb).getTime()
            },
            cell: ({ row }) => <span className="text-sm">{formatTanggal(row.getValue('tanggal_surat'))}</span>,
        },
        {
            accessorKey: 'perihal',
            header: 'Perihal',
            cell: ({ row }) => (
                <div className="max-w-[240px]">
                    <p className="truncate text-sm">{row.getValue('perihal')}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {row.original.jenis === 'masuk'
                            ? row.original.asal_surat || '-'
                            : row.original.tujuan_surat || '-'}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'sifat',
            header: 'Sifat',
            cell: ({ row }) => (
                <Badge variant="outline" className={SIFAT_BADGE[row.original.sifat] || ''}>
                    {row.original.sifat}
                </Badge>
            ),
        },
        {
            id: 'status_arsip',
            accessorKey: 'status_arsip',
            header: 'Status',
            cell: ({ row }) => (
                <div className="flex flex-col items-start gap-1">
                    <Badge
                        variant="outline"
                        className={
                            row.original.status_arsip === 'arsip'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                                : ''
                        }
                    >
                        {row.original.status_arsip === 'arsip' ? 'Arsip' : 'Aktif'}
                    </Badge>
                    {row.original.lokasi_arsip && (
                        <span className="text-[11px] text-muted-foreground">{row.original.lokasi_arsip}</span>
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex justify-end gap-1">
                    <Link href={`/${row.original.jenis === 'masuk' ? 'surat-masuk' : 'surat-keluar'}/${row.original.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            Detail
                        </Button>
                    </Link>
                    {can('kelola-arsip') && (
                        <Dialog
                            open={archiveSurat?.id === row.original.id}
                            onOpenChange={(open) => {
                                if (!open) {
                                    setArchiveSurat(null)
                                    setLokasiArsip('')
                                }
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1 text-xs"
                                    onClick={() => {
                                        setArchiveSurat(row.original)
                                        setLokasiArsip(row.original.lokasi_arsip ?? '')
                                    }}
                                >
                                    {row.original.status_arsip === 'arsip' ? (
                                        <>
                                            <ArchiveRestore className="h-3.5 w-3.5" />
                                            Aktifkan
                                        </>
                                    ) : (
                                        <>
                                            <Archive className="h-3.5 w-3.5" />
                                            Arsipkan
                                        </>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>
                                        {row.original.status_arsip === 'arsip'
                                            ? 'Kembalikan Surat'
                                            : 'Arsipkan Surat'}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {row.original.perihal} ({row.original.no_surat || '-'})
                                    </DialogDescription>
                                </DialogHeader>
                                {row.original.status_arsip !== 'arsip' && (
                                    <div className="space-y-2">
                                        <Label>Lokasi Arsip</Label>
                                        <Input
                                            placeholder="Contoh: Rak A - Box 2"
                                            value={lokasiArsip}
                                            onChange={(e) => setLokasiArsip(e.target.value)}
                                        />
                                    </div>
                                )}
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setArchiveSurat(null)}>
                                        Batal
                                    </Button>
                                    <Button onClick={submitArsip}>
                                        {row.original.status_arsip === 'arsip' ? 'Aktifkan' : 'Arsipkan'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            ),
        },
    ]

    return (
        <>
            <Head title="Arsip Surat" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Arsip Surat"
                        description="Penelusuran seluruh surat masuk & keluar. "
                    />
                    {can('export-arsip') && (
                        <Button variant="outline" className="gap-2" onClick={doExport}>
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="rounded-xl border bg-card p-4 shadow-soft">
                    <div className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari perihal, nomor, asal/tujuan..."
                                className="pl-9"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-1 sm:flex-nowrap">
                        <Select value={jenis} onValueChange={setJenis}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua Jenis</SelectItem>
                                <SelectItem value="masuk">Masuk</SelectItem>
                                <SelectItem value="keluar">Keluar</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={tahun} onValueChange={setTahun}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua Tahun</SelectItem>
                                {tahunList.map((t) => (
                                    <SelectItem key={t} value={String(t)}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sifat} onValueChange={setSifat}>
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="Sifat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua Sifat</SelectItem>
                                <SelectItem value="biasa">Biasa</SelectItem>
                                <SelectItem value="penting">Penting</SelectItem>
                                <SelectItem value="segera">Segera</SelectItem>
                                <SelectItem value="sangat-segera">Sangat Segera</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusArsip} onValueChange={setStatusArsip}>
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua Status</SelectItem>
                                <SelectItem value="aktif">Aktif</SelectItem>
                                <SelectItem value="arsip">Arsip</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={klasifikasi} onValueChange={setKlasifikasi}>
                            <SelectTrigger className="w-64">
                                <SelectValue placeholder="Klasifikasi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="semua">Semua Klasifikasi</SelectItem>
                                {klasifikasis.map((k) => (
                                    <SelectItem key={k.id} value={String(k.id)}>
                                        {k.kode} — {k.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-1 text-xs"
                                onClick={clearFilters}
                            >
                                <FilterX className="h-3.5 w-3.5" />
                                Reset
                            </Button>
                        )}
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Menampilkan <b>{filtered.length}</b> dari <b>{surats.length}</b> surat
                    </p>
                </div>

                <DataTable columns={columns} data={filtered} />
            </div>
        </>
    )
}

ArsipPage.layout = {
    breadcrumbs: [
        { title: 'Arsip & Cetak', href: '/arsip' },
        { title: 'Arsip Surat', href: '/arsip' },
    ],
}
