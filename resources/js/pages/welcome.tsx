'use client'

import { Head, Link, usePage } from '@inertiajs/react'
import { motion } from 'framer-motion'
import {
    Archive,
    ArrowRight,
    ClipboardCheck,
    FileText,
    Inbox,
    Send,
    ShieldCheck,
    Sparkles,
    Wand2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { dashboard, login } from '@/routes'

const FEATURES = [
    {
        icon: Inbox,
        title: 'Surat Masuk',
        desc: 'Pencatatan surat masuk dengan agenda otomatis, klasifikasi, dan lampiran scan.',
    },
    {
        icon: Send,
        title: 'Surat Keluar',
        desc: 'Pembuatan surat keluar dengan nomor surat otomatis sesuai template instansi.',
    },
    {
        icon: Wand2,
        title: 'No. Surat Builder',
        desc: 'Susun format nomor surat sendiri: {nomor}, {klasifikasi}, {unit}, {bulan}, {tahun}.',
    },
    {
        icon: ClipboardCheck,
        title: 'Disposisi',
        desc: 'Teruskan surat ke pimpinan atau unit tujuan beserta instruksi dan batas waktu.',
    },
    {
        icon: Archive,
        title: 'Arsip & Pencarian',
        desc: 'Arsip surat per tahun, penelusuran lanjutan, dan ekspor data ke CSV.',
    },
    {
        icon: FileText,
        title: 'Agenda & Cetak',
        desc: 'Cetak agenda surat masuk/keluar bulanan dan lembar disposisi resmi.',
    },
]

export default function Welcome() {
    const { auth } = usePage().props
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <Head title="Home" />

            <div className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-foreground dark:bg-slate-950">
                {/* ORB */}
                <div className="pointer-events-none fixed top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px]" />
                <div className="pointer-events-none fixed -top-40 right-0 -z-10 h-[400px] w-[500px] rounded-full bg-sky-500/10 blur-[130px]" />

                {/* HEADER */}
                <header
                    className={`fixed top-0 left-0 z-[60] w-full transition-all duration-300 ${
                        scrolled
                            ? 'border-b border-slate-200/20 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-800/30 dark:bg-slate-950/70'
                            : 'bg-transparent'
                    }`}
                >
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold tracking-tight">
                                    E-Arsip Ibrahimy
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Persuratan & Arsip Perpustakaan
                                </p>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-3 md:flex">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button className="gap-2 rounded-full">
                                        Buka Dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={login()}>
                                    <Button className="gap-2 rounded-full">
                                        Masuk
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* HERO */}
                <section className="relative mx-auto max-w-7xl px-6 md:px-12">
                    <div className="mx-auto pt-40 pb-20 text-center lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Sistem Persuratan Terpadu
                        </motion.div>

                        <motion.h1
                            className="text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            Kelola Surat & Arsip{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                                Perpustakaan Ibrahimy
                            </span>
                        </motion.h1>

                        <motion.p
                            className="mx-auto mt-6 max-w-2xl text-slate-500 dark:text-slate-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.6 }}
                        >
                            Aplikasi persuratan dan kearsipan digital: pencatatan surat masuk/keluar,
                            penomoran otomatis dengan builder format yang fleksibel, disposisi, agenda,
                            hingga arsip yang mudah ditelusuri.
                        </motion.p>

                        <motion.div
                            className="mt-8 flex flex-wrap items-center justify-center gap-3"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                        >
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button size="lg" className="gap-2 rounded-full px-8">
                                        Buka Dashboard
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={login()}>
                                    <Button size="lg" className="gap-2 rounded-full px-8">
                                        Masuk ke Aplikasi
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
                                <ShieldCheck className="h-4 w-4 text-blue-500" />
                                Akses berbasis peran & izin
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="mx-auto max-w-7xl px-6 pb-28 md:px-12">
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map((item, i) => {
                            const Icon = item.icon

                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: i * 0.06 }}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900/80"
                                >
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:text-blue-400">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-slate-200/60 py-8 dark:border-slate-800/60">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row dark:text-slate-400">
                        <p>© {new Date().getFullYear()} Perpustakaan Ibrahimy — Situbondo</p>
                        <p className="flex items-center gap-1.5">
                            Dibangun dengan
                            <span className="font-medium text-blue-600 dark:text-blue-400">Laravel + React</span>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}
