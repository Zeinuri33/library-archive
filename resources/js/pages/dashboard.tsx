import { Head, Link, usePage } from '@inertiajs/react'
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    ClipboardCheck,
    FileArchive,
    FileText,
    Inbox,
    Layers,
    Send,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatTanggal, SIFAT_BADGE, STATUS_DISPOSISI } from '@/lib/surat'
import { dashboard } from '@/routes'
import type { ChartPoint, DashboardStats, Disposisi, Surat } from '@/types/surat'

interface DashboardProps {
    stats: DashboardStats
    chart: ChartPoint[]
    recentSurats: Surat[]
    recentDisposisis: Disposisi[]
}

const maxBar = (points: ChartPoint[]) =>
    Math.max(1, ...points.flatMap((p) => [p.masuk, p.keluar]))

/** Donut ring SVG — persentase arsip dari total surat. */
function DonutRing({ value, total }: { value: number; total: number }) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0
    const radius = 34
    const circumference = 2 * Math.PI * radius
    const dash = (pct / 100) * circumference

    return (
        <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                <circle cx="40" cy="40" r={radius} fill="none" strokeWidth="8" className="stroke-slate-200 dark:stroke-slate-800" />
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="url(#donut-gradient)"
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    className="transition-all duration-700"
                />
                <defs>
                    <linearGradient id="donut-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-foreground">{pct}%</span>
            </div>
        </div>
    )
}

