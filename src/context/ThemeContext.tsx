import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check local storage first
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || savedTheme === 'light') {
                return savedTheme;
            }
            // Check system preference
            if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
        }
        return 'dark'; // Default to dark
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old class and add new one
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
