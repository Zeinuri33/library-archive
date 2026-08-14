'use client'

import { useForm } from '@inertiajs/react'
import { Plus, Wand2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Heading from '@/components/heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { BULAN_ROMAWI } from '@/lib/surat'

interface Props {
    placeholders: Record<string, string>
}

const RESET_OPTIONS = [
    { value: 'tahun', label: 'Per Tahun' },
    { value: 'bulan', label: 'Per Bulan' },
    { value: 'kontinu', label: 'Kontinu' },
]

export default function CreateTemplateNomorModal({ placeholders }: Props) {
    const [open, setOpen] = useState(false)
    const formatRef = useRef<HTMLInputElement>(null)

    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        kode: '',
        format: '{nomor}/{unit}/{bulan}/{tahun}',
        digit_nomor: '3',
        reset_periode: 'tahun',
        is_aktif: true,
        keterangan: '',
    })

    const insertPlaceholder = (placeholder: string) => {
        const input = formatRef.current
        const current = data.format

        if (input && input.selectionStart !== null && input.selectionEnd !== null) {
            const start = input.selectionStart
            const end = input.selectionEnd
            const next = current.slice(0, start) + placeholder + current.slice(end)
            setData('format', next)
            requestAnimationFrame(() => {
                input.focus()
                const pos = start + placeholder.length
                input.setSelectionRange(pos, pos)
            })
        } else {
            setData('format', current ? current + '/' + placeholder : placeholder)
        }
    }

    const samplePreview = data.format
        .replace('{nomor}', '001')
        .replace('{klasifikasi}', 'KER.01')
        .replace('{unit}', 'PUS')
        .replace('{bulan}', BULAN_ROMAWI[new Date().getMonth()])
        .replace('{bulan_angka}', String(new Date().getMonth() + 1).padStart(2, '0'))
        .replace('{tahun}', String(new Date().getFullYear()))
        .replace('{jenis}', 'KELUAR')

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/template-nomor', {
            onSuccess: () => {
                setOpen(false)
                reset()
                toast('Template nomor surat berhasil dibuat')
            },
            onError: () => toast('Gagal menyimpan. Periksa kembali isian.'),
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Template
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <Heading
                        variant="small"
                        title="Buat Template Nomor Surat"
                        description="Susun format nomor surat dengan placeholder."
                    />
                    <Separator />
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Nama Template *</Label>
                            <Input
                                placeholder="Contoh: Format Lengkap Instansi"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                            />
                            {errors.nama && <p className="text-xs text-red-500">{errors.nama}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Kode *</Label>
                            <Input
                                placeholder="Contoh: LENGKAP"
                                value={data.kode}
                                onChange={(e) => setData('kode', e.target.value)}
                            />
                            {errors.kode && <p className="text-xs text-red-500">{errors.kode}</p>}
                        </div>
                    </div>

                    {/* Builder */}
                    <div className="space-y-2">
                        <Label>Format Nomor Surat *</Label>
                        <Input
                            ref={formatRef}
                            className="font-mono"
                            value={data.format}
                            onChange={(e) => setData('format', e.target.value)}
                        />
                        {errors.format && <p className="text-xs text-red-500">{errors.format}</p>}

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="mr-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <Wand2 className="h-3.5 w-3.5" />
                                Klik untuk sisip:
                            </span>
                            {Object.entries(placeholders).map(([ph, desc]) => (
                                <button
                                    key={ph}
                                    type="button"
                                    onClick={() => insertPlaceholder(ph)}
                                    title={desc}
                                    className="rounded-md border bg-muted/50 px-2 py-1 font-mono text-[11px] transition-colors hover:bg-primary/10 hover:text-primary"
                                >
                                    {ph}
                                </button>
                            ))}
                        </div>

                        {/* Preview */}
                        <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-800 dark:bg-blue-950/30">
                            <p className="text-[11px] font-medium text-blue-700 dark:text-blue-400">
                                Contoh hasil:
                            </p>
                            <p className="font-mono text-sm font-bold text-blue-800 dark:text-blue-300">
                                {samplePreview}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Digit Nomor</Label>
                            <Select
                                value={data.digit_nomor}
                                onValueChange={(v) => setData('digit_nomor', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2">2 (01, 02, ...)</SelectItem>
                                    <SelectItem value="3">3 (001, 002, ...)</SelectItem>
                                    <SelectItem value="4">4 (0001, ...)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Reset Penomoran</Label>
                            <Select
                                value={data.reset_periode}
                                onValueChange={(v) => setData('reset_periode', v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {RESET_OPTIONS.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>
                                            {o.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={data.is_aktif}
                            onCheckedChange={(v) => setData('is_aktif', !!v)}
                        />
                        <span className="text-sm">Aktif (dapat dipakai saat membuat surat keluar)</span>
                    </div>

                    <div className="space-y-2">
                        <Label>Keterangan</Label>
                        <Textarea
                            rows={2}
                            placeholder="Contoh penggunaan template (opsional)"
                            value={data.keterangan}
                            onChange={(e) => setData('keterangan', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                        <Badge variant="outline" className="font-mono text-[10px]">
                            {data.format}
                        </Badge>
                        <Button type="submit" disabled={processing}>
                            Simpan Template
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