export default function Dashboard({ stats, chart, recentSurats, recentDisposisis }: DashboardProps) {
    const { auth } = usePage().props
    const firstName = auth?.user?.name?.split(' ')[0] ?? 'Pengguna'
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const statCards = [
        {
            title: 'Surat Masuk',
            value: stats.suratMasuk,
            sub: `${stats.suratBulanIni} bulan ini`,
            icon: Inbox,
            accent: 'border-l-blue-600',
            chip: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
            iconWrap: 'bg-blue-600/10 text-blue-600 dark:text-blue-400',
            href: '/surat-masuk',
        },
        {
            title: 'Surat Keluar',
            value: stats.suratKeluar,
            sub: 'Total tercatat',
            icon: Send,
            accent: 'border-l-sky-500',
            chip: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400',
            iconWrap: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
            href: '/surat-keluar',
        },
        {
            title: 'Disposisi Aktif',
            value: stats.disposisiAktif,
            sub: `${stats.disposisiSelesai} selesai`,
            icon: ClipboardCheck,
            accent: 'border-l-indigo-500',
            chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400',
            iconWrap: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
            href: '/disposisi',
        },
        {
            title: 'Arsip Tersimpan',
            value: stats.arsipCount,
            sub: `${stats.totalUsers} pengguna`,
            icon: FileArchive,
            accent: 'border-l-cyan-500',
            chip: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400',
            iconWrap: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
            href: '/arsip',
        },
    ]

    const max = maxBar(chart)
    const totalSurat = stats.suratMasuk + stats.suratKeluar

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* ================= HERO BANNER ================= */}
                <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-800 text-white shadow-xl">
                    {/* dekorasi */}
                    <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />
                    <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-sky-400/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

                    <div className="relative z-10 flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-xl">
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-sky-100 backdrop-blur">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {today}
                            </p>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Selamat datang kembali, {firstName} 👋
                            </h1>
                            <p className="mt-2 text-sm leading-relaxed text-blue-100/90">
                                Berikut ringkasan persuratan Perpustakaan Ibrahimy. Catat surat baru,
                                teruskan disposisi, dan jaga arsip tetap tertata.
                            </p>
                        </div>

                        <div className="grid shrink-0 grid-cols-3 gap-3">
                            {[
                                { label: 'Surat bulan ini', value: stats.suratBulanIni, icon: TrendingUp },
                                { label: 'Disposisi aktif', value: stats.disposisiAktif, icon: Sparkles },
                                { label: 'Arsip', value: stats.arsipCount, icon: FileArchive },
                            ].map((item) => {
                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.label}
                                        className="rounded-xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur transition-colors hover:bg-white/[0.14]"
                                    >
                                        <Icon className="mb-2 h-4 w-4 text-sky-300" />
                                        <p className="text-xl font-bold">{item.value}</p>
                                        <p className="text-[10px] font-medium text-blue-100/80">{item.label}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= STAT CARDS (aksen kiri) ================= */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon

                        return (
                            <Link
                                key={stat.title}
                                href={stat.href}
                                className={`group rounded-xl border border-l-4 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated ${stat.accent}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[13px] font-medium text-muted-foreground">{stat.title}</p>
                                        <p className="text-3xl font-bold tracking-tight">{stat.value.toLocaleString('id-ID')}</p>
                                        <p className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${stat.chip}`}>
                                            {stat.sub}
                                        </p>
                                    </div>
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconWrap} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>

                                <p className="mt-4 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    Buka halaman
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </p>
                            </Link>
                        )
                    })}
                </div>

                {/* ================= CHART + DONUT ================= */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Chart */}
                    <div className="rounded-xl border bg-card p-6 shadow-soft lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold">Tren Surat 6 Bulan Terakhir</h2>
                                <p className="text-xs text-muted-foreground">Jumlah surat masuk & keluar per bulan</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-blue-600" /> Masuk
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-sky-400" /> Keluar
                                </span>
                            </div>
                        </div>

                        <div className="flex h-52 items-end justify-between gap-3">
                            {chart.map((point) => (
                                <div key={point.key} className="group flex flex-1 flex-col items-center gap-2">
                                    <div className="flex h-40 w-full items-end justify-center gap-1.5">
                                        <div
                                            className="w-1/3 rounded-t-md bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-500 group-hover:from-blue-600"
                                            style={{ height: `${(point.masuk / max) * 100}%`, minHeight: point.masuk > 0 ? '4px' : '2px' }}
                                            title={`Masuk: ${point.masuk}`}
                                        />
                                        <div
                                            className="w-1/3 rounded-t-md bg-gradient-to-t from-sky-500 to-cyan-400 transition-all duration-500 group-hover:from-sky-400"
                                            style={{ height: `${(point.keluar / max) * 100}%`, minHeight: point.keluar > 0 ? '4px' : '2px' }}
                                            title={`Keluar: ${point.keluar}`}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-semibold text-muted-foreground">
                                            {point.masuk + point.keluar}
                                        </span>
                                        <span className="text-xs font-medium">{point.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Donut + ringkasan */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Kesehatan Arsip</h2>

                        <div className="rounded-xl border bg-card p-6 shadow-soft">
                            <div className="flex items-center gap-5">
                                <DonutRing value={stats.arsipCount} total={totalSurat} />
                                <div className="space-y-1.5">
                                    <p className="text-sm font-semibold">{pctOf(stats.arsipCount, totalSurat)}% diarsipkan</p>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {stats.arsipCount} dari {totalSurat} surat telah masuk arsip permanen.
                                    </p>
                                </div>
                            </div>

                            <div className="my-5 border-t" />

                            <div className="space-y-4">
                                {[
                                    {
                                        label: 'Surat Masuk',
                                        value: stats.suratMasuk,
                                        total: totalSurat,
                                        bar: 'bg-blue-600',
                                    },
                                    {
                                        label: 'Surat Keluar',
                                        value: stats.suratKeluar,
                                        total: totalSurat,
                                        bar: 'bg-sky-400',
                                    },
                                    {
                                        label: 'Disposisi Selesai',
                                        value: stats.disposisiSelesai,
                                        total: stats.disposisiAktif + stats.disposisiSelesai,
                                        bar: 'bg-indigo-500',
                                    },
                                ].map((row) => {
                                    const pct = row.total > 0 ? Math.round((row.value / row.total) * 100) : 0

                                    return (
                                        <div key={row.label}>
                                            <div className="mb-1 flex items-center justify-between text-xs">
                                                <span className="font-medium text-muted-foreground">{row.label}</span>
                                                <span className="font-semibold">{pct}%</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                <div
                                                    className={`h-full rounded-full ${row.bar} transition-all duration-700`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= RECENT LISTS ================= */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Surat */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                <FileText className="h-3.5 w-3.5" />
                                Surat Terbaru
                            </h2>
                            <Link href="/arsip">
                                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                    Lihat semua <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
                            {recentSurats.length > 0 ? (
                                recentSurats.map((surat) => (
                                    <Link
                                        key={surat.id}
                                        href={`/${surat.jenis === 'masuk' ? 'surat-masuk' : 'surat-keluar'}/${surat.id}`}
                                        className="group flex items-center gap-4 border-b border-border/60 px-4 py-3 last:border-0 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                                    >
                                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${surat.jenis === 'masuk' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400'}`}>
                                            {surat.jenis === 'masuk' ? <Inbox className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{surat.perihal}</p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {surat.no_surat || '-'} · {formatTanggal(surat.tanggal_surat)}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className={`shrink-0 ${SIFAT_BADGE[surat.sifat] || ''}`}>
                                            {surat.sifat}
                                        </Badge>
                                    </Link>
                                ))
                            ) : (
                                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    Belum ada surat tercatat.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Disposisi */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                <Layers className="h-3.5 w-3.5" />
                                Disposisi Terbaru
                            </h2>
                            <Link href="/disposisi">
                                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                    Lihat semua <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="overflow-hidden rounded-xl border bg-card shadow-soft">
                            {recentDisposisis.length > 0 ? (
                                recentDisposisis.map((disposisi) => {
                                    const status = STATUS_DISPOSISI[disposisi.status]

                                    return (
                                        <div
                                            key={disposisi.id}
                                            className="flex items-center gap-4 border-b border-border/60 px-4 py-3 last:border-0"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                <ClipboardCheck className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {disposisi.surat?.perihal || 'Surat tanpa perihal'}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    Tujuan: {disposisi.user?.name || disposisi.tujuan || '-'}
                                                </p>
                                            </div>
                                            <Badge variant="outline" className={`shrink-0 ${status?.badge || ''}`}>
                                                {status?.label || disposisi.status}
                                            </Badge>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    Belum ada disposisi.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ================= FOOTER STRIP ================= */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card px-5 py-4 shadow-soft">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
                            <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-medium">Sistem berjalan normal</p>
                            <p className="text-xs text-muted-foreground">E-Arsip Ibrahimy v1.0.0</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        {stats.totalUsers} pengguna terdaftar
                    </div>
                </div>
            </div>
        </>
    )
}

function pctOf(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Beranda',
            href: dashboard(),
        },
    ],
}
