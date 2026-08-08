import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppearance } from "@/hooks/use-appearance";

export default function AppearanceToggleIcon() {
    const { appearance, updateAppearance } = useAppearance();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const dark =
            appearance === "dark" ||
            (appearance === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDark(dark);
    }, [appearance]);

    const toggle = () => {
        updateAppearance(isDark ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground/90 hover:bg-sidebar-hover"
        >
            {isDark ? (
                <Sun className="size-[18px]" />
            ) : (
                <Moon className="size-[18px]" />
            )}
            <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
        </button>
    );
}
