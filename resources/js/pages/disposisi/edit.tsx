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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import type { User } from '@/types'
import type { Disposisi } from '@/types/surat'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    disposisi: Disposisi
    users: User[]
}

export default function EditDisposisiModal({ open, setOpen, disposisi, users }: Props) {
    const { data, setData, put, processing } = useForm({
        user_id: disposisi.user_id ? String(disposisi.user_id) : '',
        tujuan: disposisi.tujuan ?? '',
        instruksi: disposisi.instruksi ?? '',
        catatan: disposisi.catatan ?? '',
        batas_waktu: disposisi.batas_waktu ?? '',
        status: disposisi.status,
    })

    useEffect(() => {
        if (open) {
            setData({
                user_id: disposisi.user_id ? String(disposisi.user_id) : '',
                tujuan: disposisi.tujuan ?? '',
                instruksi: disposisi.instruksi ?? '',
                catatan: disposisi.catatan ?? '',
                batas_waktu: disposisi.batas_waktu ?? '',
                status: disposisi.status,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, disposisi])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/disposisi/${disposisi.id}`, {
            onSuccess: () => {
                setOpen(false)
                toast('Disposisi berhasil diperbarui')
            },
            onError: () => toast('Gagal menyimpan disposisi.'),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Edit Disposisi"
                        description={disposisi.surat?.perihal || ''}
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
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
                                value={data.tujuan}
                                onChange={(e) => setData('tujuan', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Instruksi</Label>
                        <Textarea
                            rows={2}
                            value={data.instruksi}
                            onChange={(e) => setData('instruksi', e.target.value)}
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

                    <div className="space-y-2">
                        <Label>Catatan</Label>
                        <Textarea
                            rows={2}
                            value={data.catatan}
                            onChange={(e) => setData('catatan', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={data.status} onValueChange={(v) => setData('status', v as Disposisi['status'])}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="belum">Belum Diproses</SelectItem>
                                <SelectItem value="proses">Sedang Diproses</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" disabled={processing} className="w-full">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
