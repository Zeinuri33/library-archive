'use client'

import { useForm } from '@inertiajs/react'
import { Plus, X } from 'lucide-react'
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
import { SIFAT_OPTIONS } from '@/lib/surat'
import type { Klasifikasi, Unit } from '@/types/surat'

interface Props {
    klasifikasis: Klasifikasi[]
    units: Unit[]
}

export default function CreateSuratMasukModal({ klasifikasis, units }: Props) {
    const [open, setOpen] = useState(false)
    const [fileNames, setFileNames] = useState<string[]>([])

    const { data, setData, post, processing, errors, reset } = useForm({
        no_surat: '',
        asal_surat: '',
        pengirim: '',
        tanggal_surat: '',
        tanggal_terima: '',
        sifat: 'biasa',
        klasifikasi_surat_id: '',
        unit_pengolah_id: '',
        perihal: '',
        ringkasan: '',
        files: [] as File[],
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/surat-masuk', {
            onSuccess: () => {
                setOpen(false)
                reset()
                setFileNames([])
                toast('Surat masuk berhasil dicatat')
            },
            onError: () => toast('Gagal menyimpan. Periksa kembali isian.'),
        })
    }

    const handleFiles = (files: FileList | null) => {
        if (!files) {
return
}

        const list = Array.from(files)
        setData('files', list)
        setFileNames(list.map((f) => f.name))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Catat Surat Masuk
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[92vh] overflow-y-auto">
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Catat Surat Masuk"
                        description="Pencatatan surat yang diterima perpustakaan."
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    {/* Nomor & Asal */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>No. Surat (dari pengirim)</Label>
                            <Input
                                placeholder="Contoh: 001/UN-IBS/2026"
                                value={data.no_surat}
                                onChange={(e) => setData('no_surat', e.target.value)}
                            />
                            {errors.no_surat && <p className="text-xs text-red-500">{errors.no_surat}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Asal Surat</Label>
                            <Input
                                placeholder="Instansi / pengirim surat"
                                value={data.asal_surat}
                                onChange={(e) => setData('asal_surat', e.target.value)}
                            />
                            {errors.asal_surat && <p className="text-xs text-red-500">{errors.asal_surat}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Pengirim</Label>
                        <Input
                            placeholder="Nama pengirim (opsional)"
                            value={data.pengirim}
                            onChange={(e) => setData('pengirim', e.target.value)}
                        />
                        {errors.pengirim && <p className="text-xs text-red-500">{errors.pengirim}</p>}
                    </div>

                    {/* Tanggal & Sifat */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Tanggal Surat</Label>
                            <Input
                                type="date"
                                value={data.tanggal_surat}
                                onChange={(e) => setData('tanggal_surat', e.target.value)}
                            />
                            {errors.tanggal_surat && <p className="text-xs text-red-500">{errors.tanggal_surat}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Terima</Label>
                            <Input
                                type="date"
                                value={data.tanggal_terima}
                                onChange={(e) => setData('tanggal_terima', e.target.value)}
                            />
                            {errors.tanggal_terima && <p className="text-xs text-red-500">{errors.tanggal_terima}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Sifat</Label>
                            <Select value={data.sifat} onValueChange={(v) => setData('sifat', v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {SIFAT_OPTIONS.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Klasifikasi & Unit */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Klasifikasi Surat</Label>
                            <Select
                                value={data.klasifikasi_surat_id}
                                onValueChange={(v) => setData('klasifikasi_surat_id', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih klasifikasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {klasifikasis.map((k) => (
                                        <SelectItem key={k.id} value={String(k.id)}>
                                            {k.kode} — {k.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Unit Pengolah</Label>
                            <Select
                                value={data.unit_pengolah_id}
                                onValueChange={(v) => setData('unit_pengolah_id', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.map((u) => (
                                        <SelectItem key={u.id} value={String(u.id)}>
                                            {u.kode} — {u.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Perihal */}
                    <div className="space-y-2">
                        <Label>Perihal *</Label>
                        <Input
                            placeholder="Perihal surat"
                            value={data.perihal}
                            onChange={(e) => setData('perihal', e.target.value)}
                        />
                        {errors.perihal && <p className="text-xs text-red-500">{errors.perihal}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Ringkasan / Isi</Label>
                        <Textarea
                            rows={3}
                            placeholder="Ringkasan isi surat (opsional)"
                            value={data.ringkasan}
                            onChange={(e) => setData('ringkasan', e.target.value)}
                        />
                        {errors.ringkasan && <p className="text-xs text-red-500">{errors.ringkasan}</p>}
                    </div>

                    {/* Lampiran */}
                    <div className="space-y-2">
                        <Label>Lampiran (scan/dokumen)</Label>
                        <div className="flex items-center gap-3 rounded-lg border border-dashed p-4">
                            <div className="flex-1">
                                {fileNames.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {fileNames.map((name, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                                            >
                                                {name}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const next = fileNames.filter((_, idx) => idx !== i)
                                                        setFileNames(next)
                                                        setData('files', data.files.filter((_, idx) => idx !== i))
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-sm text-muted-foreground">
                                        Pilih file PDF/gambar/dokumen (maks. 10 file)
                                    </span>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                <span className="rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted">
                                    Pilih File
                                </span>
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleFiles(e.target.files)}
                                />
                            </label>
                        </div>
                        {errors.files && <p className="text-xs text-red-500">{errors.files}</p>}
                    </div>

                    <div className="pt-2">
                        <Button type="submit" disabled={processing} className="w-full">
                            Simpan Surat Masuk
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
