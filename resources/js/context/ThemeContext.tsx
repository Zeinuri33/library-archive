import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
    themeAccent: string;
    setThemeAccent: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const VALID_ACCENTS = ['blue', 'red', 'indigo']

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeAccent, setThemeAccentState] = useState<string>('blue');
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme_accent');

        // Abaikan nilai legacy/rusak (mis. 'emerald' dari versi lama) → fallback biru.
        if (savedTheme && VALID_ACCENTS.includes(savedTheme)) {
            setThemeAccentState(savedTheme);
        } else if (savedTheme) {
            localStorage.removeItem('theme_accent');
        }
    }, []);
    const setThemeAccent = (theme: string) => {
        setThemeAccentState(theme);
        localStorage.setItem('theme_accent', theme);
    };

    return (
        <ThemeContext.Provider value={{ themeAccent, setThemeAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}