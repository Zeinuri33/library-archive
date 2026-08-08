import { Link, usePage } from '@inertiajs/react'
import {
    Archive,
    CalendarDays,
    ClipboardCheck,
    FolderTree,
    Inbox,
    LayoutGrid,
    Send,
    Users,
} from 'lucide-react'
import AppLogo from '@/components/app-logo'
import AppearanceToggleIcon from '@/components/appearance-tabs'
import { NavMain } from '@/components/nav-main'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
} from '@/components/ui/sidebar'
import { dashboard } from '@/routes'

export function AppSidebar() {
    const { auth } = usePage().props as any
    const permissions = auth?.permissions ?? []

    const can = (perm: string) => permissions.includes(perm)

    const userChildren = [
        ...(can('lihat-user') ? [{ title: 'List Pengguna', href: '/users' }] : []),
        ...(can('lihat-role') ? [{ title: 'Role', href: '/roles' }] : []),
        ...(can('lihat-akses') ? [{ title: 'Akses', href: '/permissions' }] : []),
    ]

    const masterChildren = [
        ...(can('lihat-klasifikasi') ? [{ title: 'Klasifikasi Surat', href: '/klasifikasi' }] : []),
        ...(can('lihat-unit') ? [{ title: 'Unit Pengolah', href: '/unit-pengolah' }] : []),
        ...(can('lihat-template-nomor') ? [{ title: 'Template Nomor', href: '/template-nomor' }] : []),
    ]

    const groups = [
        {
            label: 'Dashboard',
            items: [
                {
                    title: 'Beranda',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
            ],
        },
        {
            label: 'Persuratan',
            items: [
                ...(can('lihat-surat-masuk')
                    ? [{ title: 'Surat Masuk', href: '/surat-masuk', icon: Inbox }]
                    : []),
                ...(can('lihat-surat-keluar')
                    ? [{ title: 'Surat Keluar', href: '/surat-keluar', icon: Send }]
                    : []),
                ...(can('lihat-disposisi')
                    ? [{ title: 'Disposisi', href: '/disposisi', icon: ClipboardCheck }]
                    : []),
            ],
        },
        {
            label: 'Arsip & Cetak',
            items: [
                ...(can('lihat-arsip')
                    ? [{ title: 'Arsip Surat', href: '/arsip', icon: Archive }]
                    : []),
                ...(can('cetak-agenda')
                    ? [{ title: 'Agenda Surat', href: '/agenda', icon: CalendarDays }]
                    : []),
            ],
        },
        {
            label: 'Master',
            items: [
                ...(masterChildren.length > 0
                    ? [{
                        title: 'Master Data',
                        icon: FolderTree,
                        children: masterChildren,
                    }]
                    : []),
            ],
        },
        {
            label: 'Pengaturan',
            items: [
                ...(userChildren.length > 0
                    ? [{
                        title: 'Pengguna',
                        icon: Users,
                        children: userChildren,
                    }]
                    : []),
            ],
        },
    ]

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="pb-2">
                <Link href={dashboard()} prefetch className="flex items-center gap-2.5">
                    <AppLogo />
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-1 gap-0">
                {groups.map((group) => (
                    group.items.length > 0 && (
                        <NavMain
                            key={group.label}
                            items={group.items}
                            label={group.label}
                        />
                    )
                ))}
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="pb-3 gap-1">
                <AppearanceToggleIcon />
            </SidebarFooter>
        </Sidebar>
    )
}
