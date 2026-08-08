import { usePage } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props;
    const getInitials = useInitials();

    return (
        <header className="flex h-14 shrink-0 items-center bg-background/80 backdrop-blur-md px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">

            {/* Kiri */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="size-7 rounded-lg hover:bg-transparent hover:text-primary transition-all duration-200" />
                <div className="hidden sm:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            {/* Kanan */}
            <div className="ml-auto flex items-center gap-2">
                {auth.user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="group flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-transparent">
                                <div className="hidden md:flex flex-col items-end leading-tight">
                                    <span className="text-sm font-medium">{auth.user.name}</span>
                                    <span className="text-xs text-muted-foreground">{auth.user.email}</span>
                                </div>
                                <Avatar className="h-9 w-9 overflow-hidden rounded-full border-2 border-green-500 ring-2 ring-transparent transition-all duration-200 group-hover:ring-border">
                                    <AvatarImage
                                        src={typeof auth.user.avatar_url === 'string' ? auth.user.avatar_url : undefined}
                                        alt={auth.user.name}
                                    />
                                    <AvatarFallback className="rounded-full bg-blue-500 text-xs font-semibold text-white">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <UserMenuContent user={auth.user} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

        </header>
    );
}
