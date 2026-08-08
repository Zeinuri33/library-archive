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
import type { Unit } from '@/types/surat'
import CreateUnitModal from './create'
import EditUnitModal from './edit'

interface Props {
    units: Unit[]
}

export default function UnitPage({ units }: Props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState<Unit | null>(null)

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const handleDelete = (item: Unit) => {
        router.delete(`/unit-pengolah/${item.id}`, {
            onSuccess: (page) => {
                const flash = page.props.flash as any
                toast(flash?.success || flash?.error || 'Unit dihapus')
            },
            onError: () => toast('Gagal menghapus unit'),
        })
    }

    const columns: ColumnDef<Unit>[] = [
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
                            {can('edit-unit') && (
                                <DropdownMenuItem onClick={() => {
 setSelected(row.original); setOpenEdit(true) 
}}>
                                    Edit
                                </DropdownMenuItem>
                            )}
                            {can('hapus-unit') && (
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
                                            <AlertDialogTitle>Hapus Unit Pengolah</AlertDialogTitle>
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
            <Head title="Unit Pengolah" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Unit Pengolah"
                        description="Unit pengolah surat yang dipakai pada nomor surat."
                    />
                    {can('tambah-unit') && <CreateUnitModal />}
                </div>

                <DataTable columns={columns} data={units} />

                {selected && (
                    <EditUnitModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        item={selected}
                    />
                )}
            </div>
        </>
    )
}

UnitPage.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '/unit-pengolah' },
        { title: 'Unit Pengolah', href: '/unit-pengolah' },
    ],
}
