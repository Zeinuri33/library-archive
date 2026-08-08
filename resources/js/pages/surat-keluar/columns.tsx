'use client'

import { Link, router } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Paperclip } from 'lucide-react'
import { toast } from 'sonner'
import { DataTableSortHeader } from '@/components/data-table-sort-header'
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
import { formatTanggal, SIFAT_BADGE } from '@/lib/surat'
import type { Surat } from '@/types/surat'

const handleDelete = (surat: Surat) => {
    router.delete(`/surat-keluar/${surat.id}`, {
        onSuccess: (page) => {
            const flash = page.props.flash as any
            toast(flash?.error || flash?.success || 'Surat berhasil dihapus')
        },
        onError: () => toast('Gagal menghapus surat'),
    })
}

export const columns = (onEdit: (surat: Surat) => void): ColumnDef<Surat>[] => [
    {
        accessorKey: 'no_agenda',
        header: ({ column }) => (
            <DataTableSortHeader column={column}>Agenda</DataTableSortHeader>
        ),
        cell: ({ row }) => (
            <span className="ml-3 font-mono text-xs font-medium">
                {row.getValue('no_agenda') || '-'}
            </span>
        ),
    },
    {
        accessorKey: 'no_surat',
        header: ({ column }) => (
            <DataTableSortHeader column={column}>No. Surat</DataTableSortHeader>
        ),
        cell: ({ row }) => (
            <span className="font-mono text-xs font-semibold">
                {row.getValue('no_surat') || '-'}
            </span>
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
        cell: ({ row }) => (
            <div className="text-sm">
                {formatTanggal(row.getValue('tanggal_surat'))}
                {row.original.tanggal_kirim && (
                    <p className="text-xs text-muted-foreground">
                        Kirim: {formatTanggal(row.original.tanggal_kirim)}
                    </p>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'tujuan_surat',
        header: 'Tujuan',
        cell: ({ row }) => (
            <div className="max-w-[220px]">
                <p className="truncate text-sm font-medium">{row.getValue('tujuan_surat') || '-'}</p>
                {row.original.penerima && (
                    <p className="truncate text-xs text-muted-foreground">{row.original.penerima}</p>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'perihal',
        header: 'Perihal',
        cell: ({ row }) => (
            <div className="max-w-[240px]">
                <p className="truncate text-sm">{row.getValue('perihal')}</p>
                {row.original.template_nomor && (
                    <Badge variant="outline" className="mt-1 text-[10px]">
                        {row.original.template_nomor.nama}
                    </Badge>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'sifat',
        header: ({ column }) => (
            <DataTableSortHeader column={column} className="justify-center">
                Sifat
            </DataTableSortHeader>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Badge variant="outline" className={SIFAT_BADGE[row.original.sifat] || ''}>
                    {row.original.sifat}
                </Badge>
            </div>
        ),
    },
    {
        id: 'lampiran',
        header: () => <div className="text-center">Lamp.</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                {(row.original.lampirans?.length ?? 0) > 0 ? (
                    <Badge variant="secondary" className="gap-1">
                        <Paperclip className="h-3 w-3" />
                        {row.original.lampirans!.length}
                    </Badge>
                ) : (
                    <span className="text-xs text-muted-foreground">-</span>
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
                            <Link href={`/surat-keluar/${row.original.id}`}>Detail</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(row.original)}>
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
                                    <AlertDialogTitle>Hapus Surat Keluar</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Yakin ingin menghapus surat{' '}
                                        <b>{row.original.perihal}</b>? Lampiran ikut terhapus.
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
