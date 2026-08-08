import { Link } from '@inertiajs/react';
import {
    Archive,
    FileText,
    Inbox,
    ShieldCheck,
    Wand2,
} from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const BRAND_POINTS = [
    { icon: Inbox, text: 'Surat masuk & keluar dengan agenda otomatis' },
    { icon: Wand2, text: 'No. surat builder — format fleksibel sesuai instansi' },
    { icon: Archive, text: 'Disposisi, agenda, dan arsip yang mudah ditelusuri' },
];

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh bg-background">
            {/* ============ PANEL KIRI: BRANDING (gradasi biru) ============ */}
            <aside className="relative hidden w-[46%] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-blue-800 text-white lg:flex lg:flex-col lg:justify-between">
                {/* dekorasi */}
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute top-1/2 -left-20 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between gap-12 p-12">
                    {/* Branding */}
                    <Link href={home()} className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                            <FileText className="h-6 w-6 text-sky-300" />
                        </div>
                        <div>
                            <p className="text-base font-bold tracking-tight">E-Arsip Ibrahimy</p>
                            <p className="text-xs text-blue-200/80">Persuratan & Arsip Perpustakaan</p>
                        </div>
                    </Link>

                    {/* Headline + poin fitur */}
                    <div className="space-y-8">
                        <h2 className="text-3xl leading-tight font-bold tracking-tight">
                            Kelola persuratan perpustakaan,
                            <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
                                {' '}dalam satu tempat.
                            </span>
                        </h2>
                        <p className="max-w-md text-sm leading-relaxed text-blue-100/80">
                            Catat surat masuk/keluar, susun nomor surat dengan builder fleksibel,
                            teruskan disposisi, hingga kelola arsip — cepat dan rapi.
                        </p>

                        <ul className="space-y-3.5">
                            {BRAND_POINTS.map((point) => {
                                const Icon = point.icon

                                return (
                                    <li key={point.text} className="flex items-center gap-3 text-sm text-blue-50/90">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
                                            <Icon className="h-4 w-4 text-sky-300" />
                                        </span>
                                        {point.text}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-xs text-blue-200/70">
                        <ShieldCheck className="h-4 w-4 text-sky-300" />
                        Akses aman berbasis peran & izin · © {new Date().getFullYear()} Perpustakaan Ibrahimy
                    </div>
                </div>
            </aside>

            {/* ============ PANEL KANAN: FORM ============ */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6 md:p-10">
                {/* dekorasi halus panel kanan */}
                <div className="pointer-events-none absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
                <div className="pointer-events-none absolute right-0 bottom-0 h-[260px] w-[260px] rounded-full bg-sky-500/10 blur-3xl" />

                <div className="relative z-10 w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        {/* Branding mobile (hanya < lg) */}
                        <div className="flex flex-col items-center gap-3 lg:hidden">
                            <Link
                                href={home()}
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>
                            <h1 className="text-xl font-bold tracking-tight">E-Arsip Ibrahimy</h1>
                        </div>

                        {/* Judul & deskripsi (desktop) */}
                        <div className="hidden space-y-2 lg:block">
                            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
