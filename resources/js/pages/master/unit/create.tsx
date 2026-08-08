'use client'

import { useForm } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

export default function CreateUnitModal() {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        kode: '',
        nama: '',
        keterangan: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/unit-pengolah', {
            onSuccess: () => {
                setOpen(false)
                reset()
                toast('Unit pengolah berhasil ditambahkan')
            },
            onError: () => toast('Gagal menyimpan. Periksa kembali isian.'),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Unit
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Tambah Unit Pengolah"
                        description="Unit pengolah surat, contoh: PUS — Perpustakaan."
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Kode *</Label>
                        <Input
                            placeholder="Contoh: PUS"
                            value={data.kode}
                            onChange={(e) => setData('kode', e.target.value)}
                        />
                        {errors.kode && <p className="text-xs text-red-500">{errors.kode}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Nama *</Label>
                        <Input
                            placeholder="Contoh: Perpustakaan"
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
                        Simpan
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
