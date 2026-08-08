import { Link } from '@inertiajs/react';
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ 
    items = [], 
    label = "Menu" 
}: { 
    items: NavItem[]
    label?: string
}) {
    const { isCurrentUrl } = useCurrentUrl()
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const { state, isMobile } = useSidebar()
    const isCollapsed = !isMobile && state === "collapsed"

    useEffect(() => {
        const activeParent = items.find(item => {
            if (item.children) {
                return item.children.some(child => isCurrentUrl(child.href!))
            }

            return false
        })

        if (activeParent) {
            setOpenMenu(activeParent.title)
        }
    }, [items])

    useEffect(() => {
        if (isCollapsed) {
            setOpenMenu(null)
        }
    }, [isCollapsed])

    const toggleMenu = (title: string) => {
        setTouchedMenu(true)
        setOpenMenu(openMenu === title ? null : title)
    }

    const isParentActive = (item: NavItem) => {
        if (item.href && isCurrentUrl(item.href)) {
return true
}

        if (item.children) {
            return item.children.some(child => isCurrentUrl(child.href!))
        }

        return false
    }
    const [touchedMenu, setTouchedMenu] = useState(false)

    return (
        <SidebarGroup className="px-1 py-0.5">
            <SidebarGroupLabel>{label}</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => {
                    const active = isParentActive(item)
                    const isOpen = !isCollapsed && (
                        openMenu === item.title ||
                        (!touchedMenu && active)
                    )

                    return (
                        <div key={item.title} className="relative">
                            <SidebarMenuItem>
                                {item.children ? (
                                    isCollapsed ? (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <SidebarMenuButton isActive={active}>
                                                    {item.icon && <item.icon />}
                                                </SidebarMenuButton>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                side="right"
                                                align="start"
                                                className="w-52 p-2 border-sidebar-border/50"
                                            >
                                                <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                    {item.title}
                                                </div>

                                                <div className="space-y-0.5">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.title}
                                                            href={child.href!}
                                                            className={`flex items-center rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-sidebar-hover ${
                                                                isCurrentUrl(child.href!) ? "bg-sidebar-hover font-medium" : ""
                                                            }`}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    ) : (
                                        <SidebarMenuButton
                                            onClick={() => toggleMenu(item.title)}
                                            isActive={active}
                                            className="justify-between sidebar-parent"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </div>
                                            <ChevronRight
                                                className={`size-4 shrink-0 text-sidebar-foreground/40 transition-transform duration-200 ${
                                                    isOpen ? "rotate-90" : ""
                                                }`}
                                            />
                                        </SidebarMenuButton>
                                    )
                                ) : (
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl(item.href!)}
                                    >
                                        <Link href={item.href!} className="flex items-center gap-2.5">
                                            {item.icon && <item.icon />}
                                            {!isCollapsed && item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>

                            {item.children && !isCollapsed && (
                                <div
                                    className={`
                                        relative ml-0 overflow-hidden
                                        transition-all duration-200 ease-in-out
                                        ${isOpen 
                                            ? "max-h-96 opacity-100 mt-0.5 mb-1" 
                                            : "max-h-0 opacity-0"
                                        }
                                    `}
                                >
                                    <div className="absolute left-[20px] top-0 bottom-0 w-px bg-sidebar-border/90" />
                                    <div className="space-y-0.5">
                                    {item.children.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isCurrentUrl(child.href!)}
                                                className="h-8 text-[13px] pl-11 pr-3 data-[active=true]:bg-primary/15 data-[active=true]:text-primary data-[active=true]:font-bold"
                                            >
                                                <Link href={child.href!}>
                                                    {child.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
