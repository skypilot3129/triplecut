import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => {
        try {
            return localStorage.getItem('vantex-theme') === 'dark';
        } catch { return false; }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        try { localStorage.setItem('vantex-theme', dark ? 'dark' : 'light'); }
        catch { /* ignore */ }
    }, [dark]);

    const toggle = () => setDark((d) => !d);

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
