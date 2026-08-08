import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black group-data-[collapsible=icon]:size-4" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden ml-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-foreground">
                    E-Arsip Ibrahimy
                </span>
                <span className="truncate text-[11px] text-sidebar-foreground/50">
                    Sistem Persuratan
                </span>
            </div>
        </>
    );
}
