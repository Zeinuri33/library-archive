'use client'

import { useForm } from '@inertiajs/react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Heading from '@/components/heading'
import { Badge } from '@/components/ui/badge'
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
import { SIFAT_OPTIONS, formatUkuran } from '@/lib/surat'
import type { Klasifikasi, Lampiran, Surat, Unit } from '@/types/surat'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    surat: Surat
    klasifikasis: Klasifikasi[]
    units: Unit[]
}

export default function EditSuratMasukModal({ open, setOpen, surat, klasifikasis, units }: Props) {
    const [fileNames, setFileNames] = useState<string[]>([])
    const [removeIds, setRemoveIds] = useState<number[]>([])

    const { data, setData, put, processing, errors } = useForm({
        no_surat: surat.no_surat ?? '',
        asal_surat: surat.asal_surat ?? '',
        pengirim: surat.pengirim ?? '',
        tanggal_surat: surat.tanggal_surat ?? '',
        tanggal_terima: surat.tanggal_terima ?? '',
        sifat: surat.sifat,
        klasifikasi_surat_id: surat.klasifikasi_surat_id ? String(surat.klasifikasi_surat_id) : '',
        unit_pengolah_id: surat.unit_pengolah_id ? String(surat.unit_pengolah_id) : '',
        perihal: surat.perihal,
        ringkasan: surat.ringkasan ?? '',
        remove_lampiran_ids: [] as number[],
        files: [] as File[],
    })

    useEffect(() => {
        if (open) {
            setData({
                no_surat: surat.no_surat ?? '',
                asal_surat: surat.asal_surat ?? '',
                pengirim: surat.pengirim ?? '',
                tanggal_surat: surat.tanggal_surat ?? '',
                tanggal_terima: surat.tanggal_terima ?? '',
                sifat: surat.sifat,
                klasifikasi_surat_id: surat.klasifikasi_surat_id ? String(surat.klasifikasi_surat_id) : '',
                unit_pengolah_id: surat.unit_pengolah_id ? String(surat.unit_pengolah_id) : '',
                perihal: surat.perihal,
                ringkasan: surat.ringkasan ?? '',
                remove_lampiran_ids: [],
                files: [],
            })
            setRemoveIds([])
            setFileNames([])
        }
    }, [open, surat])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/surat-masuk/${surat.id}`, {
            onSuccess: () => {
                setOpen(false)
                toast('Data surat masuk berhasil diperbarui')
            },
            onError: () => toast('Gagal menyimpan. Periksa kembali isian.'),
        })
    }

    const toggleRemove = (lampiran: Lampiran) => {
        setRemoveIds((prev) => {
            const next = prev.includes(lampiran.id)
                ? prev.filter((id) => id !== lampiran.id)
                : [...prev, lampiran.id]
            setData('remove_lampiran_ids', next)

            return next
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
            <DialogContent>
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Edit Surat Masuk"
                        description={surat.perihal}
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>No. Surat (dari pengirim)</Label>
                            <Input
                                value={data.no_surat}
                                onChange={(e) => setData('no_surat', e.target.value)}
                            />
                            {errors.no_surat && <p className="text-xs text-red-500">{errors.no_surat}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Asal Surat</Label>
                            <Input
                                value={data.asal_surat}
                                onChange={(e) => setData('asal_surat', e.target.value)}
                            />
                            {errors.asal_surat && <p className="text-xs text-red-500">{errors.asal_surat}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Pengirim</Label>
                        <Input
                            value={data.pengirim}
                            onChange={(e) => setData('pengirim', e.target.value)}
                        />
                    </div>

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

                    <div className="space-y-2">
                        <Label>Perihal *</Label>
                        <Input
                            value={data.perihal}
                            onChange={(e) => setData('perihal', e.target.value)}
                        />
                        {errors.perihal && <p className="text-xs text-red-500">{errors.perihal}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Ringkasan / Isi</Label>
                        <Textarea
                            rows={3}
                            value={data.ringkasan}
                            onChange={(e) => setData('ringkasan', e.target.value)}
                        />
                    </div>

                    {/* Lampiran existing */}
                    {(surat.lampirans?.length ?? 0) > 0 && (
                        <div className="space-y-2">
                            <Label>Lampiran Saat Ini</Label>
                            <div className="space-y-1.5">
                                {surat.lampirans!.map((lampiran) => {
                                    const willRemove = removeIds.includes(lampiran.id)

                                    return (
                                        <div
                                            key={lampiran.id}
                                            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${willRemove ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''}`}
                                        >
                                            <div className="flex min-w-0 items-center gap-2">
                                                <span className="truncate">{lampiran.nama_asli}</span>
                                                <span className="shrink-0 text-xs text-muted-foreground">
                                                    {formatUkuran(lampiran.ukuran)}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleRemove(lampiran)}
                                                className="shrink-0 text-xs text-red-500 hover:underline"
                                            >
                                                {willRemove ? 'Batalkan' : 'Hapus'}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Lampiran baru */}
                    <div className="space-y-2">
                        <Label>Tambah Lampiran</Label>
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
                                                        setFileNames((prev) => prev.filter((_, idx) => idx !== i))
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
                                        Tambah file PDF/gambar/dokumen
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
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Badge variant="outline" className="font-mono">
                            Agenda: {surat.no_agenda || '-'}
                        </Badge>
                        <Button type="submit" disabled={processing}>
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
