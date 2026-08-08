'use client'

import { Head, router, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Printer } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { DataTable } from '@/components/data-table'
import { DataTableSortHeader } from '@/components/data-table-sort-header'
import Heading from '@/components/heading'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { formatTanggal, STATUS_DISPOSISI } from '@/lib/surat'
import type { User } from '@/types'
import type { Disposisi, Surat } from '@/types/surat'
import CreateDisposisiModal from './create'
import EditDisposisiModal from './edit'

interface Props {
    disposisis: Disposisi[]
    users: User[]
    surats: Surat[]
}

type StatusFilter = 'semua' | 'belum' | 'proses' | 'selesai'

export default function DisposisiPage({ disposisis, users, surats }: Props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState<Disposisi | null>(null)
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('semua')

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const handleEdit = (disposisi: Disposisi) => {
        setSelected(disposisi)
        setOpenEdit(true)
    }

    const changeStatus = (disposisi: Disposisi, status: string) => {
        router.patch(`/disposisi/${disposisi.id}/status`, { status }, {
            onSuccess: () => toast('Status disposisi diperbarui'),
            onError: () => toast('Gagal memperbarui status'),
        })
    }

    const handleDelete = (disposisi: Disposisi) => {
        router.delete(`/disposisi/${disposisi.id}`, {
            onSuccess: () => toast('Disposisi berhasil dihapus'),
            onError: () => toast('Gagal menghapus disposisi'),
        })
    }

    const filtered = useMemo(
        () => (statusFilter === 'semua' ? disposisis : disposisis.filter((d) => d.status === statusFilter)),
        [disposisis, statusFilter],
    )

    const counts = useMemo(() => {
        const count = (s: StatusFilter) => (s === 'semua' ? disposisis.length : disposisis.filter((d) => d.status === s).length)

        return { semua: count('semua'), belum: count('belum'), proses: count('proses'), selesai: count('selesai') }
    }, [disposisis])

    const columns: ColumnDef<Disposisi>[] = [
        {
            accessorKey: 'surat.no_surat',
            header: 'Surat',
            cell: ({ row }) => {
                const s = row.original.surat

                return (
                    <div className="ml-3 max-w-[260px]">
                        <p className="truncate text-sm font-medium">{s?.perihal || '-'}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                            {s?.no_surat || s?.no_agenda || '-'} · {s ? formatTanggal(s.tanggal_surat) : '-'}
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'tujuan',
            header: ({ column }) => (
                <DataTableSortHeader column={column}>Tujuan</DataTableSortHeader>
            ),
            cell: ({ row }) => (
                <div className="max-w-[180px]">
                    <p className="truncate text-sm font-medium">
                        {row.original.user?.name || row.original.tujuan || '-'}
                    </p>
                    {row.original.tujuan && row.original.user && (
                        <p className="truncate text-xs text-muted-foreground">{row.original.tujuan}</p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'instruksi',
            header: 'Instruksi',
            cell: ({ row }) => (
                <p className="max-w-[220px] truncate text-sm text-muted-foreground">
                    {row.getValue('instruksi') || '-'}
                </p>
            ),
        },
        {
            accessorKey: 'batas_waktu',
            header: 'Batas Waktu',
            cell: ({ row }) => (
                <span className="text-sm">{formatTanggal(row.getValue('batas_waktu'))}</span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={STATUS_DISPOSISI[row.original.status]?.badge || ''}>
                        {STATUS_DISPOSISI[row.original.status]?.label || row.original.status}
                    </Badge>
                    {can('edit-disposisi') && (
                        <Select
                            value={row.original.status}
                            onValueChange={(v) => changeStatus(row.original, v)}
                        >
                            <SelectTrigger size="sm" className="h-7 w-7 p-0 border-0 bg-transparent shadow-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="belum">Belum</SelectItem>
                                <SelectItem value="proses">Proses</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Opsi</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link href={`/cetak/disposisi/${row.original.id}`}>
                                    <Printer className="mr-2 h-4 w-4" />
                                    Cetak Lembar Disposisi
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                                Edit
                            </DropdownMenuItem>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="text-red-500"
                                    >
                                        Hapus
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>

                                <AlertDialogContent size="sm">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Hapus Disposisi</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Yakin ingin menghapus disposisi untuk surat{' '}
                                            <b>{row.original.surat?.perihal || '-'}</b>?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(row.original)}>
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ]

    const tabs: { key: StatusFilter; label: string; count: number }[] = [
        { key: 'semua', label: 'Semua', count: counts.semua },
        { key: 'belum', label: 'Belum', count: counts.belum },
        { key: 'proses', label: 'Proses', count: counts.proses },
        { key: 'selesai', label: 'Selesai', count: counts.selesai },
    ]

    return (
        <>
            <Head title="Disposisi" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Disposisi Surat"
                        description="Teruskan surat ke unit/personel tujuan beserta instruksi."
                    />
                    {can('tambah-disposisi') && (
                        <CreateDisposisiModal surats={surats} users={users} />
                    )}
                </div>

                {/* Status tabs */}
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                                statusFilter === tab.key
                                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-card hover:bg-muted'
                            }`}
                        >
                            {tab.label}
                            <span
                                className={`rounded-full px-1.5 text-xs ${
                                    statusFilter === tab.key ? 'bg-white/20' : 'bg-muted'
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <DataTable columns={columns} data={filtered} />

                {selected && (
                    <EditDisposisiModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        disposisi={selected}
                        users={users}
                    />
                )}
            </div>
        </>
    )
}

DisposisiPage.layout = {
    breadcrumbs: [
        { title: 'Persuratan', href: '/disposisi' },
        { title: 'Disposisi', href: '/disposisi' },
    ],
}
