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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { formatTanggal } from '@/lib/surat'
import type { User } from '@/types'
import type { Surat } from '@/types/surat'

interface Props {
    surats: Surat[]
    users: User[]
}

export default function CreateDisposisiModal({ surats, users }: Props) {
    const [open, setOpen] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        surat_id: '',
        user_id: '',
        tujuan: '',
        instruksi: '',
        catatan: '',
        batas_waktu: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/disposisi', {
            onSuccess: () => {
                setOpen(false)
                reset()
                toast('Disposisi berhasil dibuat')
            },
            onError: () => toast('Gagal menyimpan disposisi.'),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Disposisi
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[92vh] overflow-y-auto">
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Buat Disposisi"
                        description="Teruskan surat ke unit/personel tujuan."
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Surat *</Label>
                        <Select value={data.surat_id} onValueChange={(v) => setData('surat_id', v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih surat yang akan didisposisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {surats.map((s) => (
                                    <SelectItem key={s.id} value={String(s.id)}>
                                        [{s.jenis === 'masuk' ? 'Masuk' : 'Keluar'}] {s.no_surat || s.no_agenda || '-'} — {s.perihal} ({formatTanggal(s.tanggal_surat)})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.surat_id && <p className="text-xs text-red-500">{errors.surat_id}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Tujuan (User)</Label>
                            <Select
                                value={data.user_id}
                                onValueChange={(v) => setData('user_id', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih pengguna" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((u) => (
                                        <SelectItem key={u.id} value={String(u.id)}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tujuan (Bebas)</Label>
                            <Input
                                placeholder="Contoh: Kepala Perpustakaan"
                                value={data.tujuan}
                                onChange={(e) => setData('tujuan', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Instruksi</Label>
                        <Textarea
                            rows={2}
                            placeholder="Contoh: Mohon ditindaklanjuti"
                            value={data.instruksi}
                            onChange={(e) => setData('instruksi', e.target.value)}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Catatan</Label>
                            <Textarea
                                rows={2}
                                placeholder="Catatan tambahan (opsional)"
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Batas Waktu</Label>
                            <Input
                                type="date"
                                value={data.batas_waktu}
                                onChange={(e) => setData('batas_waktu', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" disabled={processing} className="w-full">
                            Simpan Disposisi
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
