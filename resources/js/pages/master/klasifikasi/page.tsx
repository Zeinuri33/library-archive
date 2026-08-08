'use client'

import { Head, router, usePage } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DataTable } from '@/components/data-table'
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
import type { Klasifikasi } from '@/types/surat'
import CreateKlasifikasiModal from './create'
import EditKlasifikasiModal from './edit'

interface Props {
    klasifikasis: Klasifikasi[]
}

export default function KlasifikasiPage({ klasifikasis }: Props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState<Klasifikasi | null>(null)

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const handleDelete = (item: Klasifikasi) => {
        router.delete(`/klasifikasi/${item.id}`, {
            onSuccess: (page) => {
                const flash = page.props.flash as any
                toast(flash?.success || flash?.error || 'Klasifikasi dihapus')
            },
            onError: () => toast('Gagal menghapus klasifikasi'),
        })
    }

    const columns: ColumnDef<Klasifikasi>[] = [
        {
            accessorKey: 'kode',
            header: 'Kode',
            cell: ({ row }) => (
                <span className="ml-3 inline-block rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold">
                    {row.getValue('kode')}
                </span>
            ),
        },
        {
            accessorKey: 'nama',
            header: 'Nama',
            cell: ({ row }) => <span className="text-sm font-medium">{row.getValue('nama')}</span>,
        },
        {
            accessorKey: 'keterangan',
            header: 'Keterangan',
            cell: ({ row }) => (
                <span className="max-w-[400px] truncate text-sm text-muted-foreground">
                    {row.getValue('keterangan') || '-'}
                </span>
            ),
        },
        {
            accessorKey: 'surats_count',
            header: () => <div className="text-center">Surat</div>,
            cell: ({ row }) => (
                <div className="text-center">
                    <Badge variant="secondary">{row.getValue('surats_count') || 0}</Badge>
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
                            {can('edit-klasifikasi') && (
                                <DropdownMenuItem onClick={() => {
 setSelected(row.original); setOpenEdit(true) 
}}>
                                    Edit
                                </DropdownMenuItem>
                            )}
                            {can('hapus-klasifikasi') && (
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
                                            <AlertDialogTitle>Hapus Klasifikasi</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Yakin ingin menghapus{' '}
                                                <b>{row.original.kode} — {row.original.nama}</b>?
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
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
        },
    ]

    return (
        <>
            <Head title="Klasifikasi Surat" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Klasifikasi Surat"
                        description="Kode klasifikasi arsip yang dipakai pada nomor surat."
                    />
                    {can('tambah-klasifikasi') && <CreateKlasifikasiModal />}
                </div>

                <DataTable columns={columns} data={klasifikasis} />

                {selected && (
                    <EditKlasifikasiModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        item={selected}
                    />
                )}
            </div>
        </>
    )
}

KlasifikasiPage.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '/klasifikasi' },
        { title: 'Klasifikasi Surat', href: '/klasifikasi' },
    ],
}
