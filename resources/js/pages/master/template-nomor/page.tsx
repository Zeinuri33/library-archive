'use client'

import { Head, router, usePage } from '@inertiajs/react'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Wand2 } from 'lucide-react'
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
import type { TemplateNomor } from '@/types/surat'
import CreateTemplateNomorModal from './create'
import EditTemplateNomorModal from './edit'

interface Props {
    templates: TemplateNomor[]
    placeholders: Record<string, string>
}

const RESET_LABEL: Record<string, string> = {
    tahun: 'Per Tahun',
    bulan: 'Per Bulan',
    kontinu: 'Kontinu',
}

export default function TemplateNomorPage({ templates, placeholders }: Props) {
    const [openEdit, setOpenEdit] = useState(false)
    const [selected, setSelected] = useState<TemplateNomor | null>(null)

    const { auth } = usePage().props as any
    const can = (perm: string) => auth?.permissions?.includes(perm) ?? false

    const handleDelete = (item: TemplateNomor) => {
        router.delete(`/template-nomor/${item.id}`, {
            onSuccess: (page) => {
                const flash = page.props.flash as any
                toast(flash?.success || flash?.error || 'Template dihapus')
            },
            onError: () => toast('Gagal menghapus template'),
        })
    }

    const columns: ColumnDef<TemplateNomor>[] = [
        {
            accessorKey: 'nama',
            header: 'Nama Template',
            cell: ({ row }) => (
                <div className="ml-3">
                    <p className="flex items-center gap-2 text-sm font-medium">
                        {row.getValue('nama')}
                        {row.original.is_aktif ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
                                Aktif
                            </Badge>
                        ) : (
                            <Badge variant="outline">Nonaktif</Badge>
                        )}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{row.original.kode}</p>
                </div>
            ),
        },
        {
            accessorKey: 'format',
            header: () => (
                <span className="flex items-center gap-1.5">
                    <Wand2 className="h-3.5 w-3.5" />
                    Format
                </span>
            ),
            cell: ({ row }) => (
                <span className="inline-block rounded-md bg-primary/5 px-2 py-1 font-mono text-xs font-semibold text-primary">
                    {row.getValue('format')}
                </span>
            ),
        },
        {
            accessorKey: 'digit_nomor',
            header: () => <div className="text-center">Digit</div>,
            cell: ({ row }) => (
                <div className="text-center font-mono text-sm">{row.getValue('digit_nomor')}</div>
            ),
        },
        {
            accessorKey: 'reset_periode',
            header: 'Reset',
            cell: ({ row }) => (
                <Badge variant="secondary">
                    {RESET_LABEL[row.original.reset_periode] || row.original.reset_periode}
                </Badge>
            ),
        },
        {
            accessorKey: 'surats_count',
            header: () => <div className="text-center">Dipakai</div>,
            cell: ({ row }) => (
                <div className="text-center">
                    <Badge variant="outline">{row.getValue('surats_count') || 0}</Badge>
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
                            {can('edit-template-nomor') && (
                                <DropdownMenuItem onClick={() => {
 setSelected(row.original); setOpenEdit(true) 
}}>
                                    Edit
                                </DropdownMenuItem>
                            )}
                            {can('hapus-template-nomor') && (
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
                                            <AlertDialogTitle>Hapus Template</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Yakin ingin menghapus template{' '}
                                                <b>{row.original.nama}</b>?
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
            <Head title="Template Nomor Surat" />

            <div className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Template Nomor Surat"
                        description="No. Surat Builder — susun format penomoran sesuai kebutuhan instansi."
                    />
                    {can('tambah-template-nomor') && (
                        <CreateTemplateNomorModal placeholders={placeholders} />
                    )}
                </div>

                {/* Placeholder info banner */}
                <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-4 text-sm shadow-soft">
                    <Wand2 className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-medium">Placeholder yang didukung:</span>
                    {Object.entries(placeholders).map(([ph, desc]) => (
                        <span key={ph} title={desc} className="cursor-help rounded-md bg-muted px-2 py-0.5 font-mono text-[11px]">
                            {ph}
                        </span>
                    ))}
                </div>

                <DataTable columns={columns} data={templates} />

                {selected && (
                    <EditTemplateNomorModal
                        open={openEdit}
                        setOpen={setOpenEdit}
                        item={selected}
                        placeholders={placeholders}
                    />
                )}
            </div>
        </>
    )
}

TemplateNomorPage.layout = {
    breadcrumbs: [
        { title: 'Master Data', href: '/template-nomor' },
        { title: 'Template Nomor', href: '/template-nomor' },
    ],
}
