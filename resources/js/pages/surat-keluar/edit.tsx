'use client'

import { useForm } from '@inertiajs/react'
import axios from 'axios'
import { Loader2, Wand2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
import type { Klasifikasi, Lampiran, Surat, TemplateNomor, Unit } from '@/types/surat'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    surat: Surat
    klasifikasis: Klasifikasi[]
    units: Unit[]
    templates: TemplateNomor[]
}

export default function EditSuratKeluarModal({ open, setOpen, surat, klasifikasis, units, templates }: Props) {
    const [fileNames, setFileNames] = useState<string[]>([])
    const [removeIds, setRemoveIds] = useState<number[]>([])
    const [preview, setPreview] = useState<string | null>(null)
    const [previewLoading, setPreviewLoading] = useState(false)
    const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const { data, setData, put, processing, errors } = useForm({
        template_nomor_id: surat.template_nomor_id ? String(surat.template_nomor_id) : '',
        no_surat: surat.no_surat ?? '',
        tujuan_surat: surat.tujuan_surat ?? '',
        penerima: surat.penerima ?? '',
        tanggal_surat: surat.tanggal_surat ?? '',
        tanggal_kirim: surat.tanggal_kirim ?? '',
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
                template_nomor_id: surat.template_nomor_id ? String(surat.template_nomor_id) : '',
                no_surat: surat.no_surat ?? '',
                tujuan_surat: surat.tujuan_surat ?? '',
                penerima: surat.penerima ?? '',
                tanggal_surat: surat.tanggal_surat ?? '',
                tanggal_kirim: surat.tanggal_kirim ?? '',
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
            setPreview(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, surat])

    const loadPreview = () => {
        if (!data.template_nomor_id) {
            setPreview(null)

            return
        }

        setPreviewLoading(true)
        axios
            .post('/template-nomor/preview', {
                template_nomor_id: data.template_nomor_id,
                tanggal_surat: data.tanggal_surat || undefined,
                klasifikasi_surat_id: data.klasifikasi_surat_id || undefined,
                unit_pengolah_id: data.unit_pengolah_id || undefined,
                jenis: 'keluar',
            })
            .then((res) => setPreview(res.data.preview))
            .catch(() => setPreview(null))
            .finally(() => setPreviewLoading(false))
    }

    useEffect(() => {
        if (!open) {
return
}

        if (previewTimer.current) {
clearTimeout(previewTimer.current)
}

        previewTimer.current = setTimeout(loadPreview, 250)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.template_nomor_id, data.tanggal_surat, data.klasifikasi_surat_id, data.unit_pengolah_id, open])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/surat-keluar/${surat.id}`, {
            onSuccess: () => {
                setOpen(false)
                toast('Data surat keluar berhasil diperbarui')
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

    const selectedTemplate = templates.find((t) => String(t.id) === data.template_nomor_id)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[92vh] overflow-y-auto">
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Edit Surat Keluar"
                        description={surat.perihal}
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Template Nomor Surat</Label>
                        <Select
                            value={data.template_nomor_id}
                            onValueChange={(v) => setData('template_nomor_id', v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih template penomoran" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Tanpa template (isi manual)</SelectItem>
                                {templates.map((t) => (
                                    <SelectItem key={t.id} value={String(t.id)}>
                                        {t.nama} — {t.format}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedTemplate ? (
                        <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                                    <Wand2 className="h-3.5 w-3.5" />
                                    Pratinjau Nomor Surat
                                </span>
                                {previewLoading && (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                                )}
                            </div>
                            <p className="font-mono text-lg font-bold tracking-wide text-blue-800 dark:text-blue-300">
                                {preview || '…'}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Nomor urut {surat.no_surat ? 'tetap (tidak diganti saat edit)' : 'baru akan dibuat'}.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Label>No. Surat (manual) *</Label>
                            <Input
                                value={data.no_surat}
                                onChange={(e) => setData('no_surat', e.target.value)}
                            />
                            {errors.no_surat && <p className="text-xs text-red-500">{errors.no_surat}</p>}
                        </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Tujuan Surat</Label>
                            <Input
                                value={data.tujuan_surat}
                                onChange={(e) => setData('tujuan_surat', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Penerima</Label>
                            <Input
                                value={data.penerima}
                                onChange={(e) => setData('penerima', e.target.value)}
                            />
                        </div>
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
                            <Label>Tanggal Kirim</Label>
                            <Input
                                type="date"
                                value={data.tanggal_kirim}
                                onChange={(e) => setData('tanggal_kirim', e.target.value)}
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
                            {surat.no_surat || '-'}
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
