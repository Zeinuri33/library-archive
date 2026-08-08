'use client'

import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type { Klasifikasi } from '@/types/surat'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    item: Klasifikasi
}

export default function EditKlasifikasiModal({ open, setOpen, item }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        kode: item.kode,
        nama: item.nama,
        keterangan: item.keterangan ?? '',
    })

    useEffect(() => {
        if (open) {
            setData({ kode: item.kode, nama: item.nama, keterangan: item.keterangan ?? '' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, item])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/klasifikasi/${item.id}`, {
            onSuccess: () => {
                setOpen(false)
                toast('Klasifikasi berhasil diperbarui')
            },
            onError: () => toast('Gagal menyimpan.'),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Edit Klasifikasi Surat"
                        description={item.kode}
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Kode *</Label>
                        <Input
                            value={data.kode}
                            onChange={(e) => setData('kode', e.target.value)}
                        />
                        {errors.kode && <p className="text-xs text-red-500">{errors.kode}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Nama *</Label>
                        <Input
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        {errors.nama && <p className="text-xs text-red-500">{errors.nama}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Keterangan</Label>
                        <Textarea
                            rows={3}
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        Simpan Perubahan
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
